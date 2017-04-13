var User = require('../models/User')
var passport = require('passport');
var nodemailer=require('nodemailer');

exports.postSignup = function(req, res) {
    // console.log(req.body.activity)



    var user = new User({

        email: req.body.email,
        password: req.body.password,
        type: 'user',
        profile: {
            fname: req.body.Fname,
            gender: req.body.gender,
            lname: req.body.Lname,
            height: req.body.height,
            weight: req.body.weight,
            age: req.body.age,
            ethnicity: [],
            foodpref: [],
            diseases: [],
            allergies: [],
            activity: req.body.activity,
            goal: req.body.goal
        },
        dislikeforever: []
    })

    user.profile.ethnicity = user.profile.ethnicity.concat(req.body.ethnicity)
    user.profile.foodpref = user.profile.foodpref.concat(req.body.foodpref)
    user.profile.diseases = user.profile.diseases.concat(req.body.diseases)
    user.profile.allergies = user.profile.allergies.concat(req.body.allergies)

    user.save(function(err, done) {
        console.log("user " + user.email + "  created");
        res.redirect('/');
    });
}


exports.postLogin = function(req, res, next) {
    console.log(req.body.password)
    passport.authenticate('Local', function(err, user, info) {
        if (err) return next(err);
        if (!user) {
            console.log('errors at post signin ');
            return res.redirect('/');
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            console.log('Success! You are logged in.');
            res.redirect(req.session.returnTo || '/');
        });
    })(req, res, next);
}


exports.getLogout = function(req, res) {
    req.logout();
    res.redirect('/');

}

exports.getChangeProfile = function(req, res) {
    res.render('changeprofile')
}
exports.postChangeProfile = function(req, res) {

    // User.findOneAndUpdate({
    //     '_id': req.user._id
    // }, {

    // }, function(err, user) {
    //     console.log(user)
    // })
}

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'explara.event.invite@gmail.com', //new mail id made for the sake of project
        pass: 'aakashankitchintan' // by default emails will be sent from this id
    }
})


exports.cronEBReminder = function() {
    User.find({}, function(err, users) {
        users.forEach(function(user) {
            var textMailBody = htmlMailBody = 'This is a reminder to have your Early BreakFast. Please check the application for the food items. <br> Regards, <br> Team GFD ';
            var mailOptions = {
                from: 'Team GFD', // sender address 
                to: req.body.email, // list of receivers 
                subject: ' GFD : Reminder: Early BreakFast ', // Subject line 
                text: textMailBody, // plaintext body alt for html 
                html: htmlMailBody
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });

        })
    });
}

exports.cronBReminder = function() {
    User.find({}, function(err, users) {
        users.forEach(function(user) {
            var textMailBody = htmlMailBody = 'This is a reminder to have your  BreakFast. Please check the application for the food items. <br> Regards, <br> Team GFD ';
            var mailOptions = {
                from: 'Team GFD', // sender address 
                to: req.body.email, // list of receivers 
                subject: ' GFD : Reminder: BreakFast ', // Subject line 
                text: textMailBody, // plaintext body alt for html 
                html: htmlMailBody
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });

        })
    });
}

exports.cronLReminder = function() {
    User.find({}, function(err, users) {
        users.forEach(function(user) {
            var textMailBody = htmlMailBody = 'This is a reminder to have your  Lunch. Please check the application for the food items. <br> Regards, <br> Team GFD ';
            var mailOptions = {
                from: 'Team GFD', // sender address 
                to: req.body.email, // list of receivers 
                subject: ' GFD : Reminder: Lunch ', // Subject line 
                text: textMailBody, // plaintext body alt for html 
                html: htmlMailBody
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });

        })
    });
}
exports.cronSReminder = function() {
    User.find({}, function(err, users) {
        users.forEach(function(user) {
            var textMailBody = htmlMailBody = 'This is a reminder to have your  Snacks. Please check the application for the food items. <br> Regards, <br> Team GFD ';
            var mailOptions = {
                from: 'Team GFD', // sender address 
                to: req.body.email, // list of receivers 
                subject: ' GFD : Reminder: Snacks ', // Subject line 
                text: textMailBody, // plaintext body alt for html 
                html: htmlMailBody
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });

        })
    });
}
exports.cronDReminder = function() {
    User.find({}, function(err, users) {
        users.forEach(function(user) {
            var textMailBody = htmlMailBody = 'This is a reminder to have your  Dinner. Please check the application for the food items. <br> Regards, <br> Team GFD ';
            var mailOptions = {
                from: 'Team GFD', // sender address 
                to: req.body.email, // list of receivers 
                subject: ' GFD : Reminder: Dinner ', // Subject line 
                text: textMailBody, // plaintext body alt for html 
                html: htmlMailBody
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: ' + info.response);
            });

        })
    });
}