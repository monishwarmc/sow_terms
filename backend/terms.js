// models/terms.js
import { DataTypes } from 'sequelize';
import sequelize from './sequelize.js';  // Make sure the file is imported with .js extension

const terms = sequelize.define('term', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'terms',
  timestamps: false,
});

export default terms; // Use export default for ES module
