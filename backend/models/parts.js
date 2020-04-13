module.exports = (sequelize, DataTypes) => {
    return sequelize.define('parts', {
        'name': DataTypes.STRING,
        'code': DataTypes.STRING,
        'photo': DataTypes.STRING,
        'stock': DataTypes.INTEGER,
        'addedAt': {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });
}