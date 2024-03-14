const axios = require('axios');

const apiURL = 'http://localhost:3000/transactions';// aqui vc coloca a url da sua api

async function createTransaction(id) {
    const transaction = {
        idempotencyId: 'idempotency_${id}',
        amount: Math.floor(Math.random() * 1000) + 1, //valor aleatorio entre 1 e 10
        type: 'purchase',
        creditDebit: 'debit'
    };


    try{
        await axios.post(apiURL, transaction);
        console.log('Transação ${id} criada com sucesso');
    }catch (error) {
        if(error.response && error.response.data){
            console.error('Error ao criar transação ${id}', error.response.data);
        } else {
            console.error('Erro ao criar transação ${id}', error.massage);
        }

    }

async function createMultipleTransactions(numTransactions){
    for (let i = 1; i <= numTransactions; i++) {
        await createTransaction(i);
    }
}

const numTransactions = 100;

createMultipleTransactions(numTransactions);
}