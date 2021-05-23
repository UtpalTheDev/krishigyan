const mongoose=require('mongoose');
require("mongoose-type-url");

//schema
const videoSchema=new mongoose.Schema({

    id: String,
    title:String,
    dateofpublish: String,
    duration: Number,
    genre: String
})
//model creation
const videomodel=mongoose.model('video',videoSchema);

module.exports={videomodel}