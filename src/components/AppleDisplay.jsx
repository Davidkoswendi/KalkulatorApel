/**
 * FILE: src/components/AppleDisplay.js
 * KOMPONEN VISUALISASI ANGKA DENGAN APEL
 * - Menampilkan angka sebagai gambar apel
 * - Konversi angka ke teks bahasa Indonesia
 */

import React from "react";
import appleImage from "../assets/apple.png"; // Gambar apel utuh
import quarterApple from "../assets/quarter-apple.png"; // 1/4 apel
import halfApple from "../assets/half-apple.png"; // 1/2 apel
import threeQuarterApple from "../assets/three-quarter-apple.png"; // 3/4 apel
import { FaAppleAlt } from "react-icons/fa"; // Ikon apel

const AppleDisplay = ({ num1, num2, operation, result }) => {
  // Batas maksimal apel yang ditampilkan (lebih dari ini akan ditampilkan sebagai teks)
  const MAX_APPLES = 1000;

  /**
   * Mengubah angka menjadi teks bahasa Indonesia
   * Contoh: 123 → "seratus dua puluh tiga"
   * @param {number} number - Angka yang akan dikonversi
   * @returns {string} Teks representasi angka
   */
  const readNumber = (number) => {
    // Handle nilai null/undefined
    if (number === null || number === undefined) return "";
    
    // Konversi ke number
    const num = parseFloat(number);
    
    // Handle jika bukan angka
    if (isNaN(num)) return "Bukan angka";
    
    // Handle angka negatif
    if (num < 0) {
      return `negatif ${readNumber(Math.abs(num))}`;
    }
    
    // Daftar satuan (ribu, juta, etc)
    const units = ['', 'ribu', 'juta', 'miliar', 'triliun'];
    
    // Daftar angka 0-19
    const numbers = [
      'nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 
      'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh',
      'sebelas', 'dua belas', 'tiga belas', 'empat belas', 'lima belas',
      'enam belas', 'tujuh belas', 'delapan belas', 'sembilan belas'
    ];

    // Handle angka desimal
    if (num % 1 !== 0) {
      const decimalPart = Math.round((num % 1) * 100);
      return `${readNumber(Math.floor(num))} koma ${readNumber(decimalPart)}`;
    }

    // Handle angka 0-19
    if (num < 20) return numbers[num];

    // Handle puluhan (20-99)
    if (num < 100) {
      const tens = Math.floor(num / 10);
      const remainder = num % 10;
      return `${numbers[tens]} puluh${remainder ? ' ' + numbers[remainder] : ''}`;
    }

    // Handle ratusan (100-999)
    if (num < 1000) {
      const hundreds = Math.floor(num / 100);
      const remainder = num % 100;
      return `${hundreds === 1 ? 'seratus' : numbers[hundreds] + ' ratus'}${remainder ? ' ' + readNumber(remainder) : ''}`;
    }

    // Handle ribuan (1000-9999)
    if (num < 10000) {
      const thousands = Math.floor(num / 1000);
      const remainder = num % 1000;
      return `${thousands === 1 ? 'seribu' : numbers[thousands] + ' ribu'}${remainder ? ' ' + readNumber(remainder) : ''}`;
    }

    // Handle angka besar (10.000+)
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

  /**
   * Memformat angka dengan separator ribuan
   * Contoh: 1000 → "1.000"
   * @param {number} num - Angka yang akan diformat
   * @returns {string} Angka yang sudah diformat
   */
  const formatNumber = (num) => {
    if (num === null || num === undefined) return "";
    
    // Handle angka negatif
    const isNegative = num < 0;
    const absNum = Math.abs(num);
    
    // Pisahkan bagian desimal
    const parts = absNum.toString().split('.');
    
    // Tambahkan titik sebagai separator ribuan
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    
    // Gabungkan kembali jika ada desimal
    const formatted = parts.length > 1 ? parts.join(',') : parts[0];
    
    // Tambahkan tanda negatif jika perlu
    return isNegative ? `-${formatted}` : formatted;
  };

  /**
   * Render gambar apel berdasarkan angka
   * @param {number} count - Jumlah apel yang akan dirender
   * @returns {JSX.Element} Kumpulan gambar apel
   */
  const renderApples = (count) => {
    if (count === null || count === undefined) return null;
    
    // Handle angka negatif
    const isNegative = count < 0;
    const absCount = Math.abs(count);
    
    // Hitung jumlah apel utuh dan pecahan
    const fullApples = Math.floor(absCount); // Apel utuh
    const decimalPart = absCount % 1; // Bagian desimal
    
    const size = 45; // Ukuran gambar apel dalam pixel
    const applesToShow = Math.min(fullApples, MAX_APPLES); // Batasi jumlah apel
    const remaining = fullApples - MAX_APPLES; // Hitung apel yang tidak ditampilkan
    
    const apples = []; // Array untuk menyimpan elemen apel

    // jika angka negatif, tambahkan tanda minus
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

    // Render apel utuh
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

    // Render pecahan apel
    if (decimalPart > 0 && fullApples < MAX_APPLES) {
      let fractionImage = null;
      
      // Tentukan gambar pecahan berdasarkan nilai desimal
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
        {/* Tampilkan sisa apel yang tidak ditampilkan */}
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
      {/* Baris operasi: angka1 operator angka2 */}
      <div className="operation-row">
        {/* Angka pertama */}
        {num1 !== null && (
          <div className="operand">
            {renderApples(num1)}
            <div className="number-value">{formatNumber(num1)}</div>
          </div>
        )}
        
        {/* Operator */}
        {operation && (
          <div className="operator">
            {operation === '*' ? '×' : operation === '/' ? '÷' : operation}
          </div>
        )}
        
        {/* Angka kedua */}
        {num2 !== null && (
          <div className="operand">
            {renderApples(num2)}
            <div className="number-value">{formatNumber(num2)}</div>
          </div>
        )}
      </div>

      {/* Baris hasil (jika ada) */}
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