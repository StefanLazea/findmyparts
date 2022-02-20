module.exports = (sequelize, DataTypes) => {
    return sequelize.define('documents', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        'name': DataTypes.STRING,
        'expirationDate': DataTypes.DATE,
        'price': DataTypes.STRING,
    });
}