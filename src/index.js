import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './global.css';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';

ReactDOM.render(
    <React.StrictMode>
        <ToastContainer position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        pauseOnHover/>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
