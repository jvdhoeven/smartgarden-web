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
  goToSelect: function() {
    window.location.href = '#/';
  },
  goToHome: function() {
    window.location.href = '#/home';
  },
  goToWatering: function() {
    window.location.href = '#/watering';
  },
  goToSettings: function() {
    window.location.href = '#/settings';
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
