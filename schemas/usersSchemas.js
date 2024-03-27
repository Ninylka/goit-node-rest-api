import Joi from "joi";
export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;



 const registerSchema = Joi.object({
    password: Joi.string().min(10).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    subscription: Joi.string().valid('starter', 'pro', 'business'),

})



  const loginSchema = Joi.object({
    password: Joi.string().min(10).required(),
    email: Joi.string().pattern(emailRegexp).required(),
})

const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
})
.messages({
  "any.required": "missing required field email",
});

export const schemas = {
    registerSchema,
    loginSchema,
    userEmailSchema,
}



