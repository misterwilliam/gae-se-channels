import webapp2

from google.appengine.api import channel

CHANNEL_ID = "blah"

class MainPage(webapp2.RequestHandler):

    def get(self):

        token = channel.create_channel(CHANNEL_ID)
        print "Request channel"
        self.response.write('{"token": "%s"}' % token)


class Send(webapp2.RequestHandler):

    def get(self):
        # Send some messages
        print "send message 1"
        channel.send_message(CHANNEL_ID, "mesg1")
        print "send message 2"
        channel.send_message(CHANNEL_ID, "mesg2")


app = webapp2.WSGIApplication([
    ('/channel', MainPage),
    ('/send', Send),
], debug=True)
