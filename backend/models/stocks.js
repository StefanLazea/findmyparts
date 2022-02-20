module.exports = (sequelize, DataTypes) => {
    return sequelize.define('stocks', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        'quantity': DataTypes.STRING,
    }, { timestamps: false });
}