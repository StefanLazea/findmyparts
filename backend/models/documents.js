module.exports = (sequelize, DataTypes) => {
    return sequelize.define('documents', {
        'name': DataTypes.STRING,
        'expirationDate': DataTypes.DATE,
        'price': DataTypes.STRING,
    });
}