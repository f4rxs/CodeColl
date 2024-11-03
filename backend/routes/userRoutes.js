const express = require('express');
const router = express.Router();
const userController = require('../src/User/userController');
const authenicateToken = require('../middleware/auth');
const {
    validateUserId,
    validateUpdateUser,
    validateEmailChange,
    validateBio,
    validateSkills,
    validatePasswordChange,
    validateProfilePic,
} = require('../src/User/userValidator');
const validateRequest = require('../utils/validateRequest');

// GET ROUTES
router.get('/:id', authenicateToken, validateUserId, validateRequest, userController.getUserByIdController);
router.get('/', authenicateToken, userController.findAllUsersController);
router.get('/search/email', authenicateToken, userController.searchUserByEmailController);
router.get('/search/username', authenicateToken, userController.searchUserByUsernameController);
router.get('/profile/:id', authenicateToken, validateUserId, validateRequest, userController.getUserProfileController);

// PUT ROUTES
router.put('/:id', authenicateToken, validateUserId, validateUpdateUser, validateRequest, userController.updateUserController);
router.put('/changeEmail/:id', authenicateToken, validateUserId, validateEmailChange, validateRequest, userController.updateUserEmailController);
router.put('/bio/:id', authenicateToken, validateUserId, validateBio, validateRequest, userController.updateUserBioController);
router.put('/skills/:id', authenicateToken, validateUserId, validateSkills, validateRequest, userController.updateUSerSkillsController);
router.put('/change-password/:id', authenicateToken, validateUserId, validatePasswordChange, validateRequest, userController.changeUserPasswordController);
router.put('/profile-pic/:id', authenicateToken, validateUserId, validateProfilePic, validateRequest, userController.updateUserProfilePicController);

// DELETE ROUTE
router.delete('/:id', authenicateToken, validateUserId, validateRequest, userController.deleteUserController);

module.exports = router;