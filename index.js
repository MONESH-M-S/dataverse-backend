const env = process.env.APP_ENVIRONMENT;
const path = require("path");

switch (env) {
  case "test":
    require("custom-env").env("test");
    break;

  case "uat":
    require("custom-env").env("uat");
    break;

  case "development":
    require("custom-env").env("development");
    break;

  default:
    require("custom-env").env();
}

const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const fs = require("fs");
const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

const errorHandlerMiddleware = require("./src/middlewares/errorHandler.middleware");
const joiErrorHandlerMiddleware = require("./src/middlewares/joiErrorHandler.middleware");
const auth = require("./src/middlewares/auth.middleware");

const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;

const smartMappingRoutes = require("./src/routes/smartMapping.routes");
const metaRoutes = require("./src/routes/meta.routes");
const fileVolatilityRoutes = require("./src/routes/fileVolatility.routes");
const authRoutes = require("./src/routes/auth.routes");
const dashboardRoutes = require("./src/routes/dashboard.routes");
const remappingRoutes = require("./src/routes/remapping.routes");
const dqCheckRoutes = require("./src/routes/dqChecks.routes");
const adminRoutes = require("./src/routes/admin.routes");
const otherRMSRoutes = require("./src/routes/SmartMapping/otherRMS.routes");
const pocRoutes = require("./src/routes/poc.routes");

const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(cookieParser());
app.use("/api/poc", pocRoutes);
app.use("/api/smart-mapping/other-rms", otherRMSRoutes);
app.use("/api/smart-mapping", smartMappingRoutes);
app.use("/api/meta", metaRoutes);
app.use("/api/file-volatility", fileVolatilityRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/remapping", remappingRoutes);
app.use("/api/dq-checks", dqCheckRoutes);
app.use("/api/admin", adminRoutes);

app.use(express.static(path.join(__dirname, "ui")));

app.get("/*", (req, res) => {
  let file = "";
  
  const sanitizedUrl = req.path

  if (sanitizedUrl === "/") file = "/index.html";
  else file = sanitizedUrl;

  const filePath = path.join(__dirname, "ui", file);

  if (fs.existsSync(filePath)) res.sendFile(filePath);
  else res.sendFile(path.join(__dirname, "ui/index.html"));
});

// Handling Errors message
app.use(joiErrorHandlerMiddleware);
app.use(errorHandlerMiddleware);

server.listen(port, "0.0.0.0", () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = server;
