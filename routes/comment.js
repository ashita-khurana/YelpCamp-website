var express=require("express"),
	app=express.Router(),
	Camp=require("../models/campground"),
	Comment=require("../models/comment");

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
Camp.findById(req.params.id,function(err,found){
	if(err)
		console.log(err);
	else
		res.render("comments/new",{camp:found});
	});
});
app.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
	Camp.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{
		Comment.create(req.body.comment,function(err,d){
		if(err)
			console.log(err);
			else{
				d.author.id=req.user._id;
				d.author.username=req.user.username;
				d.save();
				campground.comments.push(d);
				campground.save();
                res.redirect("/campgrounds/"+campground._id);
			}
		});	
		}
	});
});

function isLoggedIn(req,res,next){
if(req.isAuthenticated())
	return next();
res.redirect("/login");
}

module.exports=app;