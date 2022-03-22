module.exports = (sequelize, DataTypes) => {
    return sequelize.define('cars', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        'VIN': DataTypes.STRING,
        'numberPlate': DataTypes.STRING,
        'model': DataTypes.STRING,
        'brand': DataTypes.STRING,
        'type': DataTypes.STRING,
        'isEco': {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        'isHistoric': {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        'isElectric': {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });
}