const { param, body } = require('express-validator');

const allowedRoles = ['collaborator', 'owner'];
const allowedPermissions = ['view', 'edit'];

const validateProjectAndUserIds = [
    param('projectId').isInt().withMessage('Project ID must be an integer'),
    param('userId').isInt().withMessage('User ID must be an integer'),
];

const validateRole = [
    body('role')
        .isString()
        .isIn(allowedRoles)
        .withMessage(`Role must be one of the following: ${allowedRoles.join(', ')}`),
];

const validatePermissions = [
    body('permissions')
        .isArray()
        .withMessage('Permissions must be an array')
        .bail()
        .custom((permissions) => {
            const isValid = permissions.every(permission => allowedPermissions.includes(permission));
            if (!isValid) {
                throw new Error(`Permissions can only include: ${allowedPermissions.join(', ')}`);
            }
            return true;
        }),
];

module.exports = {
    validateProjectAndUserIds,
    validateRole,
    validatePermissions,
};
