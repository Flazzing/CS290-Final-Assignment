/////////////////////////////////
//  Setup global dependencies  //
/////////////////////////////////
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

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


////////////////////////////////////////////////////
//  Render 404 if non-existant file is requested  //
////////////////////////////////////////////////////
app.get('*', function (req, res, next) {
  res.status(404).render('404Page');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});