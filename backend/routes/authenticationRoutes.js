const express = require('express');
const router = express.Router();
const authenicationController = require('../src/authentication/authneticationController');
const {
    validateSignIn,
    validateSignUp
} = require('../src/authentication/authenticationValidator');
const validateRequest = require('../utils/validateRequest');

//POST ROUTES
router.post('/signin', validateSignIn, validateRequest, authenicationController.signinController); //tested*
router.post('/signup', validateSignUp, validateRequest, authenicationController.signupController); // tested*
router.post('/refresh-token', authenicationController.refreshTokenController); //INvalid signature for a valid token
router.post('/reset-password', authenicationController.resetPasswordController); // will fully implemented in the front end
router.post('/check-email-verification', authenicationController.checkEmailVerificationController);
//GET ROUTES
router.get('/verify-email/:id/:token', authenicationController.verifyEmailController);

module.exports = router;