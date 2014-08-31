//var opDb = require('../getRss/operationDb');
var opDb = require('../models/modelDb');
function rcntNews(callback){
	opDb.find({})
	        .sort({'pubDate':-1})
	        .limit(10)
	        .exec(function(err, posts){
	        	if(err){console.log(err); return;}
	      	

	    	callback(posts);

	        });
}

exports.rcntNews = rcntNews;