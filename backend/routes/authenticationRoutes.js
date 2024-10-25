const express = require('express');
const router = express.Router();
const authenicationController = require('../src/authentication/authneticationController');


//POST ROUTES
router.post('/signin', authenicationController.signinController); //tested*
router.post('/signup', authenicationController.signupController); // tested*
router.post('/refresh-token', authenicationController.refreshTokenController); //INvalid signature for a valid token
router.post('/reset-password', authenicationController.resetPasswordController); // will fully implemented in the front end

//GET ROUTES
router.get('/verify-email/:id/:token', authenicationController.verifyEmailController);

module.exports = router;