import pprint
import urllib2

def urllib(url, data, fail_silently):
    request = urllib2.Request(url)

    try:
        urllib2.urlopen(request)
    except Exception:
        if not fail_silently:
            raise

def console(url, data, fail_silently):
    print "I: HipChat message:"
    pprint.pprint(data, indent=4)
    print "-" * 79

def disabled(url, data, fail_silently):
    pass
