const path = require("path");
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

const env = process.env.APP_ENVIRONMENT;

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

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

// IM Api Routes
const smartMappingRoutes = require("./src/routes/smartMapping.routes");
const smartMappingNielsenProductRoutes = require("./src/routes/SmartMapping/product.routes");
const smartMappingNielsenFactRoutes = require("./src/routes/SmartMapping/fact.routes");
const smartMappingNielsenMarketRoutes = require("./src/routes/SmartMapping/market.routes");
const smartMappingNielsenPeriodRoutes = require("./src/routes/SmartMapping/period.routes");

//Remapping Api Routes
const remappingProductRoutes = require("./src/routes/Remapping/product.routes");
const remappingFactRoutes = require("./src/routes/Remapping/fact.routes");
const remappingPeriodRoutes = require("./src/routes/Remapping/period.routes");
const remappingMarketRoutes = require("./src/routes/Remapping/market.routes");

const metaRoutes = require("./src/routes/meta.routes");
const fileVolatilityRoutes = require("./src/routes/fileVolatility.routes");
const authRoutes = require("./src/routes/auth.routes");
const dashboardRoutes = require("./src/routes/dashboard.routes");
const dqCheckRoutes = require("./src/routes/dqChecks.routes");
const adminRoutes = require("./src/routes/admin.routes");
const valueComparisonRoutes = require("./src/routes/ValueComparison/ValueComparison.routes");

app.use("/api/smart-mapping", smartMappingRoutes);
app.use("/api/smart-mapping/product", smartMappingNielsenProductRoutes);
app.use("/api/smart-mapping/fact", smartMappingNielsenFactRoutes);
app.use("/api/smart-mapping/market", smartMappingNielsenMarketRoutes);
app.use("/api/smart-mapping/period", smartMappingNielsenPeriodRoutes);

app.use("/api/remapping/product", remappingProductRoutes);
app.use("/api/remapping/fact", remappingFactRoutes);
app.use("/api/remapping/period", remappingPeriodRoutes);
app.use("/api/remapping/market", remappingMarketRoutes);

app.use("/api/meta", metaRoutes);
app.use("/api/file-volatility", fileVolatilityRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/dq-checks", dqCheckRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/value-comparison", valueComparisonRoutes);

app.use(express.static(path.join(__dirname, "ui")));

app.get("/*", (req, res) => {
  let file = "";

  const sanitizedUrl = req.path;

  if (sanitizedUrl === "/") file = "/index.html";
  else file = sanitizedUrl;

  const filePath = path.join(__dirname, "ui", file);

  if (fs.existsSync(filePath)) res.sendFile(filePath);
  else res.sendFile(path.join(__dirname, "ui/index.html"));
});

// Handling Errors message
const errorHandlerMiddleware = require("./src/middlewares/errorHandler.middleware");
const joiErrorHandlerMiddleware = require("./src/middlewares/joiErrorHandler.middleware");

app.use(joiErrorHandlerMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`App listening at http://localhost:${port}`);
});
