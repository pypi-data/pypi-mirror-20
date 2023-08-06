

import json
import urllib.request, urllib.error, urllib.parse


class Box:
    def __init__(self, publisher, name):
        json_url = "https://atlas.hashicorp.com/{0}/boxes/{1}/"\
                    .format(publisher, name)
        request = urllib.request.Request(json_url, None,
                    {'Accept': 'application/json'})
        json_file = urllib.request.urlopen(request)
        self._data = json.loads(json_file.read().decode('utf-8'))

    def versions(self):
        return tuple(v['version'] for v in self._data['versions']
                                    if v['status'] == 'active')

    def providers(self, version):
        _ver = ([v for v in self._data['versions']
                    if v['version'] == version])[0]
        return [p['name'] for p in _ver['providers']]

    def url(self, version, provider):
        _ver = ([v for v in self._data['versions']
                    if v['version'] == version])[0]
        return ([p for p in _ver['providers']
                    if p['name'] == provider])[0]['url']
