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

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/smart-mapping", smartMappingRoutes);

// Handling Errors message
app.use(joiErrorHandlerMiddleware);
app.use(errorHandlerMiddleware);

server.listen(port, "0.0.0.0", () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = server;