const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
name :{
    type:String,
    required:true,
    min:3,
    max:255,
},
email :{
    type:String,
    required:true,
    max:255,
    min:6
},
password :{
    type:String,
    required:true,
    min:6,
    max:1024
   
},
isVerified:{
    type:Boolean,
    default: false
},
emailToken:{type:String,expires:'2s'},
wallets:String,
date:{
    type: Date,
    default:Date.now
}

})

module.exports = mongoose.model('users',userSchema)