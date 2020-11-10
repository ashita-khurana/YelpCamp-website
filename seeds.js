var mong=require("mongoose");
var Camp=require("./models/campground");
var comm=require("./models/comment");

var data=[
	{name:"site 1",image:"https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",description:"svhcljlfhvbkxdfv"},
	{name:"vdh", image:"https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
description:"huygcuio[qjhbk,os"},
	{name:"site 3",	image:"https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
 description:"huygcui o[qjhbk,os[acjc ]]"}
];
	

function seedDB()
{
	Camp.remove({},function(err){
		if(err)
			console.log(err);
		else{
			console.log("removed");
			data.forEach(function(k){
				Camp.create(k,function(err,d){
					if(err)
						console.log(err);
					else{
						console.log("added");
						comm.create(
						{
							text:"great place",
							author:"steele"
						},function(err,c){
							if(err)
								console.log(err)
							else
							{
								d.comments.push(c);
								d.save();
								console.log("done");
							}
						});
					}
				});
			});
		}
	});
}
module.exports=seedDB;