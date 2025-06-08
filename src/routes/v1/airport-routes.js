const express=  require('express');

const {AirportController}=require('../../controllers');
const {AirportMiddlewares}=require('../../middlewares');

const router= express.Router();

//api/v1/airports  POST
router.post('/',AirportMiddlewares.validateCreateRequest,AirportController.createAirport);
// v1/airports/  GET
router.get('/',AirportController.getAirports);
// v1/airports/:id  GET
router.get('/:id',AirportController.getAirport);
// v1/airports/:id  delete
router.delete('/:id',AirportController.destroyAirport);
// v1/airports/:id  patch
router.patch('/:id',AirportMiddlewares.validateUpdateRequest,AirportController.updateAirport);

module.exports=router;