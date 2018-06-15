/////////////////////////////////
//  Setup global dependencies  //
/////////////////////////////////
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var mongoHost = process.env.MONGO_HOST || 'classmongo.engr.oregonstate.edu';
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUsername = process.env.MONGO_USERNAME || 'cs290_dillanea';
var mongoPassword = process.env.MONGO_PASSWORD || 'cs290_dillanea';
var mongoDBName = process.env.MONGO_DB_NAME || 'cs290_dillanea';

var mongoURL = "mongodb://" +
  mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort +
  "/" + mongoDBName;

var mongoDB =  null;

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

app.get('/users', function (req, res, next) {
  var userCollection = mongoDB.collection('users');
  userCollection.find().toArray(function (err, user) {
    if (err) {
      res.status(500).send("Error fetching people from DB.");
    } else {
      res.status(200).render('userPage', {
        user: user
      });
    }
  });
});

app.get('/users/:user', function (req, res, next) {
  var user = req.params.user.toLowerCase();
  var userCollection = mongoDB.collection('users');
  userCollection.find({ author: user  }).toArray(function (err, acs) {
    if (err) {
      res.status(500).send("Error fetching user from DB.");
    } else if (acs.length > 0) {
      res.status(200).render('userClipPage', acs[0]);
    } else {
      next();
    }
  });
});

app.post('/', function (req, res, next) {
	if(req.body && req.body.clipAuthor && req.body.clipComment && req.body.clipAudio){
		var audio_clip = {
			clipComment: req.body.clipComment,
			clipAudio: req.body.clipAudio
		};
		var userCollection = mongoDB.collection('users');
		userCollection.updateOne(
		{author: req.body.clipAuthor},
		{ $push: { audio_clips: audio_clip}},
		function(err, result){
			if(err){
				res.status(500).send("Error inserting audio clip");
			}
			else{
				console.log("== mongo insert result:", result);
				if (result.matchedCount > 0) {
					res.status(200).end();
				} 
				else {
					next();
				}
			}
		}
		);
	}
	else{
		res.status(400).send("Request needs a JSON body with caption and photoURL.");
	}
	
	});


////////////////////////////////////////////////////
//  Render 404 if non-existant file is requested  //
////////////////////////////////////////////////////
app.get('*', function (req, res, next) {
  res.status(404).render('404');
});

MongoClient.connect(mongoURL, function (err, client) {
  if (err) {
    throw err;
  }
  mongoDB = client.db(mongoDBName);
  app.listen(port, function () {
    console.log("== Server listening on port", port);
  });
})
