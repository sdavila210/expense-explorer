const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trip extends Model { }

Trip.init(
    {
        id: {
            type: Datatypes.Integer,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        location: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        travel_dates: {
            type: Datatypes.DATE,
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