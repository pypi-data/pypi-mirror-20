#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
import os
import ipfsapi
import json
import subprocess
import pkg_resources
import surt
from pywb.utils.binsearch import iter_exact
from pywb.utils.canonicalize import unsurt
# from pywb.utils.canonicalize import canonicalize as surt
from flask import Flask
from flask import Response
from requests.exceptions import ConnectionError
from ipfsapi.exceptions import StatusError as hashNotInIPFS

import requests

import util as ipwbConfig
from util import IPFSAPI_IP, IPFSAPI_PORT, IPWBREPLAY_IP, IPWBREPLAY_PORT
from util import INDEX_FILE
from requests import ReadTimeout

from Crypto.Cipher import XOR
import base64

from werkzeug.routing import BaseConverter

app = Flask(__name__)
app.debug = False

IPFS_API = ipfsapi.Client(IPFSAPI_IP, IPFSAPI_PORT)


@app.route('/webui/<path:path>')
def showWebUI(path):
    webuiPath = '/'.join(('webui', path)).replace('ipwb.replay', 'ipwb')
    content = pkg_resources.resource_string(__name__, webuiPath)

    if 'index.html' in path:
        iFile = ipwbConfig.getIPWBReplayIndexPath()

        if iFile is None or iFile == '':
            iFile = pkg_resources.resource_filename(__name__, INDEX_FILE)

        if not os.path.isabs(iFile):  # Convert rel to abs path
            iFileAbs = pkg_resources.resource_filename(__name__, iFile)
            if os.path.exists(iFileAbs):
                iFile = iFileAbs  # Local file

        content = content.replace(
            'MEMCOUNT', str(retrieveMemCount(iFile)))

        content = content.replace(
            'var uris = []',
            'var uris = {0}'.format(getURIsAndDatetimesInCDXJ(iFile)))
        content = content.replace('INDEXSRC', iFile)

    return Response(content)


@app.route('/daemon/<cmd>')
def commandDaemon(cmd):
    if cmd == 'status':
        return generateDaemonStatusButton()
    elif cmd == 'start':
        subprocess.Popen(['ipfs', 'daemon'])
        # retString = 'Failed to start IPFS daemon'
        # if 'Daemon is ready' in check_output():
        #  retString = 'IPFS daemon started'
        return Response('IPFS daemon starting...')

    elif cmd == 'stop':
        subprocess.call(['killall', 'ipfs'])
        return Response('IPFS daemon stopping...')
    else:
        print 'ERROR, bad command sent to daemon API!'
        print cmd
        return Response('bad command!')


class RegexConverter(BaseConverter):
    def __init__(self, url_map, *items):
        super(RegexConverter, self).__init__(url_map)
        self.regex = items[0]
app.url_map.converters['regex'] = RegexConverter


@app.route('/memento/<path:urir>')
def showMemento(urir):
    print("NOT IMPLEMENTED: showMemento()")
    print(urir)
    return Response('Requested memento ' + urir + ', NOTIMPLEMENTED')


@app.route('/timemap/<path:urir>')
def showTimeMap(urir):
    print("NOT IMPLEMENTED: showTimeMap()")
    print(urir)
    return Response('Requested TimeMap ' + urir + ', NOTIMPLEMENTED')


@app.route('/<regex("[0-9]{14}"):datetime>/<path:urir>')
def showMementoAtDatetime(urir, datetime):
    print("NOT IMPLEMENTED: getMementoAtDatetime()")
    print(datetime)
    print(urir)
    resp = 'Requested' + urir + ' at ' + datetime + ', NOTIMPLEMENTED'
    return Response(resp)


@app.errorhandler(Exception)
def all_exception_handler(error):
    print error
    return 'Error', 500


