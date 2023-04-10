const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const MappingPeriodOutput = sequelize.define('MappingPeriodOutput', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Filename: DataTypes.STRING,
    Tag: DataTypes.STRING,
    Country: DataTypes.STRING,
    Category: DataTypes.STRING,
    Long: DataTypes.STRING,
    Periodicity: DataTypes.STRING,
    Periodicityidentifier: DataTypes.STRING,
    Convention: DataTypes.STRING,
    Yearbr: DataTypes.STRING,
    Weekbr: DataTypes.STRING,
    Monthbr: DataTypes.STRING,
    Quarterbr: DataTypes.STRING,
    Minperiodnumberbr: DataTypes.STRING,
    Maxperiodnumberbr: DataTypes.STRING,
    Startdatebr: DataTypes.STRING,
    Enddatebr: DataTypes.STRING,
    Countryweekstartday: DataTypes.STRING,
}, {
    tableName: 'MappingPeriodOutput',
    schema: 'mapping',
    timestamps: false,
});

module.exports = MappingPeriodOutput
