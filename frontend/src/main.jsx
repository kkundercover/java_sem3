import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

/**
 * MODULE 5.2: React Entry Point
 * 
 * 1. ReactDOM.createRoot: Mounts the React component tree into the DOM root node.
 * 2. BrowserRouter: Enables client-side Single Page Application (SPA) routing without full page reloads.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