# This route needs better restructuring but is currently only used to get the
# webUI location for the ipwb webUI, more setting might need to be fetched in
# the future.
@app.route('/config/<requestedSetting>')
def getRequestedSetting(requestedSetting):
    return Response(ipwbConfig.getIPFSAPIHostAndPort() + '/webui')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def show_uri(path):
    global IPFS_API

    print "REQUESTING PATH: {0}".format(path)

    if len(path) == 0:
        return showWebUI('index.html')
        sys.exit()

    daemonAddress = '{0}:{1}'.format(IPFSAPI_IP, IPFSAPI_PORT)
    if not ipwbConfig.isDaemonAlive(daemonAddress):
        errStr = ('IPFS daemon not running. '
                  'Start it using $ ipfs daemon on the command-line '
                  ' or from the <a href="/">'
                  'IPWB replay homepage</a>.')
        return Response(errStr)

    # show the user profile for that user
    cdxLine = ''

    print "Path to find: {0}".format(path)
    try:
        s = surt.surt(path, path_strip_trailing_slash_unless_empty=False)
        cdxLine = getCDXLine(s, ipwbConfig.getIPWBReplayIndexPath())
    except:
        print sys.exc_info()[0]
        respString = ('{0} not found :(' +
                      ' <a href="http://{1}:{2}">Go home</a>').format(
            path, IPWBREPLAY_IP, IPWBREPLAY_PORT)
        return Response(respString)
    if cdxLine is None:  # Resource not found in archives
        return Response(status=404)

    cdxParts = cdxLine.split(" ", 2)

    jObj = json.loads(cdxParts[2])

    digests = jObj['locator'].split('/')

    try:
        payload = IPFS_API.cat(digests[-1], timeout=1)
        header = IPFS_API.cat(digests[-2])
    except ipfsapi.exceptions.TimeoutError:
        print "{0} not found at {1}".format(cdxParts[0], digests[-1])
        respString = ('{0} not found in IPFS :(' +
                      ' <a href="http://{1}:{2}">Go home</a>').format(
            path, IPWBREPLAY_IP, IPWBREPLAY_PORT)
        return Response(respString)
    except:
        print sys.exc_info()[0]
        print "general error"
        sys.exit()

    if 'encryption_method' in jObj:
        pKey = XOR.new(jObj['encryption_key'])
        payload = pKey.decrypt(base64.b64decode(payload))
        hKey = XOR.new(jObj['encryption_key'])
        header = hKey.decrypt(base64.b64decode(header))

    hLines = header.split('\n')
    hLines.pop(0)

    resp = Response(payload)

    for idx, hLine in enumerate(hLines):
        k, v = hLine.split(': ', 1)
        if k.lower() != "content-type":
            k = "X-Archive-Orig-" + k
        resp.headers[k] = v

    return resp


def generateDaemonStatusButton():
    text = 'Not Running'
    buttonText = 'Start'
    if ipwbConfig.isDaemonAlive():
        text = 'Running'
        buttonText = 'Stop'

    statusPageHTML = '<html id="status{0}" class="status">'.format(buttonText)
    statusPageHTML += ('<head><base href="/webui/" /><link rel="stylesheet" '
                       'type="text/css" href="webui.css" />'
                       '<script src="webui.js"></script>'
                       '</head><body>')
    buttonHTML = '{0}<button>{1}</button>'.format(text, buttonText)
    footer = '<script>assignStatusButtonHandlers()</script></body></html>'
    return Response('{0}{1}{2}'.format(statusPageHTML, buttonHTML, footer))


def fetchRemoteCDXJFile(path):
    fileContents = ''
    path = path.replace('ipfs://', '')
    # TODO: Take into account /ipfs/(hash), first check if this is correct fmt

    if '://' not in path:  # isAIPFSHash
        # TODO: Check if a valid IPFS hash
        print 'No scheme in path, assuming IPFS hash and fetching...'
        try:
            print "Trying to ipfs.cat('{0}')".format(path)
            dataFromIPFS = IPFS_API.cat(path)
        except hashNotInIPFS:
            return ''
        except:
            print "An error occurred with ipfs.cat"
            print sys.exc_info()[0]
            sys.exit()
        print 'Data successfully obtained from IPFS'
        return dataFromIPFS
    else:  # http://, ftp://, smb://, file://
        print 'Path contains a scheme, fetching remote file...'
        fileContents = ipwbConfig.fetchRemoteFile(path)
        return fileContents

    if not ipwbConfig.isValidCDXJ(fileContents):
        return None
    return fileContents


