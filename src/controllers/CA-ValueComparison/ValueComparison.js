const { getClientSecret } = require("../../config/msal.config");
const { BlobServiceClient } = require("@azure/storage-blob");
const { ClientSecretCredential } = require("@azure/identity");

const readFileFromBlob = async (req, res, next) => {
  const account = "dbstorageda08d904380";
  const clientSecret = await getClientSecret();
  const credential = new ClientSecretCredential(
    process.env["TENENT_ID"],
    process.env["CLIENT_ID"],
    clientSecret
  );

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    credential
  );

  const containerName = "databricks";
  const blobName = "E.D.I.T.H/ValueComparison/Sample/ValueComparison_dummy.csv";

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(blobName);

  const downloadBlockBlobResponse = await blobClient.download();
  const downloaded = (
    await streamToBuffer(downloadBlockBlobResponse.readableStreamBody)
  ).toString();
  res.send(downloaded);
};

async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on("error", reject);
  });
}

module.exports = {
  readFileFromBlob,
};
