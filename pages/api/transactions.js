import { DynamonDB} from 'aws-sdk';

const dynamonDB = new DynamoDB.DocumentClient();


export default async function handler(req, res){
    try{
        const params = {
            TableNmae: process.env.DYNAMODB_TABLE_NAME, //Nome da Tabela do dynamoDB
        };
        

        const data = await DynamoDB.scan(params).promise();
        const transactions = data.Items.map(item => ({
            id: item.id,
            data: item.data
        }));

        res.status(200).json(transactions);
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        res.status(500).json({error:'Error interno ao buscar transações'});
    }
}