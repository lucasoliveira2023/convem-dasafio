const {handle} = require('./lambda_function');

describe('handle', ()=> {
    test('deveria processar SQS mensagens e salvar no dynamoDB', async () =>{
        const event = {
            Records: [
                {messageId: '1', body: "{message': 'ola, mundo!'}"}
            ]
        };

        const result = await handle(event);
        expect(result.statusCode).toEqual(200);
        expect(result.body).toEqual('Mesagens processadas com sucesso');
    });

    test('should handle errors gracefully', async() => {
        const event = {
            Records: [
                { messageId: '1', body: '{"message": "hello, world!"}'}
            ]
        };

        //simulando um erro no DynamoDB
        jest.spyOn(require('@aws-sdk/client-dynamoDb'), 'PutItemCommend').mockImplemantationOnce(() => {
            throw new Error('Erro ao salva no DynamoDB');
        });

        const result = await handle(event);
        expect(result.statusCode).toEqual(500);
        expect(result.body).toEqual('Erro interno ao processar mensagens');

    });
});