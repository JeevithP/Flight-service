const {AirportService}=require('../services');
const {StatusCodes}=require('http-status-codes');
const {ErrorResponse,SuccessResponse}=require('../utils/common');

// POST /airports  body: {name, cityId, code, address}
async function createAirport(req, res) {
    // console.log(req.body);
    try{
        const airport=await AirportService.createAirport({
            name: req.body.name,
            city_id: req.body.city_id,
            code: req.body.code,
            address: req.body.address,
        });
        SuccessResponse.message = 'Successfully created airport';
        SuccessResponse.data = airport;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.message = 'Something went wrong while creating airport';
        ErrorResponse.error = error;
        // console.log("in controller",error);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}
async function getAirports(req,res){
    try{
        const airports=await AirportService.getAirports();
        SuccessResponse.message = 'Successfully fetched airports';
        SuccessResponse.data = airports;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
        // ErrorResponse.message = 'Something went wrong while getting airplanes details';
        ErrorResponse.error = error;
        // console.log("in controller",error);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}
// POST : /airports/:id
async function getAirport(req,res){
    try{
        const airport=await AirportService.getAirport(req.params.id);
        SuccessResponse.message = 'Successfully fetched airport';
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error = error;
        // console.log("in controller",error);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}

//DELETE : /airports/:id
async function destroyAirport(req,res){
    try{
        const response=await AirportService.destroyAirport(req.params.id);
        SuccessResponse.message = 'Successfully deleted airport';
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error = error;
        // console.log("in controller",error);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}
async function updateAirport(req,res){
    try{
        const id=req.params.id;
        const data=req.body;
        const response=await AirportService.updateAirplane(id,data);
        SuccessResponse.message = 'Successfully updated airport';
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
    createAirport,
    getAirport,
    getAirports,
    destroyAirport,
    updateAirport
}