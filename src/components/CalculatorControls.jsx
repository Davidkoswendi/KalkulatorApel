/**
 * FILE: src/components/CalculatorControls.js
 * KOMPONEN KONTROL KALKULATOR
 * Fitur:
 * - Input dua angka dan operasi matematika
 * - Validasi input (angka tidak kosong dan pembagian dengan nol)
 * - Tampilan responsif untuk berbagai ukuran layar
 * - Sistem feedback error untuk input tidak valid
 * - Tombol reset untuk mengembalikan ke state awal
 * - Integrasi dengan komponen parent melalui props
 */

import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

const CalculatorControls = ({ onCalculate, onReset }) => {
  // State untuk menyimpan input angka pertama
  const [num1, setNum1] = useState("");
  // State untuk menyimpan input angka kedua
  const [num2, setNum2] = useState("");
  // State untuk menyimpan operasi matematika yang dipilih (default: penjumlahan)
  const [operation, setOperation] = useState("+");
  // State untuk menampilkan pesan error
  const [error, setError] = useState("");

  // Handler untuk submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset pesan error
    
    // Validasi input
    if (num1 === "" || num2 === "") {
      setError("Mohon isi kedua angka");
      return;
    }
    
    // Validasi pembagian dengan 0
    if (operation === "/" && Number(num2) === 0) {
      setError("Tidak bisa membagi dengan 0");
      return;
    }
    
    // Panggil fungsi calculate dari parent component
    onCalculate(Number(num1), Number(num2), operation);
  };

  // Handler untuk reset form
  const handleReset = () => {
    setNum1("");
    setNum2("");
    setOperation("+");
    setError("");
    onReset(); // Panggil fungsi reset dari parent component
  };

  return (
    <Container className="calculator-controls">
      <Form onSubmit={handleSubmit}>
        {/* Baris input dan operasi */}
        <Row className="mb-3 align-items-center">
          {/* Input angka pertama */}
          <Col xs={12} md={3} className="mb-2">
            <Form.Control
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              placeholder="Angka pertama"
              className="text-center"
              data-testid="num1-input"
            />
          </Col>
          
          {/* Dropdown pemilihan operasi */}
          <Col xs={12} md={2} className="mb-2">
            <Form.Select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="text-center"
              data-testid="operation-select"
            >
              <option value="+">+</option>
              <option value="-">-</option>
              <option value="*">×</option>
              <option value="/">÷</option>
            </Form.Select>
          </Col>
          
          {/* Input angka kedua */}
          <Col xs={12} md={3} className="mb-2">
            <Form.Control
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              placeholder="Angka kedua"
              className="text-center"
              data-testid="num2-input"
            />
          </Col>
          
          {/* Tombol aksi */}
          <Col xs={12} md={4} className="d-flex gap-2">
            <Button 
              variant="primary" 
              type="submit" 
              className="flex-grow-1"
              data-testid="calculate-button"
            >
              Hitung
            </Button>
            <Button
              variant="outline-danger"
              onClick={handleReset}
              className="flex-grow-1"
              data-testid="reset-button"
            >
              Reset
            </Button>
          </Col>
        </Row>

        {/* Menampilkan pesan error jika ada */}
        {error && (
          <Row className="mb-3">
            <Col className="text-center text-danger">
              <small>{error}</small>
            </Col>
          </Row>
        )}
      </Form>
    </Container>
  );
};

export default CalculatorControls;