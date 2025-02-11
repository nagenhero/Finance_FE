import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { useTransaction } from "../context/TransactionContext";

export const TransactionTable = () => {
  const { showTransactionModel, setShowTransactionModel } = useUser();
  const { transactions, fetchTransaction } = useTransaction();
  const [displayTransaction, setDisplayTran] = useState(transactions);

  const [idsToDelete, setIdsToDelete] = useState([]);
  //fetching the trasction data
  // fetchTransaction();
  useEffect(() => {
    fetchTransaction();
    console.log("use effect1", transactions);
    // setDisplayTran(transactions);
    // console.log("hee", transactions);
    // setDisplayTran(transactions);
  }, []);
  // update temporary display transaction variable
  // call whenever there is an update in transactions variable

  useEffect(() => {
    console.log("use effect2", transactions);
    setDisplayTran(transactions);
  }, [transactions]);
  const handleOnSearch = (e) => {
    console.log(e.target.value);
    const originalTransaction = transactions;

    const filteredTransaction = originalTransaction.filter((item) => {
      return item.description.includes(e.target.value);
    });

    setDisplayTran(filteredTransaction);
  };

  const handleOnSelect = (e) => {};

  const handleOnDelete = async () => {};

  return (
    <>
      <div className="d-flex justify-content-between pt-3 mb-4">
        <div>{displayTransaction.length} transaction(s) found!</div>
        <div>
          <Form.Control
            placeholder="Search transactions..."
            type="text"
            onChange={handleOnSearch}
          />
        </div>
        <div>
          <Button onClick={() => setShowTransactionModel(true)}>
            <FaPlusCircle /> Add New Transaction
          </Button>
        </div>
      </div>
      <div>
        <Form.Check
          label="Select All"
          value="all"
          onChange={handleOnSelect}
          checked={displayTransaction.length === idsToDelete.length}
        />
      </div>
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date </th>
            <th>Title</th>
            <th>Out </th>
            <th>In </th>
          </tr>
        </thead>
        <tbody>
          {displayTransaction.length > 0 &&
            displayTransaction.map((t, i) => (
              <tr key={t._id}>
                <td>{i + 1}</td>
                <td>
                  <Form.Check
                    label={t.createdAt.slice(0, 10)}
                    value={t._id}
                    onChange={handleOnSelect}
                    checked={idsToDelete.includes(t._id)}
                  />
                </td>
                <td>{t.description}</td>
                {t.type === "Expense" && (
                  <>
                    <td className="out">-${t.amount} </td>
                    <td> </td>
                  </>
                )}
                {t.type === "Income" && (
                  <>
                    <td> </td>
                    <td className="in">${t.amount} </td>
                  </>
                )}
              </tr>
            ))}
          {/* <tr>
          <td>1</td>
          <td>20-3-2024</td>
          <td>Salary</td>
          <td> </td>
          <td>$ 3456 </td>
        </tr>
        <tr>
          <td>2</td>
          <td>20-3-2024</td>
          <td>Shopping</td>
          <td className="text-danger-important">$ -345 </td>
          <td> </td>
        </tr> */}
          {/* <tr>
          <td>3</td>
          <td>20-3-2024</td>
          <td>Found on the street</td>
          <td> </td>
          <td>$ 300 </td>
        </tr> */}

          <tr className="fw-bold text-end">
            <td colSpan={3}> Total Balance</td>

            <td colSpan={2}>
              $
              {displayTransaction.reduce((acc, t) => {
                return t.type === "Income" ? acc + t.amount : acc - t.amount;
              }, 0)}{" "}
            </td>
          </tr>
        </tbody>
      </Table>
      {idsToDelete.length > 0 && (
        <div className="d-grid">
          <Button variant="danger" onClick={handleOnDelete}>
            Delete {idsToDelete.length} Transactions
          </Button>
        </div>
      )}
    </>
  );
};
