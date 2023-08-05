#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Copyright 2016 Fedele Mantuano (https://twitter.com/fedelemantuano)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
"""

import argparse
import os
import sys

try:
    import simplejson as json
except ImportError:
    import json

current = os.path.realpath(os.path.dirname(__file__))
root = os.path.join(current, '..')
sys.path.append(root)

from mailparser import MailParser, __version__


def get_args():
    parser = argparse.ArgumentParser(
        description="Wrapper for email Python Standard Library",
        epilog="It takes as input a raw mail and generates a parsed object.",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter)

    parsing_group = parser.add_mutually_exclusive_group(required=True)
    parsing_group.add_argument(
        "-f",
        "--file",
        dest="file",
        help="Raw email file")
    parsing_group.add_argument(
        "-s",
        "--string",
        dest="string",
        help="Raw email string")

    parser.add_argument(
        "-j",
        "--json",
        dest="json",
        action="store_true",
        help="Show the JSON of parsed mail")

    parser.add_argument(
        "-b",
        "--body",
        dest="body",
        action="store_true",
        help="Print the body of mail")

    parser.add_argument(
        "-a",
        "--attachments",
        dest="attachments",
        action="store_true",
        help="Print the attachments of mail")

    parser.add_argument(
        "-r",
        "--headers",
        dest="headers",
        action="store_true",
        help="Print the headers of mail")

    parser.add_argument(
        "-t",
        "--to",
        dest="to",
        action="store_true",
        help="Print the to of mail")

    parser.add_argument(
        "-m",
        "--from",
        dest="from_",
        action="store_true",
        help="Print the from of mail")

    parser.add_argument(
        "-u",
        "--subject",
        dest="subject",
        action="store_true",
        help="Print the subject of mail")

    parser.add_argument(
        "-d",
        "--defects",
        dest="defects",
        action="store_true",
        help="Print the defects of mail")

    parser.add_argument(
        "-n",
        "--anomalies",
        dest="anomalies",
        action="store_true",
        help="Print the anomalies of mail")

    parser.add_argument(
        "-i",
        "--senderip",
        dest="senderip",
        metavar="Trust mail server string",
        help="Extract a reliable sender IP address heuristically")

    parser.add_argument(
        '-v',
        '--version',
        action='version',
        version='%(prog)s {}'.format(__version__))

    return parser.parse_args()


def safe_print(data):
    try:
        print(data)
    except UnicodeEncodeError:
        print(data.encode('utf-8'))


def main():
    args = get_args()

    parser = MailParser()

    if args.file:
        parser.parse_from_file(args.file)
    elif args.string:
        parser.parse_from_string(args.string)

    if args.json:
        j = json.loads(parser.parsed_mail_json)
        safe_print(json.dumps(j, ensure_ascii=False, indent=4))

    if args.body:
        # safe_print(parser.body)
        safe_print(parser.body)

    if args.headers:
        safe_print(parser.headers)

    if args.to:
        safe_print(parser.to_)

    if args.from_:
        safe_print(parser.from_)

    if args.subject:
        safe_print(parser.subject)

    if args.defects:
        for i in parser.defects_category:
            safe_print(i)

    if args.anomalies:
        for i in parser.anomalies:
            safe_print(i)

    if args.senderip:
        r = parser.get_server_ipaddress(args.senderip)
        if r:
            safe_print(r)
        else:
            safe_print("Not Found")

    if args.attachments:
        for i in parser.attachments_list:
            safe_print(json.dumps(i, ensure_ascii=False, indent=4))


if __name__ == '__main__':
    main()
