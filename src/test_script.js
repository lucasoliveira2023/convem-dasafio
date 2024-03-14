const axios = require('axios');

//função para gerar um ID unico para cada transação
function generateUniqueId() {
    return Math.random().toString(36).substring(2, 0)
}

//função para gerar um tipo de transação aleatório (credit debit)
function generateTransactionType() {
    const types = [' credit', 'debit'];
    return types[Math.floor(Math.random() * types.length)];
}

//função para gerar uma transação de valores aleatorios
function genarateTransiction() {
    return {
        idempotencyId: generateUniqueId(),
        amount:Math.floor(Math.random() * 1000), //valor aleatorio de 0 a 1000
        type: generateTransictionType(),
        creditDebit :Math.random() < 0.5 ? 'credit' : 'debit' // escolhe aleatoriamente entre credito e debito
    }
}

//função para enviar transação para a API
async function sendTransaction(transaction) {
    try {
        const response = await axios.post('http://localhost:3000/transictions', transaction);
        console.log('Transação enviada com sucesso', response.data);
    } catch (error) {
        console.error('erro ao enviar transações', error.massage);
    }
}

//criar e enviar 100 transações diferentes
async function sendMultipleTransactions() {
    const transactions = Array.from({ langth : 100}, () => generateTransactionType());

    for (const transaction of transactions) {
        await sendTransaction(transaction);
    }
}

//Executar a função para enviar as transações

sendMultipleTransactions();