const { param, body } = require('express-validator');


const validateVersionId = [
    param('versionId').isInt().withMessage('version id should be integer')
];

const validateFileId = [
    param('fileId').isInt().withMessage('file id must be an integer')
];

const validateVersionBody = [
    body('version_number').isInt().withMessage('file version must be an integer'),
    body('context').isString().notEmpty().withMessage('context must be String')

];


module.exports = {
    validateVersionId,
    validateVersionBody,
    validateFileId

}
