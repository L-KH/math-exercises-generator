import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MathJaxContext } from 'better-react-mathjax';

ReactDOM.render(
  <React.StrictMode>
    <MathJaxContext>
      <App />
    </MathJaxContext>
  </React.StrictMode>,
  document.getElementById('root')
);
