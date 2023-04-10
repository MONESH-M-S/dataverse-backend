const sql = require("mssql");

const config = {
  server: "bieno-da08-d-904380-unilevercom-sql-01.database.windows.net",
  port: 1433,
  database: "bieno-da08-d-904380-unilevercom-sqldb-01",
  user: "sqladmin",
  dialect: "mssql",
  authentication: {
    type: "azure-active-directory-msi-app-service",
  },
  options: {
    trustServerCertificate: true,
    // encrypt: true,
  },
};

console.log("Starting...");
connectAndQuery();

async function connectAndQuery() {
  try {
    var poolConnection = await sql.connect(config);
    // console.log("Reading rows from the Table...", poolConnection);
    var resultSet = await poolConnection
      .request()
      .query(`SELECT TOP(10) * from [Mapping].[MappingProductOutput]`);
    console.log(`${resultSet.recordset.length} rows returned.`);
    poolConnection.close();
  } catch (err) {
    console.log("---------------------------------------------");
    console.log("--------------- Error occured -----------------------------");
    console.error(err.message);
    console.log("---------------------------------------------");
  }
}