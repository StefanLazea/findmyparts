let sequelize = require('./db.js');
const User = sequelize.import('./users');
const Part = sequelize.import('./parts');
const Stocks = sequelize.import('./stocks');
const Cars = sequelize.import('./cars');
const Documents = sequelize.import('./documents');

// User.hasMany(Part);
// Part.belongsTo(User);

User.belongsToMany(Part, { through: Stocks });
Part.belongsToMany(User, { through: Stocks });

User.hasMany(Cars);
Cars.belongsTo(User);

Cars.hasMany(Documents);
Documents.belongsTo(Cars);


module.exports = {
    User,
    Part,
    Stocks,
    Cars,
    sequelize,
}