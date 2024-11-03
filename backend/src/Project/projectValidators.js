const { body, param, query } = require('express-validator');

const validateProjectId = [
    param('id').isInt().withMessage('Project ID must be an integer'),
];

const validateUserId = [
    param('userId').isInt().withMessage('User ID must be an integer'),
];

const validateSearchTerm = [
    param('term').isString().isLength({ min: 1 }).withMessage('Search term must be a non-empty string'),
];

const validateProjectCreation = [
    body('project_name').isString().isLength({ min: 3 }).withMessage('Project name must be at least 3 characters long'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('owner_id').isInt().withMessage('Owner ID must be an integer'),
];

const validateProjectUpdate = [
    body('project_name').optional().isString().isLength({ min: 3 }).withMessage('Project name must be at least 3 characters long'),
    body('description').optional().isString().withMessage('Description must be a string'),
    body('archived').optional().isBoolean().withMessage('Archived must be a boolean value'),
];

module.exports = {
    validateProjectId,
    validateUserId,
    validateSearchTerm,
    validateProjectCreation,
    validateProjectUpdate,
};
