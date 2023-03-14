const env = process.env.NODE_ENV
console.log("Environment is ", env)
const path = require('path');


switch (env) {
  case "test":
    require("custom-env").env("test");
    break;

  default:
    require("custom-env").env();
}

const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
console.log("Entered node app");
const errorHandlerMiddleware = require("./src/middlewares/errorHandler.middleware");
const joiErrorHandlerMiddleware = require("./src/middlewares/joiErrorHandler.middleware");

const app = express();
const server = http.createServer(app);
const sql = require("mssql");

const port = process.env.PORT || 3000;

const smartMappingRoutes = require("./src/routes/smartMapping.routes")
const metaRoutes = require("./src/routes/meta.routes")
const fileVolatilityRoutes = require("./src/routes/fileVolatility.routes")

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const config = {
  server: "bieno-da08-d-904380-unilevercom-sql-01.database.windows.net",
  port: 1433,
  database: "bieno-da08-d-904380-unilevercom-sqldb-01",
  authentication: {
    type: "azure-active-directory-msi-app-service",
  },
  options: {
    encrypt: true,
  },
};

console.log("Starting...");
connectAndQuery();

async function connectAndQuery() {
  try {
    var poolConnection = await sql.connect(config);
    console.log("Reading rows from the Table...", poolConnection);
    var resultSet = await poolConnection
      .request()
      .query(`SELECT * from test_tbl`);
    console.log(`${resultSet.recordset.length} rows returned.`);
    poolConnection.close();
  } catch (err) {
    console.log("---------------------------------------------");
    console.log("--------------- Error occured -----------------------------");
    console.error(err.message);
    console.log("---------------------------------------------");
  }
}

app.use(cors());
app.use("/api/smart-mapping", smartMappingRoutes);
app.use("/api/meta", metaRoutes);
app.use("/api/file-volatility", fileVolatilityRoutes);
app.use(express.static(path.join(__dirname, 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// Handling Errors message
app.use(joiErrorHandlerMiddleware);
app.use(errorHandlerMiddleware);

server.listen(port, "0.0.0.0", () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = server;
