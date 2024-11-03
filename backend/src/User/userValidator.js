const { body, param } = require('express-validator');
const allowedSkills = ['JavaScript', 'Java', 'C++', 'Python', 'Ruby', 'Go', 'C#'];

const validateUserId = [
    param('id').isInt().withMessage('User ID must be an integer'),
];

const validateUpdateUser = [
    body('username')
        .optional()
        .isString()
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long'),

    body('email')
        .optional()
        .isEmail()
        .withMessage('Invalid email format'),

    body('password')
        .optional()
        .isString()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),

    body('bio')
        .optional()
        .isString()
        .isLength({ max: 500 })
        .withMessage('Bio cannot exceed 500 characters'),

    body('skills')
        .optional()
        .isArray()
        .withMessage('Skills must be an array')
        .bail()
        .custom((skills) => {
            const isValid = skills.every(skill => allowedSkills.includes(skill));
            if (!isValid) {
                throw new Error('Skills contain invalid options. Allowed skills are: ' + allowedSkills.join(', '));
            }
            return true;
        }),
];

const validateEmailChange = [
    body('newEmail').isEmail().withMessage('Please enter a valid email'),
];

const validateBio = [
    body('newBio')
        .isString()
        .isLength({ max: 500 })
        .withMessage('Bio must not exceed 500 characters'),
];

const validateSkills = [
    body('newSkills')
        .optional()
        .isArray()
        .withMessage('Skills must be an array')
        .bail()
        .custom((skills) => {
            const isValid = skills.every(skill => allowedSkills.includes(skill));
            if (!isValid) {
                throw new Error('Skills contain invalid options. Allowed skills are: ' + allowedSkills.join(', '));
            }
            return true;
        }),
];

const validatePasswordChange = [
    body('newPassword')
        .isString()
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
];

const validateProfilePic = [
    body('profile_pic')
        .optional()
        .isString()
        .withMessage('Profile picture must be a valid URL or file path'),
];

module.exports = {
    validateUserId,
    validateUpdateUser,
    validateEmailChange,
    validateBio,
    validateSkills,
    validatePasswordChange,
    validateProfilePic,
};
