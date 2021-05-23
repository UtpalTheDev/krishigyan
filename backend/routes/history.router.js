const express=require("express");
const { v4: uuidv4 } = require('uuid');
const router=express.Router();
const { extend } = require("lodash");
const {historymodel}=require("../models/history.model.js")



router.route('/')
 .get(async (req, res) => {
   try{
     const historydata=await historymodel.findOne({historyNo:1});
     //console.log(history)
     res.status(200).json({message:"success",historydata:historydata.history})
   }
   catch (error){
     res.status(500).json({success:500,message:"unable to get history",errormessage:error.message})
   }
  
})
.post(async(req, res) => {
  try{
  let {historyobj}=req.body;
  console.log("historyobj",historyobj)
  let previtems=await historymodel.findOne({historyNo:1}) ; 
  if(!previtems){
    await historymodel.create({historyNo:1,history:[]});
    let previtems=await historymodel.findOne({historyNo:1}) ; 
    previtems.history.push(historyobj)
  }
  else{
  let check=previtems.history.find((item)=>item.id===historyobj.id)
  console.log(check);
  if(check===undefined){
   previtems.history.push(historyobj);
  }
  else{
    previtems.history.map(item=>{
      if(item.id===historyobj.id){
        item.lastseen=historyobj.lastseen
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
  let previtems=await historymodel.findOne({historyNo:1}) ; 
  let {historyid}=req.body;
  let filterdata=previtems.history.filter(eachitem=>eachitem.id!==historyid);
  console.log("filter",filterdata);
  
  let newdata={...previtems,history:filterdata}
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