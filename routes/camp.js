var express=require("express"),
	app=express.Router({mergeParams:true}),
	Camp=require("../models/campground"),
	Comment=require("../models/comment");

app.get("/campgrounds/new",isLoggedIn, function(req,res){
	res.render("camp/form");
});


app.post("/campgrounds",isLoggedIn,function(req,res){
	var n=req.body.name;
	var i=req.body.image;
	var d=req.body.des;
	var auth={
		id:req.user._id,
		username:req.user.username
	}
	var obj={name:n,image:i,description:d,author:auth};
	Camp.create(obj,function(err,d){
		if(err)
			console.log(err);
		else
		res.redirect("/campgrounds");	
	});
	
});

app.get("/campgrounds/:id",function(req,res){
	Camp.findById(req.params.id).populate("comments").exec(function(err,found){
	if(err)
		console.log(err);
	else
		res.render("camp/show",{found:found});
	});
});

app.get("/campgrounds",function(req,res){
	Camp.find({},function(err,data){
	if(err)	
		console.log(err);
	else
		res.render("camp/camp",{cm:data});
	});
	
});

app.get("/campgrounds/:id/edit",checkOwnership,function(req,res){
	Camp.findById(req.params.id,function(err,data){
			res.render("camp/edit",{ found:data});
	});
});

app.put("/campgrounds/:id",function(req,res){
	Camp.findByIdAndUpdate(req.params.id,req.body.k,function(err,data){
		if(err)
			res.redirect("/campgrounds");
		else{
			res.redirect("/campgrounds/"+req.params.id);
			}
	});
});

app.delete("/campgrounds/:id",function(req,res){
	Camp.findByIdAndRemove(req.params.id,function(err,data){
	if(err)
		res.redirect("/campgrounds");
	else{
		res.redirect("/campgrounds/");
	}
});
});
function checkOwnership(req,res,next){
	if(req.isAuthenticated()){
		Camp.findById(req.params.id,function(err,data){
		if(err)	
			res.redirect("back");
		else{
			if(data.author.id.equals(req.user._id))
				next();
			else
				res.redirect("back");
		}
		});
	}
}

function isLoggedIn(req,res,next){
if(req.isAuthenticated())
	return next();
res.redirect("/login");
}
	
module.exports=app ;
	
	
	
	
	
	
	
	
	