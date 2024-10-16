import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDom from 'react-dom';
import App from './App.jsx'; // wfarequire('./App').default;
ReactDom.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
