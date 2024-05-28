const joi = require('joi');

const new_Member_Schema = joi.object({
    RegNo: joi.string()
        .min(3)
        .required(),
    Name: joi.string()
        .required()
        .min(3)
        .max(50),
    Course: joi.string()
        .required(),
    Email: joi.string()
        .required(),
    Password: joi.string()
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()-_=+{};:,<.>/?]).{6,30}$'))
        .min(6)
        .max(30)
        .required(),
})

module.exports = { new_Member_Schema };