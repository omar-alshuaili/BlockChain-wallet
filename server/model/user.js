const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({
firstName :{
    type:String,

    min:3,
    max:255,
},
lastName :{
    type:String,

    min:3,
    max:255,
},
email :{
    type:String,

    max:255,
    min:6
},
password :{
    type:String,

    min:6,
    max:1024
   
},
pic :{
    type:String,
    default:'default'
},
isVerified:{
    type:Boolean,
    default: false
},
OTP:{ type:String,
},

jwtToken:{type:String},

wallets:[{
  coin:String,
  address:String  
}],
date:{
    type: Date,
    default:Date.now
}

})

module.exports = mongoose.model('users',userSchema)