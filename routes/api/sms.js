const {Router} = require('express')
const route = Router()
var twilio = require('twilio');


route.post('/sms', (req, res) => {
    var twilio = require('twilio');
    var twiml = new twilio.TwimlResponse();
    twiml.message('The Robots are coming! Head for the hills!');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });

  module.exports = {route}

