var express = require("express"),
    bodyParser = require('body-parser'),
    oauthserver = require('oauth2-server');

var app = express();

app.set("x-powered-by",false);

app.use(express.static('public',{}));

app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(bodyParser.json());

app.oauth = oauthserver({
  model: {}, //require('./model'),
  grants: ['auth_code', 'password'],
  debug: true
});



// Error handling
app.use(app.oauth.errorHandler());

app.listen(process.env.PORT||3000);
