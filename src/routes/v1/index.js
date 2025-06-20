const express = require('express');
const {InforController} = require('../../controllers');

const airplaneRoutes=require('./airplane-routes');
const cityRoutes=require('./city-routes');
const airportRoutes=require('./airport-routes');
const flightRoutes=require('./flight-routes');

const router = express.Router();

router.get('/info', InforController.info)
router.use('/airplanes',airplaneRoutes);
router.use('/cities',cityRoutes);
router.use('/airports',airportRoutes);
router.use('/flights',flightRoutes);

module.exports = router;
