import joi from "joi";

export const userSignInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});