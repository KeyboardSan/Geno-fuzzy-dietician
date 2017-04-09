var mongoose = require('mongoose');


var userDietSchema = new mongoose.Schema({
    userId: String,
    history: [{
        date: Date,
        TotalFat: Number,
        TotalCarbohydrates: Number,
        TotalProtein: Number,
        TotalCalorie: Number,
        d: {
            name: String,
            calories: Number,
            protein: Number,
            carbohydrates: Number,
            fats: Number,
            sugar: Number,
            sodium: Number,
        },
        eb: {
             name: String,
            calories: Number,
            protein: Number,
            carbohydrates: Number,
            fats: Number,
            sugar: Number,
            sodium: Number,
        },

        b: {
             name: String,
            calories: Number,
            protein: Number,
            carbohydrates: Number,
            fats: Number,
            sugar: Number,
            sodium: Number,
        },

        l: {
            name: String,
            calories: Number,
            protein: Number,
            carbohydrates: Number,
            fats: Number,
            sugar: Number,
            sodium: Number,
        },

        s: {
            name: String,
            calories: Number,
            protein: Number,
            carbohydrates: Number,
            fats: Number,
            sugar: Number,
            sodium: Number,
            
        }

    }],
    current: {
        date: Date,
        TotalFat: Number,
        TotalCarbohydrates: Number,
        TotalProtein: Number,
        TotalCalorie: Number,
        d: {
            name: String,
            calories: Number,
            protein: Number,
            carbohydrates: Number,
            fats: Number,
            sugar: Number,
            sodium: Number,
        },
        eb: {
             name: String,
            calories: Number,
            protein: Number,
            carbohydrates: Number,
            fats: Number,
            sugar: Number,
            sodium: Number,
        },

        b: {
             name: String,
            calories: Number,
            protein: Number,
            carbohydrates: Number,
            fats: Number,
            sugar: Number,
            sodium: Number,
        },

        l: {
            name: String,
            calories: Number,
            protein: Number,
            carbohydrates: Number,
            fats: Number,
            sugar: Number,
            sodium: Number,
        },

        s: {
        	name: String,
            calories: Number,
            protein: Number,
            carbohydrates: Number,
            fats: Number,
            sugar: Number,
            sodium: Number,
            
        }

    }

});

var UserDiet = mongoose.model('UserDiet', userDietSchema);
module.exports = UserDiet;