const { DataTypes } = require("sequelize");
const sequelize = require("../../../../config/sequelize.config");

const MarketUnprocessed = sequelize.define('UnProcessedRecordsMarket', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    FileName: DataTypes.STRING,
    Tag: DataTypes.STRING,
    Long: DataTypes.STRING,
    HierName: DataTypes.STRING,
    HierLevelName: DataTypes.STRING,
    Country: DataTypes.STRING,
    Category: DataTypes.STRING,
    Cell: DataTypes.STRING,
    Createdon: DataTypes.STRING,
}, {
    tableName: 'UnProcessedRecordsMarket',
    schema: 'Mapping',
    timestamps: false,
    hasTrigger: true
});

module.exports = MarketUnprocessed
