const express=  require('express');

const {FlightController}=require('../../controllers');
const {FlightMiddleware}=require('../../middlewares');

const router= express.Router();

//api/v1/airplanes  POST
router.post('/',FlightMiddleware.validateCreateRequest,FlightController.createFlight);
// v1/flights?trips=BLR-MUM  GET
router.get('/',FlightController.getAllFlights);
// v1/flights/:id  GET
router.get('/:id',FlightController.getFlight);
// // v1/airplanes/:id  delete
// router.delete('/:id',AirplaneController.destroyAirplane);

// /api/v1/flights/:id/seats PATCH
router.patch(
        '/:id/seats', 
        FlightMiddleware.validateUpdateSeatsRequest,
        FlightController.updateSeats
);


module.exports=router;