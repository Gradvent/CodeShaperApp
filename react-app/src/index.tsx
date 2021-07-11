import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'highlight.js/styles/default.css'
import reportWebVitals from './reportWebVitals';
import AppLayout from './components/AppLayout';
import Pasta from './components/Pasta';

ReactDOM.render(
  <React.StrictMode>
    <AppLayout>
      <Pasta lang="python" user="ololosh">print("Hello World!")</Pasta>
    </AppLayout>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
