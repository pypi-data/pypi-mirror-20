#!/usr/bin/env python
from __future__ import print_function
from future import standard_library
standard_library.install_aliases()

from builtins import input

from configparser import RawConfigParser as ConfigParser
import http.client
from io import BytesIO  # used to stream http response into zipfile.
import json
import logging
import os.path
import re
import socket
import ssl
import sys
from time import sleep
from urllib.request import urlopen
from urllib.error import HTTPError
from urllib.parse import quote_plus, urlencode
import xml.etree.ElementTree as ET
from zipfile import ZipFile  # used to decompress requested zip archives.

from htrc.lib.cli import bool_prompt

import logging
from logging import NullHandler
logging.getLogger(__name__).addHandler(NullHandler())

"""
DOWNLOAD VOLUMES
Code to download volumes
"""
host = "silvermaple.pti.indiana.edu"  # use over HTTPS
port = 25443
oauth2EPRurl = "/oauth2/token"
oauth2port = 443
dataapiEPR = "/data-api/"


# getVolumesFromDataAPI : String, String[], boolean ==> inputStream
def getVolumesFromDataAPI(token, volumeIDs, concat=False):
    data = None

    assert volumeIDs is not None, "volumeIDs is None"
    assert len(volumeIDs) > 0, "volumeIDs is less than one"

    url = dataapiEPR + "volumes"
    data = {'volumeIDs': '|'.join(
        [id.replace('+', ':').replace('=', '/') for id in volumeIDs])}
    if concat:
        data['concat'] = 'true'

    headers = {"Authorization": "Bearer " + token,
               "Content-type": "application/x-www-form-urlencoded"}

    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    httpsConnection = http.client.HTTPSConnection(host, port,
                                              context=ctx)
    httpsConnection.request("POST", url, urlencode(data), headers)

    response = httpsConnection.getresponse()

    if response.status is 200:
        data = response.read()
    else:
        logging.warning("Unable to get volumes")
        logging.warning("Response Code: ", response.status)
        logging.warning("Response: ", response.reason)

    if httpsConnection is not None:
        httpsConnection.close()

    return data


def getPagesFromDataAPI(token, pageIDs, concat):
    data = None

    assert pageIDs is not None, "pageIDs is None"
    assert len(pageIDs) > 0, "pageIDs is less than one"

    url = dataapiEPR
    url = url + "pages?pageIDs=" + quote_plus('|'.join(pageIDs))

    if (concat):
        url = url + "&concat=true"

    print("data api URL: ", url)
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    httpsConnection = http.client.HTTPSConnection(host, port, context=ctx)

    headers = {"Authorization": "Bearer " + token}
    httpsConnection.request("GET", url, headers=headers)

    response = httpsConnection.getresponse()

    if response.status is 200:
        data = response.read()
    else:
        print("Unable to get pages")
        print("Response Code: ", response.status)
        print("Response: ", response.reason)

    if httpsConnection is not None:
        httpsConnection.close()

    return data


def obtainOAuth2Token(username, password):
    token = None
    url = None
    httpsConnection = None

    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    httpsConnection = http.client.HTTPSConnection(host, oauth2port, context=ctx)

    url = oauth2EPRurl
    # make sure to set the request content-type as application/x-www-form-urlencoded
    headers = {"Content-type": "application/x-www-form-urlencoded"}
    data = {
        "grant_type": "client_credentials",
        "client_secret": password,
        "client_id": username
    }
    data = urlencode(data)
    print(data)

    # make sure the request method is POST
    httpsConnection.request("POST", url + "?" + data, "", headers)

    response = httpsConnection.getresponse()

    # if response status is OK
    if response.status is 200:
        data = response.read().decode('utf8')

        jsonData = json.loads(data)
        print("*** JSON: ", jsonData)

        token = jsonData["access_token"]
        print("*** parsed token: ", token)

    else:
        print("Unable to get token")
        print("Response Code: ", response.status)
        print("Response: ", response.reason)
        print(response.read())

    if httpsConnection is not None:
        httpsConnection.close()

    return token


def printZipStream(data):
    # create a zipfile from the data stream
    myzip = ZipFile(BytesIO(data))

    # iterate over all items in the data stream
    for name in myzip.namelist():
        print("Zip Entry: ", name)
        # print the file contents
        print(myzip.read(name))

    myzip.close()


def download_vols(volumeIDs, output, username=None, password=None):
    # create output folder, if nonexistant
    if not os.path.isdir(output):
        os.makedirs(output)

    if not username and not password:
        path = os.path.expanduser('~')
        path = os.path.join(path, '.htrc')
        config = ConfigParser(allow_no_value=True)
        if os.path.exists(path):
            config.read(path)
            if config.has_section('main'):
                username = config.get("main", "username")
                password = config.get("main", "password")

        # If config file is blank, still prompt!
        if not username and not password:
            print("Please enter your HathiTrust credentials.")
            username = input("Token: ")
            password = input("Password: ")
            save = bool_prompt("Save credentials?", default=True)
            if save:
                with open(path, 'w') as credential_file:
                    if not config.has_section('main'):
                        config.add_section('main')
                    config.set('main', 'username', username)
                    config.set('main', 'password', password)
                    config.write(credential_file)

    token = obtainOAuth2Token(username, password)
    if token is not None:
        print("obtained token: %s\n" % token)
        # to get volumes, uncomment next line
        try:
            data = getVolumesFromDataAPI(token, volumeIDs, False)

            # to get pages, uncomment next line
            # data = getPagesFromDataAPI(token, pageIDs, False)

            myzip = ZipFile(BytesIO(data))
            myzip.extractall(output)
            myzip.close()
        except socket.error:
            raise RuntimeError("Data API request timeout. Is your Data Capsule in Secure Mode?")

    else:
        raise RuntimeError("Failed to obtain oauth token.")


def download(args):
    # extract files
    with open(args.file) as IDfile:
        volumeIDs = [line.strip() for line in IDfile]

    return download_vols(volumeIDs, args.output, args.username, args.password)

