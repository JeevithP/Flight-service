const { StatusCodes } = require('http-status-codes');
const {ErrorResponse}=require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
    if(!req.body.name) {
        ErrorResponse.message = 'Something went wrong while creating airport';
        
        ErrorResponse.error = new AppError(['name not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.code) {
        ErrorResponse.message = 'Something went wrong while creating airport';
        
        ErrorResponse.error = new AppError(['code not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    if(!req.body.city_id) {
        ErrorResponse.message = 'Something went wrong while creating airport';
        
        ErrorResponse.error = new AppError(['cityId not found in the oncoming request in the correct form'], StatusCodes.BAD_REQUEST);
        return res
                .status(StatusCodes.BAD_REQUEST)
                .json(ErrorResponse);
    }
    next();
}
function validateUpdateRequest(req, res, next) {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: 'No data provided for update',
            error: {},
            data: {}
        });
    }
    next();
}
module.exports={
    validateCreateRequest,
    validateUpdateRequest

}