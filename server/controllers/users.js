var User = require('../models/User')
var passport = require('passport');

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
        }
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