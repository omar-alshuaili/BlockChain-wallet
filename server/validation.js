const Joi = require('joi');
const mongoose = require('mongoose');


const  validateUserRegister = (user) => {
    const schema = Joi.object({
        name :Joi.string().min(3).max(255).required(),
        email:Joi.string().min(6).max(255).required().email(),
        password:Joi.string().min(6).max(255).required(),
    })
    return schema.validate(user);
}

const  validateUserLogin = (user) => {
    const schema = Joi.object({
        email:Joi.string().min(3).max(255).required().email(),
        password:Joi.string().min(6).max(255).required(),
    })
    return schema.validate(user);
}

module.exports.validateUserRegister = validateUserRegister;
module.exports.validateUserLogin = validateUserLogin;