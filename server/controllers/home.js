var RawFood  = require('../models/RawFood')
var parse = require('csv-parse')
var fs = require('fs')

exports.getIndex=function (req,res) {
  res.render('index')
}
exports.getUploadRawFood=function(req,res){
var count=0;
fs.createReadStream('./server/data/FinalBase.csv')
	.pipe(parse({delimiter:','}))
	.on('data',function(csvrow){
		console.log(csvrow)
		
							// var foodItem= new RawFood({
							// 	name:csvrow[0],
							// 	calories:csvrow[1],
							// 	protein:csvrow[2],
							// 	carbohydrates:csvrow[3],
							// 	fats:csvrow[4],
							// 	sugar:csvrow[5],
							// 	sodium:csvrow[6],
							// 	time:[],
							// 	diseases:[csvrow[7]],
							// 	allergies:[csvrow[8]],
							// 	foodpref:csvrow[14],
							// 	ethinicity:csvrow[15]
							// 	});

							// 	if(csvrow[9]==1)
							// 	{
							// 		foodItem.time.push("eb")
							// 	}
							// 	if(csvrow[10]==1)
							// 	{
							// 		foodItem.time.push("b")
							// 	}
							// 	if(csvrow[11]==1)
							// 	{
							// 		foodItem.time.push("l")
							// 	}
							// 	if(csvrow[12]==1)
							// 		{
							// 			foodItem.time.push("s")
							// 		}
							// 	if(csvrow[13]==1)
							// 		{
							// 		foodItem.time.push("d")
							// 	}
							
							// foodItem.save(function(err){
							// // console.log(foodItem);
							// 	count=count+1;
							// });

						    })
						    .on('end',function() {
						      //do something wiht csvData
						      console.log("csv done with count",count);
						      res.send("done")
					   		   })




	}

