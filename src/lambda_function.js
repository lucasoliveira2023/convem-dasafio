// passo 3
const AWS = require('aws-sdk');

const sqs = new AWS.SQS({region:''}); //aqui vc coloca sua região
const dynamodb = new AWS.DynamoDB.DocumentClient();


exports.handle = async (event) => {
    try{
        for (const record of event.Records){
            const body = JSON.parse(record.body);

            //salva os dados da transação no dynamoDB
            await dynamoDB.put({
                TableName: 'nome_da_sua-tabela_no_dynamo_db',// não consegui ter acesso ao banco de dados do dynamo_db, mas ao acessa-lo é so sustituir o nome da tabela dele aqui nesse trcho de codigo
                item: {
                    id: record.massage.ID, 
                    data: body
                }
            }).promisse();
        }
        return { statusCode: 200, body: 'Mensagens processadas com sucesso'};
    } catch (error) {
        console.error('Erro ao processar mensagens:', error);
        return { statusCode: 500, body: 'Erro interno ao processar mensagens'};
    }
};

