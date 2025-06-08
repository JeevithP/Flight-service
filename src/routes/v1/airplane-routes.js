const express=  require('express');

const {AirplaneController}=require('../../controllers');
const {AirplaneMiddlewares}=require('../../middlewares');

const router= express.Router();

//api/v1/airplanes  POST
router.post('/',AirplaneMiddlewares.validateCreateRequest,AirplaneController.createAirplane);
// v1/airplanes/  GET
router.get('/',AirplaneController.getAirplanes);
// v1/airplanes/:id  GET
router.get('/:id',AirplaneController.getAirplane);
// v1/airplanes/:id  delete
router.delete('/:id',AirplaneController.destroyAirplane);
// v1/airplanes/:id  patch
router.patch('/:id',AirplaneMiddlewares.validateUpdateRequest,AirplaneController.updateAirplane);


module.exports=router;