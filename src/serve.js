const express = require('express');
const bodyParser = require('body-parser');
const aws = require('aws-sdk');
const readline = require('readline')

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Digite sua chave de acesso id:', (AWS_ACCESS_KEY_ID) => {
    rl.question('Digite sua chave secreta de acesso:', (AWS_SECRET_ACCESS_KEY) => {
        const AWS_REGION = 'sa-east-1';

        aws.config.update({
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY,
            region:  AWS_REGION
        });

        const sqs = new aws.SQS({ apiVersion: '2012-11-05' });
        

        app.post('/transactions', async (req, res) => {
            const { idempotencyId, amount, type, creditDebit } = req.body;

            if (!idempotencyId || !amount || !type || ! creditDebit) {
                return res.status(400).json({ error: 'Todos os campos obrigatorios: idempotencyId, amount, type, creditDebit' });
            }

            const transictionData = {
                    idempotencyId,
                    amount,
                    type,
                    creditDebit,
                };
            
            const params = {
                MessageBody: JSON.stringify(transictionData),
                queueUrl: 'substitua aqui pela URL_DA_SUA_FILA_SQS', 
            };

            try {
                const data = await sqs.sendMessage(params).promise();
                console.log('Mensagwm enviada para a fila SQS:', data.MessageId);
                res.status(201).json({ message: 'transação recebida e enviada para a fila sqs com sucesso'})
            } catch (error){
                console.error('error ao enviar mensagem para a fila SQS:', error);
                res.status(500).json({ error: 'Erro interno ao processar transação'});
            }
            
        });

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

        
    });
});
