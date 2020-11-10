var mong=require("mongoose");

var sch=mong.Schema({
	text:String,
	author:{
		id:{
			type:mong.Schema.Types.ObjectId,
			ref:"User"
		},
		username:String
	}
});
module.exports=mong.model("Comment",sch);