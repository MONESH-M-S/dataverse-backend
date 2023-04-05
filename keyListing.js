const { SecretClient } = require("@azure/keyvault-secrets");
const { DefaultAzureCredential } = require("@azure/identity");

async function main() {
    const keyVaultName = 'bieno-da06-u-904378-kv0';
    const secretName = "svc-b-da-u-904378-ina-aadprincipal";
    const url = `https://${keyVaultName}.vault.azure.net`;

    const credential = new DefaultAzureCredential();

    const client = new SecretClient(url, credential);

    const secret = await client.getSecret(secretName)

    console.log("Secret is ", secret)
}

main()