const express=require("express");
const { v4: uuidv4 } = require('uuid');
const router=express.Router();
const { extend } = require("lodash");
const {likedmodel}=require("../models/liked.model.js")



router.route('/')
 .get(async (req, res) => {
   try{
     const likeddata=await likedmodel.findOne({likedNo:1});
     //console.log(liked)
     res.status(200).json({message:"success",likeddata:likeddata.liked})
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get liked",errormessage:error.message})
   }
  
})
.post(async(req, res) => {
  try{
  let {likedobj}=req.body;
  console.log("likedobj",likedobj)
  let previtems=await likedmodel.findOne({likedNo:1}) ; 
  if(!previtems){
    await likedmodel.create({likedNo:1,liked:[]});
    let previtems=await likedmodel.findOne({likedNo:1}) ; 
    previtems.liked.push(likedobj)
  }
  else{
  let check=previtems.liked.find((item)=>item.id===likedobj.id)
  console.log(check);
  if(check===undefined){
   previtems.liked.push(likedobj);
  }
  else{
    previtems.liked.map(item=>{
      if(item.id===likedobj.id){
        item.lastseen=likedobj.lastseen
      }
      return item
    })
  }
  }
  await previtems.save();
  res.json({success:true,product:previtems})
  }
  catch (err){
    console.log(err);
    res.status(500).json({success:false,message:"unable to add products",errormessage:err.message})
  }
})
.delete(async(req,res)=>{
  try{console.log(req.body)
  let previtems=await likedmodel.findOne({likedNo:1}) ; 
  let {likedid}=req.body;
  let filterdata=previtems.liked.filter(eachitem=>eachitem.id!==likedid);
  console.log("filter",filterdata);
  
  let newdata={...previtems,liked:filterdata}
   let data=extend(previtems,newdata); 
   console.log("data",data)
  await data.save();
  res.json({success:true,data})
  }
  catch(err){
    console.log(err);
        res.status(500).json({success:false,message:"unable to delete products",errormessage:err.message})
  }
});

module.exports=router;