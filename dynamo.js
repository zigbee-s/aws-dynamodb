const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'organizations';

const getCharacters = async () => {
    const params = {
        TableName: TABLE_NAME,
    };
    return await dynamoClient.scan(params).promise();
};

const getCharacterById = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };
    return await dynamoClient.get(params).promise();
};


const addOrUpdateCharacter = async (character) => {
    const params = {
        TableName: TABLE_NAME,
        Item: character,
    };
    return await dynamoClient.put(params).promise();
};

/*

getCharacterById("1")
.then(result => {
    console.log(result)
})


addOrUpdateCharacter({
    id: "1",
    descrption: "Hey let's see"
})

*/

module.exports = {
    addOrUpdateCharacter,
    getCharacterById,
    getCharacters
}