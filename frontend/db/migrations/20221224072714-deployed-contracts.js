'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('DeployedContract', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        validate: {
          len: [1, 255]
        },
        allowNull: false
      },
      version: {
        type: Sequelize.DataTypes.STRING,
        validate: {
          len: [1, 10]
        },
        allowNull: false
      },
      interface: {
        type: Sequelize.DataTypes.STRING,
        validate: {
          len: [1, 255]
        },
        allowNull: false
      },
      address: {
        type: Sequelize.DataTypes.CHAR(42),
        validate: {
          is: /^0x[a-fA-F0-9]{40}$/
        },
        allowNull: false
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        validate: {
          len: [1, 255]
        }
      },
      chainId: {
        type: Sequelize.DataTypes.INTEGER,
        validate: {
          min: 1
        },
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Person');
  }
};
