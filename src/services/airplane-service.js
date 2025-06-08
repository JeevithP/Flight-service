const {AirplaneRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes');

const airplaneRepository=new AirplaneRepository();

async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
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
async function getAirplanes(){
    try{
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    }
    catch(error){
        throw new AppError(
            'Something went wrong while fetching airplanes',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
async function getAirplane(id){
    try{
        const airplane=await airplaneRepository.get(id);

        return airplane;
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError(
                'Airplane requested is not found',
                StatusCodes.NOT_FOUND
            );
        }
        throw new AppError(
            'Something went wrong while fetching airplane',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function destroyAirplane(id){
    try{
        const response = await airplaneRepository.destroy(id);
        return response;
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError(
                'Airplane requested is not found',
                StatusCodes.NOT_FOUND
            );
        }
        throw new AppError(
            'Something went wrong while destroying airplane',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
async function updateAirplane(id,data){
    try{
        const response = await airplaneRepository.update(data,id);
        return response;
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError(
                'Airplane requested is not found',
                StatusCodes.NOT_FOUND
            );
        }
        throw new AppError(
            'Something went wrong while updating airplane',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
module.exports={
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}