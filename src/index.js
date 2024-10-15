import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'; // require('./App').default
const containerElement = document.getElementById('root');
const root = createRoot(containerElement);
root.render(<App />);