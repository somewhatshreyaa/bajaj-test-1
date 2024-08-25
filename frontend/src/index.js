import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // virtual dom create hota h and then we compare that with the main dom and make the changes accordingly
root.render( 
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


