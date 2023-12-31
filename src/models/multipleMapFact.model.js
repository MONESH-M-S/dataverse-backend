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
    Internaldesc: DataTypes.STRING,
    Facttype: DataTypes.STRING
}, {
    tableName: 'MultipleMapFact',
    schema: 'mapping',
    timestamps: false,
});

module.exports = MultipleMapFact
