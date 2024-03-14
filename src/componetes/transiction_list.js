// TransactionsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Realiza uma chamada para a rota da sua API que retorna as transações do DynamoDB
    axios.get('/api/transactions')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar transações:', error);
      });
  }, []);

  return (
    <div>
      <h1>Transações</h1>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <strong>ID: </strong>{transaction.id} | 
            <strong> Data: </strong>{transaction.data}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
