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
            _id: String,
            name: String,
            calories: Number,
            protein: Number,
            carbohydrates: Number,
            fats: Number,
            sugar: Number,
            sodium: Number,
        },
        eb: {
            _id: String,
             name: String,
            calories: Number,
            protein: Number,
            carbohydrates: Number,
            fats: Number,
            sugar: Number,
            sodium: Number,
        },

        b: {
            _id: String,
             name: String,
            calories: Number,
            protein: Number,
            carbohydrates: Number,
            fats: Number,
            sugar: Number,
            sodium: Number,
        },

        l: {
            _id: String,
            name: String,
            calories: Number,
            protein: Number,
            carbohydrates: Number,
            fats: Number,
            sugar: Number,
            sodium: Number,
        },

        s: {
            _id: String,
            name: String,
            calories: Number,
            protein: Number,
            carbohydrates: Number,
            fats: Number,
            sugar: Number,
            sodium: Number,
            
        },
        params:{
            height: Number,
            weight: Number,
            age: Number,
            ethnicity: [String]
        }


    }],
    current: {
        date: Date,
        TotalFat: Number,
        TotalCarbohydrates: Number,
        TotalProtein: Number,
        TotalCalorie: Number,
        d: {
            _id: String,
            name: String,
            calories: Number,
            protein: Number,
            carbohydrates: Number,
            fats: Number,
            sugar: Number,
            sodium: Number,
        },
        eb: {
            _id: String,
            name: String,
            calories: Number,
            protein: Number,
            carbohydrates: Number,
            fats: Number,
            sugar: Number,
            sodium: Number,
        },

        b: {
            _id: String,
            name: String,
            calories: Number,
            protein: Number,
            carbohydrates: Number,
            fats: Number,
            sugar: Number,
            sodium: Number,
        },

        l: {
            _id: String,
            name: String,
            calories: Number,
            protein: Number,
            carbohydrates: Number,
            fats: Number,
            sugar: Number,
            sodium: Number,
        },

        s: {
            _id: String,
        	name: String,
            calories: Number,
            protein: Number,
            carbohydrates: Number,
            fats: Number,
            sugar: Number,
            sodium: Number,
            
        },
        params:{
            height: Number,
            weight: Number,
            age: Number,
            ethnicity: [String]
        }

    }

});

var UserDiet = mongoose.model('UserDiet', userDietSchema);
module.exports = UserDiet;