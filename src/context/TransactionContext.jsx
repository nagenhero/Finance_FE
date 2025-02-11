import axios from "axios";
import { createContext, useContext, useState } from "react";
const TransactionContext = createContext();

export const TransactionProvider = (props) => {
  const [transactions, setTransactions] = useState([]);
  const fetchTransaction = async () => {
    const token = localStorage.getItem("accessToken");
    console.log("token is", token);
    //call api
    const response = await axios.get(
      "http://localhost:9001/api/v1/transactions",

      {
        headers: {
          Authorization: token,
        },
      }
    );
    setTransactions(response.data.transaction);
    console.log("response transaction", response.data.transaction);
  };
  const transactionObject = {
    transactions,
    setTransactions,
    fetchTransaction,
  };
  return (
    <TransactionContext.Provider value={transactionObject}>
      {props.children}
    </TransactionContext.Provider>
  );
};
export const useTransaction = () => useContext(TransactionContext);
