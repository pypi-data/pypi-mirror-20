from csirtg_indicator import Indicator
import json
from csirtg_indicator.exceptions import InvalidIndicator


def test_indicator_ipv4():
    i = Indicator('192.168.1.1')
    assert i.is_private()
    assert i.indicator == '192.168.1.1'
    assert i.itype == 'ipv4'


def test_indicator_fqdn():
    i = Indicator('example.org')

    assert i.is_private() is False
    assert i.indicator == 'example.org'
    assert i.itype == 'fqdn'


def test_indicator_url():
    i = Indicator('http://example.org', tags='botnet,malware')

    assert i.is_private() is False
    assert i.indicator == 'http://example.org'
    assert i.itype is not 'fqdn'
    assert i.itype is 'url'
    assert 'botnet' in i.tags
    assert 'malware' in i.tags


def test_indicator_str():
    i = Indicator('http://example.org', tags='botnet,malware')

    s = json.loads(str(i))

    assert 'botnet' in s['tags']

    i = Indicator(**s)

    assert 'malware' in i.tags


def test_get_set():
    i = Indicator('localhost.com')

    try:
        i.indicator = 'localhost'
    except InvalidIndicator:
        pass

    i.indicator = 'localhost.org'
    assert i.itype == 'fqdn'

    i.indicator = 'https://192.168.1.1'
    assert i.itype == 'url'

    assert str(i)
    print(i)


def test_format_indicator():
    i = Indicator('example.com')
    i.altid = 'https://csirtg.io/search?q={indicator}'

    i = list(i.format_keys())[0]
    assert i.altid == 'https://csirtg.io/search?q=example.com'


def test_indicator_dest():
    i = Indicator(indicator='192.168.1.1', dest='10.0.0.1', portlist="23", protocol="tcp", dest_portlist='21,22-23')
    assert i.dest
    assert i.dest_portlist
