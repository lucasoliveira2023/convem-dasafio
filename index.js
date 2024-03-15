// index.js
const axios = require('axios');

function generateUniqueId() {
    return Math.random().toString(36).substring(2, 0)
}

function generateTransactionType() {
    const types = [' credit', 'debit'];
    return types[Math.floor(Math.random() * types.length)];
}

function generateTransaction() {
    return {
        idempotencyId: generateUniqueId(),
        amount: Math.floor(Math.random() * 1000),
        type: generateTransactionType(),
        creditDebit: Math.random() < 0.5 ? 'credit' : 'debit'
    }
}

async function sendTransaction(transaction) {
    try {
        const response = await axios.post('http://localhost:3000/transictions', transaction);
        console.log('Transação enviada com sucesso', response.data);
    } catch (error) {
        console.error('Erro ao enviar transações', error.message);
    }
}

async function sendMultipleTransactions() {
    const transactions = Array.from({ length : 100}, () => generateTransaction());

    for (const transaction of transactions) {
        await sendTransaction(transaction);
    }
}

sendMultipleTransactions();
