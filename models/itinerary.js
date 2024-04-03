const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


// Create a new Sequelize model for books
class itinerary extends Model { }


itinerary.init(
  // Define fields/columns on model
  // An `id` is automatically created by Sequelize, though best practice would be to define the primary key ourselves
  {
    Food: {
      type: DataTypes.STRING
    },
    Parks: {
      type: DataTypes.STRING
    },
    Attractions: {
      type: DataTypes.STRING
    },
    Hotel: {
      type: DataTypes.INTEGER
    },
    Transportation: {
      type: DataTypes.INTEGER
    },
    // Will become `is_paperback` in table due to `underscored` flag
    Day_activities: {
      type: DataTypes.BOOLEAN
    },
    Night_activities: {
      type: DataTypes.BOOLEAN
    },
  },
  {
    // Link to database connection
    sequelize,
    // Set to false to remove `created_at` and `updated_at` fields
    timestamps: false,
    underscored: true,
    modelName: 'itinerary'
  }
);
