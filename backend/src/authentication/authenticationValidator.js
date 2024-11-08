const { body, param } = require('express-validator');

const validateSignIn = [
    body('email').notEmpty().isEmail().withMessage('Enter a valid email format'),
    body('password').notEmpty().isString().withMessage('Password must be provided')
];

const validateSignUp = [
    body('email').notEmpty().isEmail().withMessage('Enter a valid email format'),
    body('password').notEmpty().isString().isLength({ min: 5 }).withMessage('Password should be at least 5 characters long'),
    body('username').notEmpty().isString().withMessage('Username must be a non-empty string')
];

module.exports = { validateSignIn, validateSignUp };
