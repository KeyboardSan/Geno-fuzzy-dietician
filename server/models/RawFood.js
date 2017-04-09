var mongoose = require('mongoose');


var rawFoodSchema= new mongoose.Schema({
	name:String,
	calories:Number,
	protein:Number,
	carbohydrates:Number,
	fats:Number,
	sugar:Number,
	sodium:Number,
	diseases:[String],
	allergies:[String],
	time:[String],
	foodpref:String,
	ethinicity:String

});

var RawFood = mongoose.model('RawFood',rawFoodSchema);
module.exports = RawFood;	
