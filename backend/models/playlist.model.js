const mongoose=require('mongoose');
require("mongoose-type-url");
//schema
const playlistSchema=new mongoose.Schema({

playlistNo:{type:Number,required:true},
playlist:[
  {
    id:String,
    name:String,
    videos:[String]
  }
]

})
//model creation
const playlistmodel=mongoose.model('playlist',playlistSchema);

module.exports={playlistmodel}