import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { NewSignInLogin } from "../components/NewSignInLogin";

export const NewLogin = () => {
  return (
    <>
      <Container>
        <Row>
          <Col md={6} className="bg-primary p-5">
            <NewSignInLogin />
          </Col>
          <Col md={6} className="bg-success">
            text decoration
          </Col>
        </Row>
      </Container>
    </>
  );
};
