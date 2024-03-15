//esse codigo criara tabelas no dynamoDb
const AWS = require('aws-sdk');

// Configurar as credenciais da AWS
AWS.config.update({                      //coloque aqui suas credenciais da aws, lembrando nunca faça commit com suas credenciais
  accessKeyId: 'SEU_ACCESS_KEY_ID',
  secretAccessKey: 'SEU_SECRET_ACCESS_KEY',
  region: 'SUA_REGIAO'
});

// Criar uma instância do DynamoDB
const dynamodb = new AWS.DynamoDB();

// Definir parâmetros para criação de tabela
const params = {
  TableName: 'NOME_DA_SUA_TABELA',
  KeySchema: [
    { AttributeName: 'ChaveParticionada', KeyType: 'HASH' },  // Chave de partição
    // Se desejar uma tabela com ordenação, adicione a chave de classificação aqui
    // { AttributeName: 'ChaveDeClassificacao', KeyType: 'RANGE' }  // Chave de classificação
  ],
  AttributeDefinitions: [
    { AttributeName: 'ChaveParticionada', AttributeType: 'S' },  // S = String
    // Se necessário, adicione a definição do atributo para a chave de classificação
    // { AttributeName: 'ChaveDeClassificacao', AttributeType: 'N' }  // N = Number
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,  // Capacidade de leitura por segundo
    WriteCapacityUnits: 5  // Capacidade de escrita por segundo
  }
};

// Criar a tabela
dynamodb.createTable(params, (err, data) => {
  if (err) {
    console.error('Erro ao criar a tabela:', err);
  } else {
    console.log('Tabela criada com sucesso:', data);
  }
});
