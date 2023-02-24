import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


import { AuthProvider } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";

import {  useAuth } from "@arcana/auth-react";

import { BrowserRouter} from 'react-router-dom';

var appAddress = '1939f3cd359859f261667548dfa898f390e957ec' ;

export const provider = new AuthProvider(`${appAddress}`) // required


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProvideAuth provider={provider}>
           <BrowserRouter>
            <App />
          </BrowserRouter>
    </ProvideAuth>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
