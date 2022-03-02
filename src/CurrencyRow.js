import React from 'react'

const CurrencyRow = (props) => {

const {
  currencyOptions,
  selectedCurrency,
  onCurrencyChange,
  onChangeAmount, 
  amount,
  cname
} = props;


  return (
    <div className={cname}>
        <input type="number" value={amount} onChange={onChangeAmount} />
        <select value={selectedCurrency} onChange={onCurrencyChange}>
          {currencyOptions.map((item, idx) => {
            return <option value={item} key={idx}>{item}</option>
          })}
        </select>
    </div>
  )
}

export default CurrencyRow