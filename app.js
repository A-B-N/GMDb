var mongo = require('mongodb');
//var monk = require('monk');

//var db = monk('localhost:27017/usercollection');
const mongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
var path = require('path');
const CONNECTION_URL = "mongodb+srv://team_280:Gmdb280@cluster7-hzwc0.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "Movie";
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var index = require('./routes/index');

var app = express();

var database, connection;

app.use("/static", express.static('./static/'));
app.listen(3001, () => {
    mongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("imdbcollection");
        console.log("connected to" + DATABASE_NAME + "!");
    })
})

/*
app.use(function(req, res, next)
        {
            req.db = db;
            next();
        });
  */


//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: "String for encrypting cookies.",
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 100,
    activeDuration: 5 * 60 * 100
}));
app.use('/', index);
app.use(express.static(path.join(__dirname, 'stylesheets')));
module.exports = app;

app.get('/', function(req, res) {
    if (req.session.page_views) {
        req.session.page_views++;
        res.send(req.seesion.page_views);
        console.log('Cookies:', req.cookie);
    } else {
        req.session.page_views = 1;
        // res.send("first time!");
    }
});

app.listen(3000);