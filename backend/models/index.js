let sequelize = require("./db.js");
const User = sequelize.import("./users");
const Part = sequelize.import("./parts");
const Stocks = sequelize.import("./stocks");
const Cars = sequelize.import("./cars");
const Documents = sequelize.import("./documents");

Part.belongsToMany(User, { through: Stocks });
User.belongsToMany(Part, { through: Stocks });

User.hasMany(Cars);
Cars.belongsTo(User);

Cars.hasMany(Documents);
Documents.belongsTo(Cars);

User.hasMany(Documents);
Documents.belongsTo(User);

module.exports = {
  User,
  Part,
  Stocks,
  Cars,
  Documents,
  sequelize,
};
