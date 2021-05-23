const mongoose=require('mongoose');
require("mongoose-type-url");
//schema
const historySchema=new mongoose.Schema({

historyNo:{type:Number,required:true},
history:[
  {
    id: String,
    title:String,
    dateofpublish: String,
    duration: Number,
    genre: String,
    ishistory:Boolean,
    lastseen:Date
  }
]

})
//model creation
const historymodel=mongoose.model('history',historySchema);

module.exports={historymodel}