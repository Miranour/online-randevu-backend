const sequelize = require('../config/database');
const User = require('./User');
const Appointment = require('./Appointment');

// User-Appointment ilişkileri
User.hasMany(Appointment, { as: 'userAppointments', foreignKey: 'userId' });
Appointment.belongsTo(User, { as: 'user', foreignKey: 'userId' });

User.hasMany(Appointment, { as: 'providerAppointments', foreignKey: 'serviceProviderId' });
Appointment.belongsTo(User, { as: 'serviceProvider', foreignKey: 'serviceProviderId' });

module.exports = {
    sequelize,
    User,
    Appointment
}; 