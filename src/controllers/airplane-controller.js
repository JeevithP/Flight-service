const {AirplaneService}=require('../services');
const {StatusCodes}=require('http-status-codes');
const {ErrorResponse,SuccessResponse}=require('../utils/common');

async function createAirplane(req, res) {
    // console.log(req.body);
    try{
        const airplane=await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.message = 'Successfully created airplane';
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.message = 'Something went wrong while creating airplane';
        ErrorResponse.error = error;
        // console.log("in controller",error);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}
async function getAirplanes(req,res){
    try{
        const airplanes=await AirplaneService.getAirplanes();
        SuccessResponse.message = 'Successfully fetched airplanes';
        SuccessResponse.data = airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
        // ErrorResponse.message = 'Something went wrong while getting airplanes details';
        ErrorResponse.error = error;
        // console.log("in controller",error);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}
// POST : /airplanes/:id
async function getAirplane(req,res){
    try{
        const airplane=await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.message = 'Successfully fetched airplane';
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error = error;
        // console.log("in controller",error);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}

//DELETE : /airplanes/:id
async function destroyAirplane(req,res){
    try{
        const response=await AirplaneService.destroyAirplane(req.params.id);
        SuccessResponse.message = 'Successfully deleted airplane';
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error = error;
        // console.log("in controller",error);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}
async function updateAirplane(req,res){
    try{
        const id=req.params.id;
        const data=req.body;
        const response=await AirplaneService.updateAirplane(req.params.id,data);
        SuccessResponse.message = 'Successfully updated airplane';
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error = error;
        // console.log("in controller",error);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}
module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}