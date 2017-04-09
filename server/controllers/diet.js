var _ = require('lodash')
var Fuzzy = require('./core/fuzzy')
var Genetic = require('./core/genetic')
const UserDiet = require('../models/UserDiet')

exports.getDiet = function(req, res) {
    //fetcht the data and display..

    UserDiet.findOne({userId:req.user._id},function(err,user){
        res.render('viewdiet',{diet:user.current})
    })
}

exports.getCalculateDiet = function(req, res) {
    res.render('calculatediet')
}

exports.postCalculateDiet = function(req, res) {
    var ethnicity = []
        // TODO

    // consider if user doesn`t enter all. then fetch values from database.

    // console.log(req.body.ethnicity)
    if (req.body.ethnicity) {
        ethnicity = ethnicity.concat(req.body.ethnicity)
    } else {
        ethnicity = req.user.profile.ethnicity
            // console.log(req.user)
    }


    // send the response here if execution time is long

    // res.render('index');

    //Calculating BMR1 of the user based on his initial details

    var BMR1 = 10 * req.body.weight + 6.25 * req.body.height - 5 * req.body.age
        // console.log(req.user.profile.gender)
    if (req.user.profile.gender == "male") {
        BMR1 = BMR1 + 5;
    } else {

        BMR1 = BMR1 - 161
    }


    // Start fuzzification to get the value of BMR2 based on the value of user`s activity.
    var fuzzy = new Fuzzy()
    var BMR = fuzzy.fuzzify(BMR1, req.user)
    
        // console.log(req.user)

    var TC = BMR
    switch (req.user.profile.goal) {
        case 'LF':
            req.user.profile.TC = BMR - 400
            req.user.profile.TF = 0.60 * req.user.profile.TC * 0.12959782
            req.user.profile.TP = 0.35 * req.user.profile.TC * 0.12959782
            req.user.profile.TCC = 0.05 * req.user.profile.TC * 0.12959782
            break;
        case 'LM':
            req.user.profile.TC = BMR + 100
            req.user.profile.TF = 0.25 * req.user.profile.TC * 0.12959782
            req.user.profile.TP = 0.35 * req.user.profile.TC * 0.12959782
            req.user.profile.TCC = 0.45 * req.user.profile.TC * 0.12959782
            break;
        case 'MM':
            req.user.profile.TC = BMR
            req.user.profile.TF = 0.30 * req.user.profile.TC * 0.12959782
            req.user.profile.TP = 0.30 * req.user.profile.TC * 0.12959782
            req.user.profile.TCC = 0.40 * req.user.profile.TC * 0.12959782
            break;
        default:
            console.log("default category")
    }

    // // converting calories to grams as stored in database as 1 calorie is 129.59782 grams.
    // console.log("Diet details are")
    // console.log(req.user.profile)

    var genetic = new Genetic(req.user, ethnicity,res)
    diet = genetic.calculate()

}