import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Header from './views/Header';
import Footer from './views/Footer';
import League from './components/League';

Promise.all([
  fetch('/api/trade-values').then(response => response.json()),
  fetch('/api/adp').then(response => response.json()),
  fetch('/api/league').then(response => response.json())
]).then((results) => {
  console.log(results)

  const tradeValues = results[0].data;
  const adp = results[1].data;
  const leagueData = results[2].data;

  const data = new League(leagueData, tradeValues)

  console.log(tradeValues)
  console.log(adp)
  console.log(data)

  return {
    tradeValues,
    adp,
    data
  }

}).then(data => {

  console.log(data)
  console.log(data.playerValues)
  console.log(data.adp)
  console.log(data.rosterData)

  ReactDOM.render(
    <React.StrictMode>
      <Header league={data.playerValues} />
      <App league={data.playerValues} />
      <Footer />
    </React.StrictMode>,
    document.getElementById('root')
  );

  // return Promise.resolve()
})



// fetch('/api/rosters')
//   .then((response) => {
//       // console.log(response)

//       // if (response.status !== 200) {
//       //     throw Error(body.message)
//       // } else {
//       return response.json();
//       // }
//   })
//   .then((data) => {
//     return fetch('/api/adp')
//       .then(response => {
//         return response.json();
//       })
//       .then(adp =>)
//   })
//   .then((body) => {

//       ReactDOM.render(
//         <React.StrictMode>
//           <Header league={body.league} />
//           <App league={body.league} />
//           <Footer />
//         </React.StrictMode>,
//         document.getElementById('root')
//       );
      
//       // If you want to start measuring performance in your app, pass a function
//       // to log results (for example: reportWebVitals(console.log))
//       // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//       reportWebVitals();
      
//       return Promise.resolve()
//   });