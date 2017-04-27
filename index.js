//importing modules
const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    schedule = require('node-schedule');
var nodemailer = require('nodemailer');

//setting up variables.
var PORT = 80,
    ipaddress = "localhost"
    //creating instances
const app = express()

//creating controllers.
const homeController = require('./server/controllers/home');
const userController = require('./server/controllers/users');
const dietController = require('./server/controllers/diet');
3

//getting modals
const UserDiet = require('./server/models/UserDiet')
const User = require('./server/models/User')



var passportConf = require('./server/config/passport');

//configuration of view engine
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

// setting static foldler
app.use(express.static('public'));
//using sessions
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'Any secret to encrypt the session ',
    store: new MongoStore({
        url: 'mongodb://localhost/Geno-Fuzzy-Dietician',
        autoReconnect: true
    })
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


app.use(bodyParser.json()); // assuming POST: {"name":"foo","color":"red"} <-- JSON encoding
app.use(bodyParser.urlencoded({
    extended: true
})); // assuming POST: name=foo&color=red <-- URL encoding



app.get('/', homeController.getIndex);
app.post('/signup', userController.postSignup)
app.post('/login', userController.postLogin)
app.get('/logout', userController.getLogout)
app.get('/uploadrawfood', homeController.getUploadRawFood)
app.get('/viewdiet', dietController.getDiet)
app.get('/calculatediet', dietController.getCalculateDiet)
app.post('/calculatediet', dietController.postCalculateDiet)
app.get('/removenow/:id', dietController.getRemoveNow)
app.get('/removeforever/:id', dietController.getRemoveForever)
app.post('/forgotpass', homeController.postForgotPass)
app.get('/changeprofile', userController.getChangeProfile)
app.post('/changeprofile', userController.postChangeProfile)
app.post('/changeprofile', userController.postChangeProfile)
app.get('/aboutus',homeController.getAboutUs)


//setting up cron job
// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    |
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)



var EB = schedule.scheduleJob('0 0 7 * * *', userController.cronEBReminder)
var B = schedule.scheduleJob('0 30 9 * * *', userController.cronBReminder)
var L = schedule.scheduleJob('0 0 13 * * *', userController.cronLReminder)
var S = schedule.scheduleJob('0 0 17 * * *', userController.cronSReminder)
var D = schedule.scheduleJob('0 0 21 * * *', userController.cronDReminder)



app.listen(PORT)
console.log("Server started on port ", PORT);