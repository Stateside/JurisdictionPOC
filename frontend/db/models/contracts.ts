import sequelize from './db';
import { DataTypes } from 'sequelize';

export const DeployedContract = sequelize.define('DeployedContract', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    validate: {
      len: [1, 255]
    },
    allowNull: false
  },
  version: {
    type: DataTypes.STRING,
    validate: {
      len: [1, 10]
    },
    allowNull: false
  },
  interface: {
    type: DataTypes.STRING,
    validate: {
      len: [1, 255]
    },
    allowNull: false
  },
  address: {
    type: DataTypes.CHAR(42),
    validate: {
      is: /^0x[a-fA-F0-9]{40}$/
    },
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    validate: {
      len: [1, 255]
    }
  },
  chainId: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1
    },
    allowNull: false
  }
}, {
    tableName: 'deployed_contracts'
});
