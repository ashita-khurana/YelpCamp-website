var e=require("express");
var app=e();
var bp=require("body-parser"),
	mong=require("mongoose"),
	passport=require("passport"),
	LocalStrategy=require("passport-local"),
	User=require("./models/user"),
	MethOver=require("method-override"),
	seedDB=require("./seeds");

var campR=require("./routes/camp");
var commR=require("./routes/comment");
var authR=require("./routes/index");
mong.connect("mongodb://localhost:27017/yelpcamp",{useUnifiedTopology:true, useNewUrlParser: true});


app.use(bp.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(e.static(__dirname+"/public"))
app.use(MethOver("_method"))
seedDB();

//Passport Configuration
app.use(require("express-session")({
	secret : "ifciklkpkub",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.curr=req.user;
	next();
});


app.use(authR);
app.use(commR);
app.use(campR);

app.listen(process.env.PORT||3000 ,process.env.IP);