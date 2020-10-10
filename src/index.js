import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "antd/dist/antd.css";
import App from './App';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
  document.getElementById('root')
);


