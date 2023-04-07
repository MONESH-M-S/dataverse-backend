const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const MultipleMapFact = sequelize.define('MultipleMapFact', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Filename: DataTypes.STRING,
    Tag: DataTypes.STRING,
    Externaldesc: DataTypes.STRING,
    Facttype: DataTypes.STRING
}, {
    tableName: 'MultipleMapFact',
    schema: 'info',
    timestamps: false,
});

module.exports = MultipleMapFact
