var mongoose = require('mongoose');


var userDietSchema = new mongoose.Schema({
    userId: String,
    history: [Object],
    current: {
    	date:Date,
    	TotalFat:Number,
    	TotalCarbohydrates:Number,
    	TotalProtein:Number,
    	TotalCalorie:Number,
        D: {
            name: String,
            C: Number,
            P: Number,
            F: Number
        },
        EB: {
            name: String,
            C: Number,
            P: Number,
            F: Number
        },

        B: {
            name: String,
            C: Number,
            P: Number,
            F: Number
        },

        L: {
            name: String,
            C: Number,
            P: Number,
            F: Number
        },

        S: {
            name: String,
            C: Number,
            P: Number,
            F: Number
        }

    }

});

var UserDiet = mongoose.model('UserDiet', userDietSchema);
module.exports = UserDiet;