const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
userId :{
    type:String,
    required:true,
},

ethWalletId :{
    type:String,
   
},


date:{
    type: Date,
    default:Date.now
}

})

module.exports = mongoose.model('wallets',walletSchema)