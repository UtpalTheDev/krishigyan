const mongoose=require('mongoose');
require("mongoose-type-url");
//schema
const likedSchema=new mongoose.Schema({

likedNo:{type:Number,required:true},
liked:[
  {
    id: String,
    title:String,
    dateofpublish: String,
    duration: Number,
    genre: String,
    islike:Boolean,
    
  }
]

})
//model creation
const likedmodel=mongoose.model('like',likedSchema);

module.exports={likedmodel}