module.exports = (sequelize, DataTypes) => {
    return sequelize.define('cars', {
        'VIN': DataTypes.STRING,
        'numberPlate': DataTypes.STRING,
        'model': DataTypes.STRING,
        'isEco': {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        'isHistoric': {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }

    });
}