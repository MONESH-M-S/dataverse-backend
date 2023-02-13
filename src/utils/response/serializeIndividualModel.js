const { deserialize, serialize } = require("serializr");

module.exports = (data, serializerName, responseModelName) => {

    if (serializerName !== undefined) {
        const deSerializedData = deserialize(serializerName, data);
        data = serialize(serializerName, deSerializedData);
    }
    let responseObject = {
        [responseModelName]: data,
        status: "success",
    };

    return responseObject


}