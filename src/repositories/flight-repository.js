const {Flight,Airplane,Airport,City} = require("../models");
const CrudRepository = require("./crud-repository");
const {Sequelize}=require("sequelize");
const db=require('../models');
const { addRowLockOnFlights } = require("./queries");

class FlightRepository extends CrudRepository {
    constructor(){
        super(Flight);
    }

    async getAllFlights(filter,sortFilter){
        const flights=await Flight.findAll({
            where:filter,
            order:sortFilter,
            include:[
                {
                    model:Airplane,
                    required:true,  // inner join
                    as: 'airplaneDetails', // alias for the Airplane model
                },
                {
                    model:Airport,
                    required:true,  // inner join
                    as: 'departureAirport',
                    on:{
                        col1:Sequelize.where(
                            Sequelize.col('Flight.departureAirportId'),
                            Sequelize.col('departureAirport.code')
                        ),
                    },
                    include:[
                        {
                            model:City,
                            required:true,  // inner join
                            // as: 'city',
                            // attributes:['name']  // only name of the city
                        }
                    ]
                },
                {
                    model:Airport,
                    required:true,  // inner join
                    as: 'arrivalAirport',
                    on:{
                        col1:Sequelize.where(
                            Sequelize.col('Flight.arrivalAirportId'),
                            Sequelize.col('arrivalAirport.code')
                        ),
                    },
                    include:[
                        {
                            model:City,
                            required:true,  // inner join
                            // as: 'city',
                            // attributes:['name']  // only name of the city
                        }
                    ]
                }
            ]
        })
        return flights;
    }

    async updateRemainingSeats(flightId,seats,dec=true){
        const transaction = await db.sequelize.transaction();
        try{
            const flight=await Flight.findByPk(flightId);
            await db.sequelize.query(addRowLockOnFlights(flightId)); // puts a lock
            
            if(+dec){
                await flight.decrement('totalSeats',{by:seats},{transaction:transaction});
            
            }
            else{
                await flight.increment('totalSeats',{by:seats},{transaction:transaction});
            }
            await transaction.commit();
            return flight;

        }catch(error){
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = FlightRepository;