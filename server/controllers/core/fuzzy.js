// const fuzzylogic = require('fuzzylogic'),
//     rules = require('fuzzylogic/lib/rules.js'),
//     util = require('util'),
//     assert = require('assert')

function fuzzy() {
    var BMR2 = 1,
        BMR = 0
    this.fuzzify = function(BMR1,user) {
         // console.log(user.profile.activity);

        switch (user.profile.activity) {
            case 'NA':
                BMR2 = 1.2
                break;
            case 'LA':
                BMR2 = 1.375
                break;
            case 'MA':
                BMR2 = 1.55
                break;
            case 'HA':
                BMR2 = 1.725
                break;
            case 'VHA':
                BMR2 = 1.9
                break;
            default:
                console.log("Error in calculating BMR2");
        }
        return BMR = BMR1 * BMR2
    }
}
module.exports = fuzzy