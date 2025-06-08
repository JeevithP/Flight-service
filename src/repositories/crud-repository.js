const {Logger}=require('../config');
const AppError = require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes');

class CrudRepository{
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async destroy(data){
        const response = await this.model.destroy({
            where: {
                id:data
            }
        });
        if(response===0){
            throw new AppError('No data found to delete',StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async get(data){
        const response=await this.model.findByPk(data);  // find by primary key
        if(!response){
            throw new AppError('No data found',StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async getAll(){
        const response=await this.model.findAll();
        return response;
    }

    async update(data,id){
        console.log("id : ",id);
        console.log("data : ",data);
        const response=await this.model.update(data,{
            where:{
                id:id
            }
        })
        // console.log("response : ",response);
        if(response[0]===0){
            throw new AppError('No data found to update',StatusCodes.NOT_FOUND);
        }
        return response;
    }
}

module.exports=CrudRepository;