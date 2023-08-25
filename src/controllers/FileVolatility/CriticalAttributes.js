const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { ClientSecretCredential } = require("@azure/identity");
const {getClientSecret} = require('../../config/msal.config');

const triggerADFPipeline = async (req, res, next) => {
  try {
    const subscriptionId = process.env["DATAFACTORY_SUBSCRIPTION_ID"];
    const resourceGroupName = process.env["DATAFACTORY_RESOURCE_GROUP"];
    const factoryName = process.env["FACTORY_NAME"];
    const pipelineName = process.env["PIPELINE_NAME"];
    const referencePipelineRunId = undefined;

    const parameters = {...req.body, EmailId: req.user.email};

    const options = {
      referencePipelineRunId,
      parameters,
    };

    const clientSecret = await getClientSecret()
    const credential = new ClientSecretCredential(process.env["TENENT_ID"], process.env["CLIENT_ID"], clientSecret)
    const client = new DataFactoryManagementClient(credential, subscriptionId);

    const result = await client.pipelines.createRun(
      resourceGroupName,
      factoryName,
      pipelineName,
      options
    );

    res.json({ result });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { triggerADFPipeline };
