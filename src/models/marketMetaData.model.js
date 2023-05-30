const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");

const MarketMetaData = sequelize.define('MarketMetaData', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Channel: DataTypes.STRING,
    Total: DataTypes.STRING
}, {
    tableName: 'MarketMetaData',
    schema: 'mapping',
    timestamps: false,
});

module.exports = MarketMetaData
