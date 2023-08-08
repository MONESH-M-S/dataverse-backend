const { DataTypes } = require("sequelize");
const sequelize = require("../../../../config/sequelize.config");

const ProductUnprocessed = sequelize.define('UnProcessedRecordsProduct', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    FileName: DataTypes.STRING,
    Tag: DataTypes.STRING,
    Externaldesc: DataTypes.STRING,
    Createdon: DataTypes.STRING,
    Remark: DataTypes.STRING,
}, {
    tableName: 'UnProcessedRecordsProduct',
    schema: 'Mapping',
    timestamps: false,
});

module.exports = ProductUnprocessed
