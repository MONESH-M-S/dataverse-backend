const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const UserModel = sequelize.define('User', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name: DataTypes.STRING,
    Email: DataTypes.STRING,
    Role: DataTypes.ENUM('Admin', 'SME', 'Leadership', 'Operation'),
    Avatar: DataTypes.STRING,
    IsFirstTimeLogin: DataTypes.BOOLEAN,
    Status: DataTypes.ENUM('In Process', 'Approved', 'Rejected'),
}, {
    tableName: 'User',
    schema: 'info',
    timestamps: false,
});

module.exports = UserModel
