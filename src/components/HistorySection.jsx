import React from "react";

const HistorySection = ({ history, onUseItem, onRemoveItem, onClearAll }) => {
  const formatOperationSymbol = (op) => {
    switch(op) {
      case '*': return '×';
      case '/': return '÷';
      default: return op;
    }
  };

  return (
    <div className="history-section">
      <div className="history-header">
        <h3>Riwayat Perhitungan</h3>
        {history.length > 0 && (
          <button onClick={onClearAll} className="clear-all-btn">
            Hapus Semua
          </button>
        )}
      </div>
      <div className="history-items">
        {history.length > 0 ? (
          history.map((item) => (
            <div key={item.id} className="history-item">
              <div onClick={() => onUseItem(item)}>
                {item.num1} {formatOperationSymbol(item.op)} {item.num2} = {item.result}
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
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