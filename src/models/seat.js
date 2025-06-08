'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId', 
        // onDelete: 'CASCADE',
      });
    }
  }
  const {Enums}=require('../utils/common');
  const { BUSINESS, PREMIUM_ECONOMY, FIRST_CLASS, ECONOMY } = Enums.SEAT_TYPE;

  Seat.init({
    row: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    col: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    airplaneId: {
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    type: {
      type:DataTypes.ENUM,
      values:[ECONOMY, BUSINESS, FIRST_CLASS, PREMIUM_ECONOMY],
      defaultValue: ECONOMY,
      allowNull:false,
    },
  }, {
    sequelize,
    modelName: 'Seat',
  });
  return Seat;
};