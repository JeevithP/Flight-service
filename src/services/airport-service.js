const {AirportRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes');

const airportRepository=new AirportRepository();

async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {

        console.log(error); // Logs the error
        if (error.name === "SequelizeValidationError") {
            let explanation = [];
            if (error.errors) { // ✅ Check if `error.errors` exists
                error.errors.forEach((err) => {
                    explanation.push(err.message);
                });
            }
            console.log(explanation);

            throw new AppError(
                explanation,
                StatusCodes.BAD_REQUEST, // Use appropriate status code
            );
        }

        throw new AppError(
            'Something went wrong while creating airplane',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
async function getAirports(){
    try{
        const airports = await airportRepository.getAll();
        return airports;
    }
    catch(error){
        throw new AppError(
            'Something went wrong while fetching airports',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
async function getAirport(id){
    try{
        const airport=await airportRepository.get(id);

        return airport;
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError(
                'Airport requested is not found',
                StatusCodes.NOT_FOUND
            );
        }
        throw new AppError(
            'Something went wrong while fetching airport',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function destroyAirport(id){
    try{
        const response = await airportRepository.destroy(id);
        return response;
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError(
                'Airport requested is not found',
                StatusCodes.NOT_FOUND
            );
        }
        throw new AppError(
            'Something went wrong while destroying airport',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
async function updateAirport(id,data){
    try{
        const response = await airportRepository.update(data,id);
        return response;
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError(
                'Airport requested is not found',
                StatusCodes.NOT_FOUND
            );
        }
        throw new AppError(
            'Something went wrong while updating airport',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
module.exports={
    createAirport,
    getAirport,
    getAirports,
    destroyAirport,
    updateAirport
}