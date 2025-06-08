'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Airplanes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      modelNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'Username must contain only letters and numbers.',
          },
        },
      },
      capacity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          max: 1000, // ✅ Enforces it at Sequelize level
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Airplanes');
  }
};