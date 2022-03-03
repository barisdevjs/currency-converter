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
  cname
} = props;


  return (
    <div className={cname}>
        <h2>I have {name}</h2>
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