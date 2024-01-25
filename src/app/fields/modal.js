const { Schema, model } = require("mongoose")
const Joi = require('joi')

const userSchema = new Schema({
    userName:{
        type:String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }

});


const userSchemaValidation = Joi.object({
    useName: min(3).max(30).required()
})


module.exports = { 
    userModel:model("users", userSchema),


}