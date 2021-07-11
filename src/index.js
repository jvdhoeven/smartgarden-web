import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
} from "react-router-dom";
import { createBrowserHistory } from "history";
import './index.scss';

import App from './App';
import reportWebVitals from './reportWebVitals';

const browserHistory = createBrowserHistory();

const startApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Router history={browserHistory}>
        <App />
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
};
document.addEventListener('deviceready', startApp, false)
document.addEventListener('backbutton', () => {
  console.log('backbutton');
  window.location.href = '#/home';
}, false);

window.App = {
  goTo: function (page) {
    switch (page) {
      case 'select':
        window.location.href = '#/';
        break;
      case 'dashboard':
        window.location.href = '#/home';
        break;
      case 'watering':
        window.location.href = '#/watering';
        break;
      case 'settings':
        window.location.href = '#/settings';
        break;
      default:
        window.location.href = '#/home';
        break;
    }
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
