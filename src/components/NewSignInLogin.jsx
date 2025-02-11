import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { NewCustomInput } from "./layout/NewCustomInput.jsx";

export const NewSignInLogin = () => {
  const fields = [
    {
      label: "Email",
      placeholder: "John@email.com",
      required: true,
      type: "email",
      name: "email",
    },
    {
      label: "Password",
      placeholder: "******",
      required: true,
      type: "password",
      name: "password",
    },
  ];

  return (
    <>
      <Form>
        {fields.map((input) => (
          <NewCustomInput key={input.name} {...input} />
        ))}

        <div className="d-grid">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};
