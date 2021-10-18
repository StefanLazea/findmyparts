module.exports = (sequelize, DataTypes) => {
    return sequelize.define('stocks', {
        'quantity': DataTypes.STRING,
    }, { timestamps: false });
}