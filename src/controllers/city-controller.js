const {CityService}=require('../services');
const {StatusCodes}=require('http-status-codes');
const {ErrorResponse,SuccessResponse}=require('../utils/common');

// POST /cities
async function createCity(req, res) {
    // console.log(req.body);
    try{
        const city=await CityService.createCity({
            name: req.body.name,
        });
        SuccessResponse.message = 'Successfully created city';
        SuccessResponse.data = city;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.message = 'Something went wrong while creating city';
        ErrorResponse.error = error;
        // console.log("in controller",error);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}
async function destroyCity(req,res){
    try{
        const response=await CityService.destroyCity(req.params.id);
        SuccessResponse.message = 'Successfully deleted city';
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error = error;
        // console.log("in controller",error);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}
async function updateCity(req,res){
    try{
        const id=req.params.id;
        console.log("id : ",id);
        const data=req.body;
        console.log("data : ",data);
        const response=await CityService.updateCity(id,data);
        SuccessResponse.message = 'Successfully updated city';
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error = error;
        // console.log("in controller",error);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}
module.exports={
    createCity,
    destroyCity,
    updateCity
}