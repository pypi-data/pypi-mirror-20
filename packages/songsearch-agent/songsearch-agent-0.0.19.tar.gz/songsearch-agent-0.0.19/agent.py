import json
import os
import tempfile
import logging
import random
import time
import pkg_resources
import socket

import requests

try:
    from json.decoder import JSONDecodeError
except ImportError:
    JSONDecodeError = ValueError

class InvalidAPIKeyError(Exception):
    """when the api key is wrong"""


class SubmitError(Exception):
    """when we can't submit the result"""


try:
    timeout_exception = requests.exceptions.ReadTimeout
except AttributeError:
    timeout_exception = requests.exceptions.Timeout


ops_exceptions = (
    requests.exceptions.ConnectionError,
    timeout_exception,
)


_UAS = (
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/601.7.7 '
    '(KHTML, like Gecko) Version/9.1.3 Safari/601.8.7',

    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:47.2) '
    'Gecko/20100101 Firefox/47.2',

    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 '
    '(KHTML, like Gecko) Chrome/53.0.2743.116 Safari/537.36',

    'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:49.2) Gecko/20100101 '
    'Firefox/49.2',

    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:51.2) Gecko/20100101 '
    'Firefox/51.2',
)


def realistic_request(url, verify=True, timeout=.4):
    headers = {
        'Accept': (
            'text/html,application/xhtml+xml,application/xml,text/xml'
            ';q=0.9,*/*;q=0.8'
        ),
        'User-Agent': random.choice(_UAS),
        'Accept-Language': 'en-US,en;q=0.5',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache',
    }
    return requests.get(url, headers=headers, verify=verify, timeout=timeout)


class Runner:

    def __init__(
        self,
        api_key,
        domain,
        use_http=False,
        gently=False,
        logger=None,
        timeout=15,
        hostname=None,
    ):
        self.api_key = api_key
        self.domain = domain
        self.use_http = use_http
        self.gently = gently
        self.logger = logger or logging.getLogger(__name__)
        self.successes = 0
        self.failures = 0
        self.timeout = int(timeout)
        if not hostname:
            try:
                hostname = socket.gethostname()
            except Exception:
                # No idea what kind of errors this might be but best
                # be cautions since it's not super important.
                pass
        self.hostname = hostname

    def get_url(self, path):
        url = self.use_http and 'http://' or 'https://'
        url += self.domain
        url += path
        return url

    def log(self, *args, **kwargs):
        self.logger.info(' '.join(str(x) for x in args), **kwargs)

    def repeat(self):
        while True:
            try:
                fetch_url = self.get_url('/api/downloader/next/')
                self.log('Fetching next URL from ', fetch_url)

                next_url_response = requests.get(fetch_url, headers={
                    'API-Key': self.api_key
                }, timeout=self.timeout)
                if next_url_response.status_code == 403:
                    raise InvalidAPIKeyError(self.api_key)
                elif next_url_response.status_code == 429:
                    self.log("Taking a biiig pause till there's more to do")
                    time.sleep(120)
                    continue
                elif next_url_response.status_code >= 500:
                    self.log(
                        "Fetching the next URL simply failed. "
                        "Trying again a little later."
                    )
                    time.sleep(60)
                    continue

                next_url = next_url_response.json()['url']
                self.log('Next URL to download:', next_url)

                submit_url = self.get_url('/api/downloader/submit/')

                if self.gently:
                    # min 3 second, max 5+1 seconds
                    sleep_time = 3 + random.random() * 5
                else:
                    # min 1 second, max 3+1 seconds
                    sleep_time = 1 + random.random() * 3

                response = realistic_request(next_url, timeout=self.timeout)
                if response.status_code == 404:
                    submit_response = requests.post(
                        submit_url,
                        data={
                            'notfound': True,
                            'url': next_url,
                        },
                        headers={
                            'API-Key': self.api_key
                        },
                        timeout=self.timeout
                    )
                    self.log('Reported URL not found {} (hostname: {})'.format(
                        next_url,
                        self.hostname,
                    ))
                    self.log('Sleeping for', round(sleep_time, 2), 'seconds')
                    time.sleep(sleep_time)
                    continue
                elif response.status_code != 200:
                    self.log(
                        'Failed to download', next_url,
                        'Status code:', response.status_code
                    )
                    time.sleep(30)
                    continue
                try:
                    html = json.dumps(response.json())
                except JSONDecodeError:
                    html = str(response.content)

                self.log('Downloaded {} bytes (hostname: {})'.format(
                    format(len(html), ','),
                    self.hostname,
                ))

                payload = {
                    'url': next_url,
                    'html': html,
                    'hostname': self.hostname,
                }
                submit_response = requests.post(
                    submit_url,
                    data=payload,
                    headers={
                        'API-Key': self.api_key
                    },
                    timeout=self.timeout
                )

                if submit_response.status_code == 403:
                    raise InvalidAPIKeyError(self.api_key)
                elif (
                    submit_response.status_code >= 400 and
                    submit_response.status_code < 500
                ):
                    raise SubmitError(submit_response.status_code)

                self.successes += 1

                self.log(
                    'Response after submitting:',
                    str(next_url_response.json())
                )

                self.log('Sleeping for', round(sleep_time, 2), 'seconds')
                time.sleep(sleep_time)

                self.log('\n')

            except ops_exceptions as exc:
                self.failures += 1
                self.log(
                    'Operational error, sleeping for a bit',
                    exc_info=True
                )
                time.sleep(self.gently and 90 or 30)


def run(*args, **kwargs):
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    log_filename = os.path.join(tempfile.gettempdir(), 'songsearch-agent.log')
    print('Logging to {}'.format(log_filename))
    logger.addHandler(logging.FileHandler(log_filename))
    verbose = kwargs.pop('verbose')
    if verbose:
        logger.addHandler(logging.StreamHandler())
    kwargs['logger'] = logger
    runner = Runner(*args, **kwargs)
    try:
        runner.repeat()
    except Exception:
        logger.error('Errored on repeat', exc_info=True)
        raise
    except KeyboardInterrupt:
        logger.info('\nFinally....\n\tSuccesses={}\n\tFailures={}\n'.format(
            runner.successes,
            runner.failures
        ))
        raise


def main():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument(
        'api_key',
        help="package (e.g. some-package==1.2.3 or just some-package)",
        nargs='?'
    )
    parser.add_argument(
        "-v, --verbose",
        help="Verbose output",
        action="store_true",
        dest='verbose',
    )
    parser.add_argument(
        "-V, --version",
        help="What version this is",
        action="store_true",
        dest='version',
    )
    parser.add_argument(
        "-g, --gently",
        help='Longer delay between each loop',
        action="store_true",
        dest='gently',
    )
    parser.add_argument(
        '-d, --domain',
        help='Domain name to send to',
        action='store',
        default='songsear.ch',
        dest='domain',
    )
    parser.add_argument(
        "--http",
        help="Use http instead of https",
        action="store_true",
    )
    args = parser.parse_args()
    if args.version:
        print(pkg_resources.get_distribution('songsearch-agent').version)
        return 0
    else:
        return run(
            args.api_key,
            domain=args.domain,
            use_http=args.http,
            gently=args.gently,
            verbose=args.verbose,
        )


if __name__ == '__main__':
    import sys
    sys.exit(main())
