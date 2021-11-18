let sequelize = require('./db.js');
const User = sequelize.import('./users');
const Part = sequelize.import('./parts');
const Stocks = sequelize.import('./stocks');

// User.hasMany(Part);
// Part.belongsTo(User);

User.belongsToMany(Part, { through: Stocks });
Part.belongsToMany(User, { through: Stocks });

//Todo
// Part.belongsToMany(Car, { through: 'compatibilities' });
// Car.belongsToMany(Part, { through: 'compatibilities' });

module.exports = {
    User,
    Part,
    Stocks,
    sequelize,
}