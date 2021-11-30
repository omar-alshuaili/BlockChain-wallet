const router = require('express').Router();
const userModel  = require('../model/user');
const { validateUserRegister,validateUserLogin} = require('../validation')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
//validation 
const Joi = require('@hapi/joi')
const schema = {
    name :Joi.string().min(6).max(255).required(),
    email:Joi.string().min(6).max(255).required().email(),
    password:Joi.string().min(6).max(255).required(),
}
router.post('/register', async (req,res) =>{

    //validation before adding users 
   

    const {error} = validateUserRegister(req.body)
    if(error) return res.status(400).send(error.details[0].message)


    const emailExist = await userModel.findOne({email:req.body.email})
    if(emailExist) return res.status(400).send('email already exists')

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);


    const user = new userModel({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword

    })
    try{
    const saveUser = await user.save()
    res.send(saveUser)
    }
    catch(err){
        res.status(400).send(err)
    }
});


//log in 
router.post('/login', async (req,res) =>{

    //validation before adding users 
   

    const {error} = validateUserLogin(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    //check if the email exists 
    const user = await userModel.findOne({email:req.body.email})
    if(!user) return res.status(400).send('email or password is wrong')

    //password is correct?
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).send("Invalid password !");

    //create token
    const token = JWT.sign({_id:user._id},process.env.tokerSec)
    res.header('auth-token',token).send(token)


});


module.exports  = router
