//rota da api para retorna transações  no dynamo-db
import TransactionsList from "../componetes/transiction_list";


const transactionPage = () => {
    return <TransactionsList/>;
};

export default transactionPage