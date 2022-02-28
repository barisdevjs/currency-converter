import React from 'react'

const CurrencyRow = (props) => {

const {
  currencyOptions,
  selectedCurrency,
  onCurrencyChange,
} = props;


  return (
    <div className={props.cname}>
        <input type="number" />
        <select value={selectedCurrency} onChange={onCurrencyChange}>
          {currencyOptions.map((item, idx) => {
            return <option value={item} key={idx}>{item}</option>
          })}
        </select>
    </div>
  )
}

export default CurrencyRow