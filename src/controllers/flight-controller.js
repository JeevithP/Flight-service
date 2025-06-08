const {FlightService}=require('../services');
const {StatusCodes}=require('http-status-codes');
const {ErrorResponse,SuccessResponse}=require('../utils/common');


async function createFlight(req, res) {
    // console.log(req.body);
    try{
        const airplane=await FlightService.createFlight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGate: req.body.boardingGate,
            totalSeats: req.body.totalSeats
        });
        SuccessResponse.message = 'Successfully created Flight';
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.message = 'Something went wrong while creating flight';
        ErrorResponse.error = error;
        // console.log("in controller",error);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}

async function getAllFlights(req,res){
    try{
        const flights=await FlightService.getAllFlights(req.query);
        SuccessResponse.message = 'Successfully fetched flights';
        SuccessResponse.data = flights;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
        // ErrorResponse.message = 'Something went wrong while getting flights details';
        ErrorResponse.error = error;
        // console.log("in controller",error);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}
async function getFlight(req,res){
    try{
        const flight=await FlightService.getFlight(req.params.id);
        SuccessResponse.message = 'Successfully fetched flight';
        SuccessResponse.data = flight;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
        // ErrorResponse.message = 'Something went wrong while getting airplanes details';
        ErrorResponse.error = error;
        // console.log("in controller",error);
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}
async function updateSeats(req, res) {
    try {
        console.log(req.body);
        const response = await FlightService.updateSeats({
            flightId: req.params.id,
            seats: req.body.seats, 
            dec: req.body.dec
        });
        SuccessResponse.data = response;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}
module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}