def getIndexFileContents(cdxjFilePath=INDEX_FILE):
    if not os.path.exists(cdxjFilePath):
        print 'File {0} does not exist locally, fetching remote'.format(
                                                                 cdxjFilePath)
        return fetchRemoteCDXJFile(cdxjFilePath) or ''

    indexFilePath = '/{0}'.format(cdxjFilePath).replace('ipwb.replay', 'ipwb')
    print 'getting index file at {0}'.format(indexFilePath)

    indexFileContent = ''
    with open(cdxjFilePath, 'r') as f:
        indexFileContent = f.read()

    return indexFileContent


def getIndexFileFullPath(cdxjFilePath=INDEX_FILE):
    indexFilePath = '/{0}'.format(cdxjFilePath).replace('ipwb.replay', 'ipwb')

    if os.path.isfile(cdxjFilePath):
        return cdxjFilePath

    indexFileName = pkg_resources.resource_filename(__name__, indexFilePath)
    return indexFileName


def getURIsAndDatetimesInCDXJ(cdxjFilePath=INDEX_FILE):
    indexFileContents = getIndexFileContents(cdxjFilePath)

    if not indexFileContents:
        return 0

    lines = indexFileContents.strip().split('\n')

    uris = {}
    for i, l in enumerate(lines):
        cdxjFields = l.split(' ')
        uri = unsurt(cdxjFields[0])
        datetime = cdxjFields[1]
        if uri not in uris:
            uris[uri] = []
        uris[uri].append(datetime)

        pass
    return json.dumps(uris)


def retrieveMemCount(cdxjFilePath=INDEX_FILE):
    print "Retrieving URI-Ms from {0}".format(cdxjFilePath)
    indexFileContents = getIndexFileContents(cdxjFilePath)

    if not indexFileContents:
        return 0

    lines = indexFileContents.strip().split('\n')
    if not lines:
        print "Index file not found"
        return 0
    for i, l in enumerate(lines):
        pass
    return i + 1


def getCDXLine(surtURI, cdxjFilePath=INDEX_FILE):
    # Our implementation of pywb's binsearch is not properly done here
    #  reverting to linear for correctness over efficiency
    fullFilePath = getIndexFileFullPath(cdxjFilePath)

    with open(fullFilePath, 'r') as cdxjFile:
        print "looking for {0} in {1}".format(surtURI, fullFilePath)

        found = False
        for line in cdxjFile:
            cdxjLine = line
            surtInCDXJ = cdxjLine.split(' ')[0]
            if surtInCDXJ == surtURI:
                found = True
                print 'found line!'
                print line
                break
            else:
                print "{0} not found in {1}".format(surtURI, surtInCDXJ)
        # bsResp = iter_exact(cdxjFile, surtURI)

        if not found:
            return None
        print "CDXJline: {0}".format(cdxjLine)
        # cdxjLine = bsResp.next()

        return cdxjLine


def start(cdxjFilePath=INDEX_FILE):
    hostPort = ipwbConfig.getIPWBReplayConfig()
    if not hostPort:
        ipwbConfig.setIPWBReplayConfig(IPWBREPLAY_IP, IPWBREPLAY_PORT)
        hostPort = ipwbConfig.getIPWBReplayConfig()

    ipwbConfig.firstRun()
    ipwbConfig.setIPWBReplayIndexPath(cdxjFilePath)
    app.cdxjFilePath = cdxjFilePath

    app.run(host=IPWBREPLAY_IP, port=IPWBREPLAY_PORT)


if __name__ == "__main__":
    start()

# Read in URI, convert to SURT
#  surt(uriIn)
# Get SURTed URI lines in CDXJ
#  Read CDXJ
#  Do bin search to find relevant lines

# read IPFS hash from relevant lines (header, payload)

# Fetch IPFS data at hashes
