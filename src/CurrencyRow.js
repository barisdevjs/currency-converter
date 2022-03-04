import React from 'react'

const CurrencyRow = (props) => {

const {
  currencyOptions,
  selectedCurrency,
  onCurrencyChange,
  onChangeAmount, 
  amount,
  name,
  image,
  verb,
  cname
} = props;

  return (
    <div className={cname}>
        <h2>I {verb} {name}s</h2>
        <input type="number" value={amount} onChange={onChangeAmount} />
        <select value={selectedCurrency} onChange={onCurrencyChange}>
          {currencyOptions.map((item, idx) => {
            return <option value={item} key={idx}>{item}</option>
          })}
        </select>
        <img src={image} alt=""/>
    </div>
  )
}

export default CurrencyRow