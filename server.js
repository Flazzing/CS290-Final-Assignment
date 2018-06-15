/////////////////////////////////
//  Setup global dependencies  //
/////////////////////////////////
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || '27017';
var mongoUsername = process.env.MONGO_USERNAME;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoURL = "mongodb://" +
  mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort +
  "/" + mongoDBName;

///////////////////////////////////////////////////////////////////////
//  Initiate express and handlebars and set port to desired or 3000  //
///////////////////////////////////////////////////////////////////////
var app = express();
var port = process.env.PORT || 3000;
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


////////////////////////////////////////
//  Render home page as default page  //
////////////////////////////////////////
app.get('/', function (req, res, next) {
  res.status(200).render('home');
});

/////////////////////////////////////////////
//  Render page of file typed into browser //
/////////////////////////////////////////////
app.use(express.static('public'));
app.use(bodyParser.json());

////////////////////////////////////////////////////
//  Render 404 if non-existant file is requested  //
////////////////////////////////////////////////////
app.get('*', function (req, res, next) {
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
