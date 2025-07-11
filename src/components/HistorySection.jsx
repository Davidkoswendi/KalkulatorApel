/**
 * FILE: src/components/HistorySection.js
 * KOMPONEN RIWAYAT PERHITUNGAN
 * - Menampilkan daftar perhitungan sebelumnya
 * - Memungkinkan penggunaan kembali atau penghapusan
 */

import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const HistorySection = ({ history, onUseItem, onRemoveItem, onClearAll }) => {
  /**
   * Format simbol operator untuk tampilan yang lebih baik
   */
  
  const formatOperationSymbol = (op) => {
    switch(op) {
      case '*': return '×'; // Ubah * menjadi ×
      case '/': return '÷'; // Ubah / menjadi ÷
      default: return op;   // Biarkan + dan - tetap sama
    }
  };

  return (
    <div className="history-section">
      {/* Header dengan tombol hapus semua */}
      <div className="history-header">
        <h3>Riwayat Perhitungan</h3>
        {history.length > 0 && (
          <button onClick={onClearAll} className="clear-all-btn">
            Hapus Semua
          </button>
        )}
      </div>
      
      {/* Daftar riwayat */}
      <div className="history-items">
        {history.length > 0 ? (
          history.map((item) => (
            <div key={item.id} className="history-item">
              {/* Item riwayat yang bisa diklik */}
              <div onClick={() => onUseItem(item)}>
                {item.num1} {formatOperationSymbol(item.op)} {item.num2} = {item.result}
              </div>
              
              {/* Tombol hapus */}
              <button 
                onClick={(e) => {
                  e.stopPropagation(); // Mencegah trigger onClick parent
                  onRemoveItem(item.id);
                }}
                className="delete-btn"
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <div className="empty-history">
            Belum ada riwayat perhitungan
          </div>
        )}
      </div>
    </div>
  );
};

export default HistorySection;