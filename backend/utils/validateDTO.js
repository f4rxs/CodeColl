const { plainToClass } = require('class-transformer');
const { validate } = require('class-validator');

const validateDTO = (DTOClass) => {
    return async (req, res, next) => {
        const dto = plainToClass(DTOClass, req.body);
        const errors = await validate(dto);

        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors.map(err => err.constraints),
            });
        }

        req.dto = dto;
        next();
    };
};

module.exports = validateDTO;
