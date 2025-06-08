const {CityRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes');

const cityRepository=new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        
        console.log(error); // Logs the error
        if (error.name === "SequelizeUniqueConstraintError" || error.name === "SequelizeValidationError") {
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
            'Something went wrong while creating city',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
async function destroyCity(id){
    try{
        const response = await cityRepository.destroy(id);
        return response;
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError(
                'City requested is not found',
                StatusCodes.NOT_FOUND
            );
        }
        throw new AppError(
            'Something went wrong while deleting City',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
async function updateCity(id,data){
    console.log("id : ",id);
    console.log("data : ",data);
    try{
        const response = await cityRepository.update(data,id);
        return response;
    }
    catch(error){
        if(error.statusCode==StatusCodes.NOT_FOUND){
            throw new AppError(
                'City requested is not found',
                StatusCodes.NOT_FOUND
            );
        }
        throw new AppError(
            'Something went wrong while updating City',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
module.exports={
    createCity,
    destroyCity,
    updateCity
}
