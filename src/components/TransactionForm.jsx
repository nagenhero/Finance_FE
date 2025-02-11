import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "./CustomInput";
import axios from "axios";
import { useTransaction } from "../context/TransactionContext";
import { toast } from "react-toastify";
import { useUser } from "../context/UserContext";

const initialState = {
  type: "",
  description: "",
  amount: "",
  date: "",
};

export const TransactionForm = () => {
  const [form, setForm] = useState(initialState);
  const { fetchTransaction } = useTransaction();
  const { setShowTransactionModel } = useUser();

  const handleOnChange = async (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(1111, form);
      const token = localStorage.getItem("accessToken");
      console.log("token is", token);
      //call api
      const response = await axios.post(
        "http://localhost:9001/api/v1/transactions",
        form,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response);
      toast.success(response.data.message);
      setShowTransactionModel(false);
      fetchTransaction();
    } catch (err) {
      console.log(err);
    }
  };

  const fields = [
    {
      label: "Title",
      placeholder: "Salary",
      required: true,
      type: "text",
      name: "description",
      value: form.description,
    },
    {
      label: "Amount",
      placeholder: "44",
      required: true,
      type: "number",
      name: "amount",
      value: form.amount,
    },
    {
      label: "Transaction Date",
      required: true,
      type: "date",
      name: "date",
      value: form.date,
    },
  ];

  return (
    <div className="border rounded p-4">
      <h4 className="mb-5">Add your transaction!</h4>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Transaction type</Form.Label>
          <Form.Select name="type" onChange={handleOnChange} required>
            <option value="">-- select --</option>
            <option value="Income">Income</option>
            <option value="Expense">Expenses</option>
          </Form.Select>
        </Form.Group>
        {fields.map((input) => (
          <CustomInput key={input.name} {...input} onChange={handleOnChange} />
        ))}

        <div className="d-grid">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};
