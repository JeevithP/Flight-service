const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const city = await flightRepository.create(data);
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
            'Something went wrong while creating Flight',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];
    // trips: BLR-MUM

    if (query.trips) {
        [departureAirportId, arrivalAirportId] = query.trips.split('-');
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;

        if (departureAirportId === arrivalAirportId) {
            throw new AppError(
                'Departure and arrival airports cannot be the same',
                StatusCodes.BAD_REQUEST
            );
        }
    }

    if (query.price) {
        [minPrice, maxPrice] = query.price.split('-');
        customFilter.price = {
            [Op.between]: [minPrice, (maxPrice == undefined ? 999999 : maxPrice)]

        };
    }

    if (query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        };
    }

    const endingTime = ' 23:59:59';
    if (query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTime]
        };
    }

    if (query.sort) {
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters;
    }

    console.log("customFilter", customFilter);
    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        // console.log("flights",flights);
        // if(flights.length===0){
        //     throw new AppError(
        //         'No flights found for the given criteria',
        //         StatusCodes.NOT_FOUND
        //     );
        // }
        return flights;
    }
    catch (error) {
        console.log(error);
        throw new AppError(
            'Something went wrong while fetching flights',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}
async function getFlight(id) {
    try {
        const flight = await flightRepository.get(id);

        return flight;
    }
    catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(
                'Flight requested is not found',
                StatusCodes.NOT_FOUND
            );
        }
        throw new AppError(
            'Something went wrong while fetching Flight',
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }

}
async function updateSeats(data) {
    try {
        const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
        return response;
    } catch(error) {
        console.log(error);
        throw new AppError('Cannot update data of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}
