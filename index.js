//importing modules
const express = require('express'),
	  mongoose=require('mongoose'),
	  bodyParser=require('body-parser'),
	  passport=require('passport'),
	  session=require('express-session'),
	  MongoStore=require('connect-mongo')(session);

//setting up variables.
var PORT =80,
    ipaddress="localhost"
//creating instances
const app=express()

//creating controllers.
const homeController = require('./server/controllers/home');
const userController = require('./server/controllers/users');
const dietController = require('./server/controllers/diet');

var passportConf = require('./server/config/passport');

//configuration of view engine
app.set('views', __dirname + '/server/views');
app.set('view engine','jade');

// setting static foldler
app.use(express.static('public'));
//using sessions
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'Any secret to encrypt the session ',
  store: new MongoStore({ url: 'mongodb://localhost/Geno-Fuzzy-Dietician', autoReconnect: true })
}));

// storing sessions
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});


mongoose.connect('mongodb://localhost/Geno-Fuzzy-Dietician');
console.log('local mongodb opened');


app.use(bodyParser.json());// assuming POST: {"name":"foo","color":"red"} <-- JSON encoding
app.use(bodyParser.urlencoded({extended:true}));// assuming POST: name=foo&color=red <-- URL encoding



app.get('/',homeController.getIndex);
app.post('/signup',userController.postSignup)
app.post('/login',userController.postLogin)
app.get('/logout',userController.getLogout)
app.get('/uploadrawfood',homeController.getUploadRawFood)
app.get('/viewdiet',dietController.getDiet)
app.get('/calculatediet',dietController.getCalculateDiet)
app.post('/calculatediet',dietController.postCalculateDiet)
app.get('/removenow/:id',dietController.getRemoveNow)



app.listen(PORT)
console.log("Server started on port ",PORT);
