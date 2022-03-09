const router = require('express').Router();
const Users = require('../model/user');


router.get('/isVerified/:email',async(req,res)=>{
    const user = await Users.findOne({email:req.params.email})
    if(user.isVerified){
      console.log(user.isVerified);
      return res.status(200).json('true')
    }
    else{
      return res.status(400).json('false')
    }
   
  })