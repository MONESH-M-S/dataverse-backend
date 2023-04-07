const env = process.env.APP_ENVIRONMENT
const path = require('path');


switch (env) {
  case "test":
    require("custom-env").env("test");
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
const fs = require('fs');

const errorHandlerMiddleware = require("./src/middlewares/errorHandler.middleware");
const joiErrorHandlerMiddleware = require("./src/middlewares/joiErrorHandler.middleware");
const auth = require("./src/middlewares/auth.middleware");

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
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes)

app.use('/secret', auth, async (req,res)=>{
  const keyVaultName = process.env.KEY_VAULT_NAME;
  const secretName = process.env.KEY_VAULT_SECRET_NAME;
  const url = `https://${keyVaultName}.vault.azure.net`;
  
  const credential = new DefaultAzureCredential();
  const client = new SecretClient(url, credential);
  const secret = await client.getSecret(secretName);
  res.send(secret).status(200);
})

app.use(express.static(path.join(__dirname, 'ui')));

app.get('/',(req,res)=>{

    let file = '';
    if(req.url === '/') 
        file = '/index.html';
    else 
        file = req.url;
    const filePath = path.join(__dirname, 'ui', file);

    console.log(filePath);
    
    if(fs.existsSync(filePath))
        res.sendFile(filePath);
    else
        res.sendFile(path.join(__dirname, 'ui/index.html'));
});

// Handling Errors message
app.use(joiErrorHandlerMiddleware);
app.use(errorHandlerMiddleware);

server.listen(port, "0.0.0.0", () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = server;
