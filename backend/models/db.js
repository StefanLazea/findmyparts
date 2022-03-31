let Sequelize = require('sequelize');
let hierarchy = require('sequelize-hierarchy');

let dotenv = require('dotenv');
dotenv.config();
hierarchy(Sequelize);

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        dialect: 'mysql',
        host: "localhost",
        charset: 'utf8',
        collate: 'utf8_general_ci',
        define: {
            timestamps: false
        }
    }
);

module.exports = sequelize;