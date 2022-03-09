const JWT = require('jsonwebtoken')

module.expprts = function  (req,res,next){
    const token =  req.header('auth-token');
    if(!token) return res.status(401).send('access denied')

    try{
        const verified = JWT.verify(token,process.env.tokerSec)  
        req.user = verified
    }
    catch(error){
        res.status(401).send('invalid token')
    }
}