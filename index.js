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

const port = process.env.PORT || 3000;

const smartMappingRoutes = require("./src/routes/smartMapping.routes")
const metaRoutes = require("./src/routes/meta.routes")
const fileVolatilityRoutes = require("./src/routes/fileVolatility.routes")
const authRoutes = require("./src/routes/auth.routes");
const dashboardRoutes = require("./src/routes/dashboard.routes");
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(cookieParser());
app.use("/api/smart-mapping", smartMappingRoutes);
app.use("/api/meta", metaRoutes);
app.use("/api/file-volatility", fileVolatilityRoutes);
app.use("/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes)
// app.use("/", authRoutes);
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
