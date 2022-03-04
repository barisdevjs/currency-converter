import './App.css';
import React, { useEffect, useState } from 'react';
import CurrencyRow from './CurrencyRow';
import { Temporal, toTemporalInstant } from '@js-temporal/polyfill';
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
  const [fromCurrency, setFromCurrency] = useState('STN');
  const [toCurrency, setToCurrency] = useState('BMD');
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();
  const [nameFrom, setNameFrom] = useState('');
  const [nameTo, setNameTo] = useState('');
  const [ [headerFrom, headerTo], setHeader ] = useState(['US Dollar', 'Euro']);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = Number(amount).toFixed(4);
    toAmount = Number(amount * exchangeRate).toFixed(4);
  } else {
    toAmount = Number(amount).toFixed(4);
    fromAmount = Number(amount / exchangeRate).toFixed(4);
  }

  function convertName(str) {
    return str.slice(0,2)
  }
  // get the available currencies 

console.log( typeof amount )

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
        console.log(data)
        setCurrencyOptions(Object.keys(data.currencies));
        setFromCurrency(Object.keys(data.currencies)[0]);
        setToCurrency(Object.keys(data.currencies)[13]);
        setNameFrom(fromCurrency);
        setNameTo(toCurrency);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    console.table({
      'fromCurrency': fromCurrency,
      'toCurrency': toCurrency,
      'nameFrom': nameFrom,
      'nameTo': nameTo
    }
  )

  useEffect(() => {
    if (fromCurrency !== null && toCurrency !== null) {
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
          setHeader([data.base_currency_name, data.rates[toCurrency].currency_name]);
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
          name={headerFrom}
          image = {`https://countryflagsapi.com/png/${convertName(fromCurrency)}`}
          verb='have'
          />
        <CurrencyRow cname='two'
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onCurrencyChange={e => setToCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount={handleToAmountChange}
          name={headerTo} 
          image = {`https://countryflagsapi.com/png/${convertName(toCurrency)}`}
          verb='Want'
          />
      </main>
    </div>
    </>
  );
}
export default App;
