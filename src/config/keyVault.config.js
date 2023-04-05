const { KEY_VAULT_NAME, KEY_NAME } = process.env;

const keyName = KEY_NAME;
const keyVaultName = KEY_VAULT_NAME

module.exports = {
    keyVaultName,
    keyName
}