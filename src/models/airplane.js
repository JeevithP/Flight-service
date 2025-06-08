'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Flight, {
        foreignKey: 'airplaneId',
        onDelete: 'CASCADE',
      });
      this.hasMany(models.Seat, {
        foreignKey: 'airplaneId',
        onDelete: 'CASCADE',
      });
    }
  }
  Airplane.init({
    modelNumber: {
      type:DataTypes.STRING,
      allowNull: false,
      
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        // max(value) {
        //   if (value > 1000) {
        //     throw new Error('Capacity cannot exceed 1000');
        //   }
        // }
        max:1000,
        
      }
    },
  }, {
    sequelize,
    modelName: 'Airplane',
  });
  return Airplane;
};