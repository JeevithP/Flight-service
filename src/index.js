const express = require('express');
const { ServerConfig,Logger } = require('./config/index.js');
const apiRoutes = require('./routes');
const { createAirplane } = require('./services/airplane-service.js');
const {City,Airport}=require('./models');
const { where } = require('sequelize');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);


app.listen(ServerConfig.PORT,async () => {
    console.log(`Server is running on port ${ServerConfig.PORT}`);
    // await createAirplane({ modelNumber: 'Boeing737', capacity: 180 });
    
    // const bengaluru=await City.findByPk(3);
    // const  hblAirport=await bengaluru.createAirport({name:'Huballi Airport',code:'HBL'})
    // console.log(hblAirport);
    // await City.destroy({
    //     where:{
    //         id:3
    //     }
    // })
});
