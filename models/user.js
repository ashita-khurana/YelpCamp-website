var mong=require("mongoose"),
	passlocal=require("passport-local-mongoose"),
	sch=mong.Schema({
	username:String,pass:String
});
sch.plugin(passlocal);
module.exports=mong.model("User",sch);