import React from "react";
import appleImage from "../assets/apple.png";
import quarterApple from "../assets/quarter-apple.png";
import halfApple from "../assets/half-apple.png";
import threeQuarterApple from "../assets/three-quarter-apple.png";

const AppleDisplay = ({ num1, num2, operation, result }) => {
  const MAX_APPLES = 1000; // Show first 1000 apples then "+X apel"

  const readNumber = (number) => {
    if (number === null || number === undefined) return "";
    
    const num = parseFloat(number);
    if (isNaN(num)) return "Bukan angka";
    
    // Handle negative numbers
    if (num < 0) {
      return `negatif ${readNumber(Math.abs(num))}`;
    }
    
    const units = ['', 'ribu', 'juta', 'miliar', 'triliun'];
    const numbers = [
      'nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 
      'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh',
      'sebelas', 'dua belas', 'tiga belas', 'empat belas', 'lima belas',
      'enam belas', 'tujuh belas', 'delapan belas', 'sembilan belas'
    ];

    // Handle decimal numbers
    if (num % 1 !== 0) {
      const decimalPart = Math.round((num % 1) * 100);
      return `${readNumber(Math.floor(num))} koma ${readNumber(decimalPart)}`;
    }

    // Handle numbers 0-19
    if (num < 20) return numbers[num];

    // Handle tens (20-99)
    if (num < 100) {
      const tens = Math.floor(num / 10);
      const remainder = num % 10;
      return `${numbers[tens]} puluh${remainder ? ' ' + numbers[remainder] : ''}`;
    }

    // Handle hundreds (100-999)
    if (num < 1000) {
      const hundreds = Math.floor(num / 100);
      const remainder = num % 100;
      return `${hundreds === 1 ? 'seratus' : numbers[hundreds] + ' ratus'}${remainder ? ' ' + readNumber(remainder) : ''}`;
    }

    // Handle thousands (1000-9999)
    if (num < 10000) {
      const thousands = Math.floor(num / 1000);
      const remainder = num % 1000;
      return `${thousands === 1 ? 'seribu' : numbers[thousands] + ' ribu'}${remainder ? ' ' + readNumber(remainder) : ''}`;
    }

    // Handle large numbers (10,000+)
    for (let i = 1; i < units.length; i++) {
      const scale = Math.pow(1000, i + 1);
      if (num < scale) {
        const base = Math.pow(1000, i);
        const prefix = Math.floor(num / base);
        const remainder = num % base;
        return `${readNumber(prefix)} ${units[i]}${remainder ? ' ' + readNumber(remainder) : ''}`;
      }
    }

    return "Angka terlalu besar";
  };

  const formatNumber = (num) => {
    if (num === null || num === undefined) return "";
    
    // Handle negative numbers
    const isNegative = num < 0;
    const absNum = Math.abs(num);
    
    // Format with thousand separators
    const parts = absNum.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    const formatted = parts.length > 1 ? parts.join(',') : parts[0];
    return isNegative ? `-${formatted}` : formatted;
  };

  const renderApples = (count) => {
    if (count === null || count === undefined) return null;
    
    const isNegative = count < 0;
    const absCount = Math.abs(count);
    const fullApples = Math.floor(absCount);
    const decimalPart = absCount % 1;
    const size = 45;
    const applesToShow = Math.min(fullApples, MAX_APPLES);
    const remaining = fullApples - MAX_APPLES;
    const apples = [];

    // Add negative sign if needed
    if (isNegative) {
      apples.push(
        <div key="negative-sign" className="negative-sign" style={{
          fontSize: '24px',
          fontWeight: 'bold',
          margin: '2px',
          alignSelf: 'center'
        }}>
          -
        </div>
      );
    }

    // Render up to MAX_APPLES whole apples
    for (let i = 0; i < applesToShow; i++) {
      apples.push(
        <img
          key={`full-${i}`}
          src={appleImage}
          alt="Apel utuh"
          className="apple-image"
          style={{ width: `${size}px`, height: `${size}px`, margin: "2px" }}
        />
      );
    }

    // Render partial apple if under MAX_APPLES
    if (decimalPart > 0 && fullApples < MAX_APPLES) {
      let fractionImage = null;
      if (decimalPart < 0.4) fractionImage = quarterApple;
      else if (decimalPart < 0.6) fractionImage = halfApple;
      else fractionImage = threeQuarterApple;

      apples.push(
        <img
          key="fraction"
          src={fractionImage}
          alt="Bagian apel"
          className="apple-image"
          style={{ width: `${size}px`, height: `${size}px`, margin: "2px" }}
        />
      );
    }

    return (
      <div className="apple-container">
        {apples.length > 0 ? apples : <span>0</span>}
        {remaining > 0 && (
          <div className="apple-remaining">
            +{formatNumber(remaining)} apel
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="apple-display-container">
      {/* Operation Row */}
      <div className="operation-row">
        {num1 !== null && (
          <div className="operand">
            {renderApples(num1)}
            <div className="number-value">{formatNumber(num1)}</div>
          </div>
        )}
        
        {operation && (
          <div className="operator">
            {operation === '*' ? '×' : operation === '/' ? '÷' : operation}
          </div>
        )}
        
        {num2 !== null && (
          <div className="operand">
            {renderApples(num2)}
            <div className="number-value">{formatNumber(num2)}</div>
          </div>
        )}
      </div>

      {/* Result Row */}
      {result !== null && (
        <div className="result-row">
          <div className="equals">=</div>
          <div className="operand">
            {renderApples(result)}
            <div className="number-value result-value">
              {formatNumber(result)}
              <div className="number-reading">
                Dibaca: <strong>{readNumber(result)}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppleDisplay;