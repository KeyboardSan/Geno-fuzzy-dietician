var _ = require('lodash')
var Fuzzy = require('./core/fuzzy')
var Genetic = require('./core/genetic')
exports.getDiet = function(req, res) {
    //fetcht the data and display..

    res.render('viewdiet')
}

exports.getCalculateDiet = function(req, res) {
    res.render('calculatediet')
}

exports.postCalculateDiet = function(req, res) {
    var ethnicity = []
        // TODO

    // consider if user doesn`t enter all. then fetch values from database.

    // console.log(req.body.ethnicity)
    ethnicity = ethnicity.concat(req.body.ethnicity)
        // console.log(ethnicity)


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
    switch (req.user.goal) {
        case 'LF':
            TC = BMR - 400
            break;
        case 'LM':
            TC = BMR + 100
            break;
        case 'MM':
            TC = BMR
            break;
        default:
    }
    console.log('TC=' + TC);
    
    var genetic = new Genetic(req.user,TC)
    diet=genetic.calculate()

}