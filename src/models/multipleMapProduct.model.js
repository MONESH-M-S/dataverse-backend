const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const MultipleMapProduct = sequelize.define('MultipleMapProduct', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Filename: DataTypes.STRING,
    Tag: DataTypes.STRING,
    Externaldesc: DataTypes.STRING,
    Internaldesc: DataTypes.STRING,
    Skucode: DataTypes.STRING,
    Divisionname: DataTypes.STRING,
    Categoryname: DataTypes.STRING,
    Marketname: DataTypes.STRING,
    Corporatebrandname: DataTypes.STRING
}, {
    tableName: 'MultipleMapProduct',
    schema: 'mapping',
    timestamps: false,
});

module.exports = MultipleMapProduct
