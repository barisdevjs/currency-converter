import './App.css';
import React, { useEffect, useState } from 'react';
import CurrencyRow from './CurrencyRow';
import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';
// eslint-disable-next-line no-extend-native
Date.prototype.toTemporalInstant = toTemporalInstant;




function App() {

  const api = {
    key: `${process.env.REACT_APP_API_KEY}`,
    base: 'https://currency-converter5.p.rapidapi.com/currency/historical/',
    available: 'https://currency-converter5.p.rapidapi.com/currency/list'
  }

  let today = Temporal.Now.plainDateISO()
  


  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();
  const [flags, setFlags] = useState({ from: false, to: false });

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  const getFlagEmoji = countryCode=>String.fromCodePoint(...[...countryCode.toUpperCase()].map(x=>0x1f1a5+x.charCodeAt(0)))



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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`${api.base}${today}?from=${fromCurrency}&amount=${amount}&format=json&to=${toCurrency}`, {
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
          setExchangeRate(data.rates[toCurrency].rate);
          setFlags({from:getFlagEmoji(data.base_currency_code.slice(0,2)),to:getFlagEmoji(data.base_currency_code.slice(0,2))});
        })
        .catch(err => {
          console.error(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCurrency, toCurrency]);


  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }


  return (
    <><div className='app'>
      <h1>Money Converter</h1>
      <main>
        <CurrencyRow cname='one'
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onCurrencyChange={e => setFromCurrency(e.target.value)}
          amount={fromAmount}
          onChangeAmount={handleFromAmountChange}
          />
        <img src={`https://countryflagsapi.com/png/${fromCurrency.toLowerCase().slice(0,2)}`} alt=""/>
        <div className='equals'> ==  &gt; </div>
        <CurrencyRow cname='two'
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onCurrencyChange={e => setToCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount={handleToAmountChange} />
      </main>
    </div>
    </>
  );
}
export default App;
