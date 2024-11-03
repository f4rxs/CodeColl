const { param, body } = require('express-validator');

const validateFileId = param('fileId')
    .isInt()
    .withMessage('File ID must be an integer');

const validateProjectId = param('projectId')
    .isInt()
    .withMessage('Project ID must be an integer');

const validateFileBody = [
    body('filename')
        .isString()
        .notEmpty()
        .withMessage('Filename is required and must be a non-empty string'),
    body('content')
        .isString()
        .withMessage('Content must be a string'),
];

const validateUserId = [
    body('userId').isInt().withMessage('User id is required and must be integer')
];



module.exports = {
    validateFileId,
    validateProjectId,
    validateFileBody,
    validateUserId,
};
