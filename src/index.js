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
  const tradeValues = results[0].data;
  const adp = results[1].data;
  const leagueData = results[2].data;
  const league = new League(leagueData, tradeValues, adp);

  return {
    league
  };

}).then(data => {
  ReactDOM.render(
    <React.StrictMode>
      <Header league={data.league} />
      <App league={data.league} />
      <Footer />
    </React.StrictMode>,
    document.getElementById('root')
  );
})