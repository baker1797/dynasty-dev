import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Header from './views/Header';
import Footer from './views/Footer';
import reportWebVitals from './reportWebVitals';

fetch('/api/rosters')
  .then((response) => {
      // console.log(response)

      // if (response.status !== 200) {
      //     throw Error(body.message)
      // } else {
      return response.json();
      // }
  })
  .then((body) => {

      ReactDOM.render(
        <React.StrictMode>
          <Header league={body.league} />
          <App league={body.league} />
          <Footer />
        </React.StrictMode>,
        document.getElementById('root')
      );
      
      // If you want to start measuring performance in your app, pass a function
      // to log results (for example: reportWebVitals(console.log))
      // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
      reportWebVitals();
      
      return Promise.resolve()
  });