import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import './index.scss';
import 'uikit/dist/js/uikit.min.js';
import App from './App';
import reportWebVitals from './reportWebVitals';
const browserHistory = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Router history={browserHistory}>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
