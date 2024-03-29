module.exports = (sequelize, DataTypes) => {
    return sequelize.define('users', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        'email': { type: DataTypes.STRING, allowNull: false, unique: true },
        'name': DataTypes.STRING,
        'picture': DataTypes.STRING,
        'password': DataTypes.STRING,
        'role': DataTypes.STRING,
        'createdAt': {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        'updatedAt': {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        'authType': DataTypes.STRING,
    });
}