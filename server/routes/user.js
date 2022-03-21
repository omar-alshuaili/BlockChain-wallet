const router = require('express').Router();
const Users = require('../model/user');


router.get('/wallets/:id',async(req,res)=>{
  
  
  try{

    const user = await Users.findById(req.params.id)

    res.json(JSON.stringify(user.wallets))
  }
  catch(e){
    res.json(e)
  }
  
   
  })

  module.exports = router
