const User = require('./user');
const Trip = require('./trip');
//const Itinerary = require('./itinerary');
//const Budget = require('./budget');

User.hasMany(Trip, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Trip.belongsTo(User, {
    foreignKey: 'user_id'
});

/*
User.hasMany(Itinerary, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Itinerary.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Budget, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Budget.belongsTo(User, {
    foreignKey: 'user_id'
});

*/

module.exports = { User, Trip };