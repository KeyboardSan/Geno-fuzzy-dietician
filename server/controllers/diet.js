var _ = require('lodash')

exports.getDiet=function(req,res){
	//fetcht the data and display..

	res.render('viewdiet')
}

exports.getCalculateDiet=function(req,res)
{
res.render('calculatediet')
}

exports.postCalculateDiet=function(req,res)
{
		var ethnicity=[]
	// TODO

	//take care of ethnicity one
	// consider if user doesn`t enter all. 
	
		// console.log(req.body.ethnicity)
		ethnicity=ethnicity.concat(req.body.ethnicity)
		// console.log(ethnicity)
		

		// send the response here if execution time is long
		
		res.render('index');


		console.log("exe after res.")

	}