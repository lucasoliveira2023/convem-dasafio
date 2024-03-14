// passo 3
const {SQSClient, SendMessageCommand} = require('@aws-sdk/client-sqs');
const  { DynamoDBClient, PutItemCommand} = require ('@aws-sdk/client-dynamodb');

const sqs = new SQSClient({region: 'YOU REGION'}); // SUBSTITUA PELA SUA REGIÃO
const dynamodb = new DynamoDBClient();


exports.handle = async (event) => {
    try {
        for (const record of event.Records){
            const body = JSON.parse(record.body);
            await saveToDynamoDB(record.messageId, body);
        }
        return {statusCode: 200, body: 'Messagens processadas comsucesso'};
    } catch (error) {
        console.error('error ao processar mensagens', error);
    }
};

async function saveToDynamoDB(ID, BODY){
    try {
        await dynamodb.send(new PutItemCommand({
            TableName: 'nomedatabela', //substitua aqui o nome da sua tabela
            item: {
                id: { S: id},
                data: {S: JSON.stringify(body)}
            }
        }));
    } catch (error) {
        console.error('Erro ao salvar no DynamoDB:', error);
    }
}
