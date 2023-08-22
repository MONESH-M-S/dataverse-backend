const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { DefaultAzureCredential, AzureAuthorityHosts, ClientSecretCredential } = require("@azure/identity");

const triggerADFPipeline = async (req, res, next) => {
  try {
    const subscriptionId = process.env["DATAFACTORY_SUBSCRIPTION_ID"];
    const resourceGroupName = process.env["DATAFACTORY_RESOURCE_GROUP"];
    const factoryName = process.env["FACTORY_NAME"];
    const pipelineName = process.env["PIPELINE_NAME"];
    const referencePipelineRunId = undefined;

    const parameters = {
      test: ["12"],
    };

    const options = {
      referencePipelineRunId,
      parameters,
    };

    // const credential = new DefaultAzureCredential();

    const credential = new ClientSecretCredential(
      process.env["APP_REGISTRATON_TENENT_ID"],
      process.env["APP_REGISTRATON_CLIENT_ID"],
      process.env["APP_REGISTRATON_CLIENT_SECRET"],
      {
        authorityHost: AzureAuthorityHosts.AzureGovernment,
      }
    )

    const client = new DataFactoryManagementClient(credential, subscriptionId);

    const result = await client.pipelines.createRun(
      resourceGroupName,
      factoryName,
      pipelineName,
      options
    );

    console.log(result);

    res.json({ result });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = { triggerADFPipeline };
