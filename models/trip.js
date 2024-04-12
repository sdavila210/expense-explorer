const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trip extends Model { }

Trip.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        needed_funding_hotel: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        needed_funding_transportation: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        needed_funding_food: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        needed_funding_attractions: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        needed_funding_total: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'trip',
    }
);

module.exports = Trip;