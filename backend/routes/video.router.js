const express=require("express");
const { v4: uuidv4 } = require('uuid');
const router=express.Router();
const { extend } = require("lodash");
const {videomodel}=require("../models/video.model.js")




router.route('/')
 .get(async (req, res) => {
   try{
     const videos=await videomodel.find({});
     res.json(videos)
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get videos",errormessage:err.message})
   }
  
})
.post(async(req, res) => {
  try{
  let video=req.body;
  let newvideo=await videomodel.create(video);
  //let savedvideo=await newvideo.save();
  res.json({success:true,video:newvideo})
  }
  catch (err){
    res.status(500).json({success:false,message:"unable to add videos",errormessage:err.message})
  }
});

module.exports=router;