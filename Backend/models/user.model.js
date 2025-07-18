import { DataTypes } from 'sequelize';
import { sequelize } from '../config/DbConnection.js';

export const User = sequelize.define('User', {
    name:DataTypes.STRING,
    age:DataTypes.INTEGER,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    }, 
})