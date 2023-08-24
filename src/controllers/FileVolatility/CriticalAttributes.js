const { DataFactoryManagementClient } = require("@azure/arm-datafactory");
const { ClientSecretCredential, DefaultAzureCredential, ManagedIdentityCredential, TokenCredential } = require("@azure/identity");
const {getClientSecret} = require('../../config/msal.config')

const testTrigger = async (req, res, next) => {
  try {
     const credential = new ManagedIdentityCredential("a137f3ec-dab7-461f-a70e-b9ccc8e4e4a3")
     const token = await credential.getToken();
    //  const tokenCredential = new TokenCredential()
    const subscriptionId = process.env["DATAFACTORY_SUBSCRIPTION_ID"];
     const client = new DataFactoryManagementClient(credential, subscriptionId)
    res.json({token, credential, client}).status(200)
  } catch (error) {
    res.send(error).status(200)
  }
}

const testTriggerwithDefault = async (req, res, next) => {
  try {
     const credential = new DefaultAzureCredential({ managedIdentityClientId : "a137f3ec-dab7-461f-a70e-b9ccc8e4e4a3" })
     console.log("Credential", credential);
     const token = await credential.getToken();
    //  const tokenCredential = new TokenCredential()
    const subscriptionId = process.env["DATAFACTORY_SUBSCRIPTION_ID"];
     const client = new DataFactoryManagementClient(credential, subscriptionId)
    res.json({token, credential, client}).status(200)
  } catch (error) {
    res.send(error).status(200)
  }
}

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

    const credential = new DefaultAzureCredential({ managedIdentityClientId : "6d8fc003-0459-4b44-8e78-937f3d76f009" });
    // const credential = new ManagedIdentityCredential(process.env["CLIENT_ID"])
    // const credential = new ClientSecretCredential(process.env["TENENT_ID"], process.env["CLIENT_ID"], "Y5t8Q~YWA1s9sT6ToOqA1NH3aVLhZoBIfG4RMaaz")
    console.log(credential);
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

module.exports = { triggerADFPipeline,testTrigger, testTriggerwithDefault };
