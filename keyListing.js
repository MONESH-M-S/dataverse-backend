const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

async function main() {
    const keyVaultName = 'bnlwe-da02-b-902592-kv01';
    const secretName = "6d8fc003-0459-4b44-8e78-937f3d76f009";
    const url = `https://${keyVaultName}.vault.azure.net`;

    const credential = new DefaultAzureCredential();

    const client = new SecretClient(url, credential);

    const secret = await client.getSecret(secretName)

    console.log("Secret is ", secret)
}

main()