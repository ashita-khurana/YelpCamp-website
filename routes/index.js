var express=require("express"),
	app=express.Router(),
	Camp=require("../models/campground"),
	Comment=require("../models/comment"),
	passport=require("passport"),
	//LocalStrategy=require("passport-local"),
	User=require("../models/user");


app.get("/",function(req,res){
	res.render("landing");
});





//Auth routes
app.get("/register",function(req,res){
res.render("register");
});

app.post("/register",function(req,res){
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
	if (err){
		console.log(err);
		return res.render('register');
	}
	passport.authenticate("local")(req,res,function(){
		res.redirect("/campgrounds");		
	});
	});
});

app.get("/login",function(req,res)
{
res.render("login");
});

app.post("/login",passport.authenticate("local",{
successRedirect:"/campgrounds",
failureRedirect:"/login"  
}),function(req,res){
});

app.get("/logout",function(req,res)
{
req.logout();
res.redirect("/campgrounds");
});

function isLoggedIn(req,res,next){
if(req.isAuthenticated())
	return next();
res.redirect("/login");
}


module.exports=app;