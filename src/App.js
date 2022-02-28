import './App.css';
import React, { useEffect, useState } from 'react';
import CurrencyRow from './CurrencyRow';
import Chart from './Chart';
import { Temporal, toTemporalInstant } from '@js-temporal/polyfill';
// eslint-disable-next-line no-extend-native
Date.prototype.toTemporalInstant = toTemporalInstant;


function App() {
  
  const api = {
    key: `${process.env.REACT_APP_API_KEY}`,
    base: 'https://currency-converter5.p.rapidapi.com/currency/historical/',
    available: 'https://currency-converter5.p.rapidapi.com/currency/list'
  }

  const today = Temporal.Now.plainDateISO().toString();

  const [currencyOptions, setCurrencyOptions] = useState([]); 
  console.log(currencyOptions)
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();

  // get the available currencies

  useEffect(() => {
    fetch(`${api.available}?format=json&date=${today}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
        "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setCurrencyOptions(Object.keys(data.currencies));
        setFromCurrency(Object.keys(data.currencies)[0]);
        setToCurrency(Object.keys(data.currencies)[1]);
      })
    },[api.available, today])

    useEffect(() => {
      fetch(`${api.base}${today}?from=EUR&amount=1&format=json&to=GBP`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
          "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.error(err);
        });
    }, [api.base, today]);



    return (
      <div className='app'>
        <h1>Money Converter</h1>
        <main>
          <CurrencyRow cname='one' 
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onCurrencyChange={e => setFromCurrency(e.target.value)}
          />
          <div className='equals'> ==  &gt; </div>
          <CurrencyRow cname='two' 
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onCurrencyChange={e => setToCurrency(e.target.value)}
          />
          <Chart />
        </main>
      </div>
    );
    }
export default App;
