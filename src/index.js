import React from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/popper.js/dist/popper.js';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();