const env = process.env.NODE_ENV
console.log("Environment is ", env)

switch (env) {
  case "test":
    require('custom-env').env('test')
    break;

  default:
    require('custom-env').env()
}

const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");

const errorHandlerMiddleware = require("./src/middlewares/errorHandler.middleware");
const joiErrorHandlerMiddleware = require("./src/middlewares/joiErrorHandler.middleware");

const app = express();
const server = http.createServer(app);

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
app.use(cors());
app.use("/smart-mapping", smartMappingRoutes);
app.use("/meta", metaRoutes);
app.use("/file-volatility", fileVolatilityRoutes);
app.use(express.static('public'))

// Handling Errors message
app.use(joiErrorHandlerMiddleware);
app.use(errorHandlerMiddleware);

server.listen(port, "0.0.0.0", () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = server;