import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FinancialTips } from "../components/FinancialTips";
import { SignUpForm } from "../components/SignUpForm";

const SignUp = () => {
  return (
    <Container className="container_signup p-5">
      <Row className=" p-5 rounded">
        <video autoPlay loop className="back-video">
          <source src="src/assets/p2.mp4" type="video/mp4"></source>
        </video>
        <Col md={6}>
          <FinancialTips />{" "}
        </Col>
        <Col md={6}>
          <SignUpForm />{" "}
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
