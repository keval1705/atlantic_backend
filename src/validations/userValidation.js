const Joi = require('joi');

const createUserValidation = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email(),
    password:Joi.string().optional(),
    isAdmin:Joi.boolean().default(false).optional(),
    employeeId:Joi.string().optional(),
    type:Joi.number().valid(1,2,3).optional()
  }),
};

const loginUserValidation = {
  body:Joi.object().keys({
    email:Joi.string().email(),
    employeeId:Joi.string(),
    password:Joi.string().optional()
  })
}

const getUserValidation ={
  body:Joi.object().keys({
    search:Joi.string().allow(""),
    currentPage:Joi.number().optional(),
    limit:Joi.number().optional()
  })
}

const updateUserValidation ={
  body:Joi.object().keys({
    _id:Joi.string().required(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    email: Joi.string().email(),
    employeeId:Joi.string().optional(),
    type:Joi.number().valid(1,2,3).optional()

  })
}

const deleteUserValidation ={
  body:Joi.object().keys({
    _id:Joi.string().required(),
  })
}


module.exports ={
    createUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation,
    deleteUserValidation

  }