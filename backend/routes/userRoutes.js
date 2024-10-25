const express = require('express');
const router = express.Router();
const userController = require('../src/User/userController');
const authenicateToken = require('../middleware/auth');

const validateDTO = require('../utils/validateDTO');


// GET ROUTES (4/5)
router.get('/:id', authenicateToken, userController.getUserByIdController); // tested*
router.get('/', authenicateToken, userController.findAllUsersController); // tested*
router.get('/search/email', authenicateToken, userController.searchUserByEmailController); //tested*
router.get('/search/username', authenicateToken, userController.searchUserByUsernameController); //tested*
router.get('/profile/:id', authenicateToken, userController.getUserProfileController); // will figure it out when i do the front end for it

// PUT ROUTES (5/5)
router.put('/:id', authenicateToken,userController.updateUserController); //tested*
router.put('/changeEmail/:id', authenicateToken, userController.updateUserEmailController);  //tested* wokring fine but the email confirmation may be a logical issue
router.put('/bio/:id', authenicateToken, userController.updateUserBioController); // tested*
router.put('/skills/:id', authenicateToken, userController.updateUSerSkillsController); //tested*
router.put('/change-password/:id', authenicateToken, userController.changeUserPasswordController); //tested* (when the user changes the pass it should log them out and destroy the token)
router.put('/profile-pic/:id', authenicateToken, userController.updateUserProfilePicController); // tested* (might implement a logic to actually get real images)

// Delete User (1/1)
router.delete('/:id',authenicateToken ,userController.deleteUserController); // tested*


module.exports = router;
