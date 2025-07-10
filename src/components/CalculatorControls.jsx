import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

const CalculatorControls = ({ onCalculate, onReset }) => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("+");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (num1 === "" || num2 === "") return;
    onCalculate(Number(num1), Number(num2), operation);
  };

  const handleReset = () => {
    setNum1("");
    setNum2("");
    setOperation("+");
    onReset();
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3 align-items-center">
          <Col xs={12} md={3} className="mb-2">
            <Form.Control
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              placeholder="Angka pertama"
              required
            />
          </Col>
          
          <Col xs={12} md={2} className="mb-2">
            <Form.Select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="text-center"
            >
              <option value="+">+</option>
              <option value="-">-</option>
              <option value="*">×</option>
              <option value="/">÷</option>
            </Form.Select>
          </Col>
          
          <Col xs={12} md={3} className="mb-2">
            <Form.Control
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              placeholder="Angka kedua"
              required
            />
          </Col>
          
          <Col xs={12} md={4} className="d-flex gap-2">
            <Button variant="primary" type="submit" className="flex-grow-1">
              Hitung
            </Button>
            <Button
              variant="outline-danger"
              onClick={handleReset}
              className="flex-grow-1"
            >
              Reset
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CalculatorControls;