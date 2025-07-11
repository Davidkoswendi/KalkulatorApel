/**
 * FILE: src/components/AppFooter.js
 * KOMPONEN FOOTER APLIKASI
 * Fitur:
 * untuk footer di halaman kalkulator
 */

import React from 'react';

const AppFooter = () => {
  return (
    <footer className="app-footer">
      <p>{new Date().getFullYear()} Kalkulator Apel David</p>
    </footer>
  );
};

export default AppFooter;