import React from 'react';

export const Navbar = ({ title }) => (
  <nav style={{ padding: '1rem', background: '#000', color: '#fff', display: 'flex', gap: '20px' }}>
    <span style={{ fontWeight: 'bold' }}>NIONAL | {title}</span>
    <a href="https://nional.com" style={{ color: '#fff' }}>Home</a>
    <a href="https://pdf.nional.com" style={{ color: '#fff' }}>PDF</a>
    <a href="https://calc.nional.com" style={{ color: '#fff' }}>Calc</a>
  </nav>
);

export const Footer = () => (
  <footer style={{ padding: '2rem', textAlign: 'center', background: '#f5f5f5', marginTop: '50px' }}>
    <p>&copy; 2025 Nional Platform. All rights reserved.</p>
  </footer>
);