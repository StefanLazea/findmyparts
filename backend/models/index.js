let sequelize = require('./db.js');
const User = sequelize.import('./users');
const Part = sequelize.import('./parts');

User.hasMany(Part);
Part.belongsTo(User);

module.exports = {
    User,
    Part,
    sequelize,
}