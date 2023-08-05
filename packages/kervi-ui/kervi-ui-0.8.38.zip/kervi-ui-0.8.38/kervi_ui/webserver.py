# Copyright (c) 2016, Tim Wentzlau
# Licensed under MIT

""" Simple web server for the Kervi application """
import os
import time
import kervi.utility.nethelper as nethelper
import kervi.spine as spine

try:
    from SimpleHTTPServer import SimpleHTTPRequestHandler
except:
    from http.server import SimpleHTTPRequestHandler

try:
    from BaseHTTPServer import HTTPServer
except:
    from http.server import HTTPServer

import threading
import kervi_ui

SERVER = None
ASSET_PATH = ""
def start(ip_address, http_port, ws_port):
    global SERVER
    kervipath = os.path.dirname(kervi_ui.__file__)
    docpath = os.path.join(kervipath, "web/dist")

    print("http src",docpath)

    js_file = open(docpath+"/global.js", "w")
    js_file.write("kerviSocketAddress='" + str(ip_address) + ":" + str(ws_port) + "';")
    js_file.close()

    #cwd = os.getcwd()
    os.chdir(docpath)
    SERVER = HTTPServer((ip_address, http_port), SimpleHTTPRequestHandler)
    thread = threading.Thread(target=SERVER.serve_forever)
    thread.daemon = True
    thread.start()
    time.sleep(2)
    #os.chdir(cwd)

def stop():
    print("stop web server")
    SERVER.shutdown()
