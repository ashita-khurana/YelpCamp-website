var mong=require("mongoose");

var sch= new mong.Schema({
	name:String,image:String,description:String,
	author:{
		id:{
			type:mong.Schema.Types.ObjectId,
			ref:"User"
		
	}, username:String
	},
	comments:[
		{
         type: mong.Schema.Types.ObjectId,
         ref: "Comment"
        }]
});

module.exports=mong.model("Camp",sch);