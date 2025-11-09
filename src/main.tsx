// src/main.tsx

import React from 'react'
import ReactDOM from 'react-dom/client'
// 1. นำเข้า BrowserRouter
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 2. ห่อ <App /> ของเราด้วย <BrowserRouter> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)