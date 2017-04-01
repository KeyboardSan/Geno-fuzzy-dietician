const RawFood = require('./../../models/RawFood')
const UserDiet = require('./../../models/UserDiet')

function genetic(user, TC) {
    // Encoding structure of chromosomes
    function chromosome() {
        this.EB = {
            'name': null,
            'C': null,
            'P': null,
            'F': null
        }
        this.B = {
            'name': null,
            'C': null,
            'P': null,
            'F': null
        }
        this.L = {
            'name': null,
            'C': null,
            'P': null,
            'F': null
        }
        this.S = {
            'name': null,
            'C': null,
            'P': null,
            'F': null
        }
        this.D = {
            'name': null,
            'C': null,
            'P': null,
            'F': null
        }
    }
    this.calculate = function() {
    	console.log(user)
    	console.log(TC)

    }




}

module.exports = genetic