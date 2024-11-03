const {body,param} = require('express-validator');

const validateSignIn = [
    body('email').notEmpty().isEmail().withMessage('Enter a valid email form'),
    body('password').notEmpty().isString()
];

const validateSignUp = [
    body('email').notEmpty().isEmail().withMessage('Enter a valid email form'),
    body('password').notEmpty().isString().length({min:5}).withMessage('Password should be atleast made up of 5 characters'),
    body('username').notEmpty().isString().withMessage('User name must be String and not empty'),
];



