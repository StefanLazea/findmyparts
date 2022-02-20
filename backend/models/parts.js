module.exports = (sequelize, DataTypes) => {
    return sequelize.define('parts', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        'name': DataTypes.STRING,
        'code': DataTypes.STRING,
        'photo': DataTypes.STRING,
        'stock': DataTypes.INTEGER,
        'addedAt': {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        "currency": DataTypes.STRING,
        'price': DataTypes.FLOAT
    });
}