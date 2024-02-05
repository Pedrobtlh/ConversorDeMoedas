import "./CurrencyConverter.css";

import { useState, useEffect } from "react";
import axios from "axios";

function CurrencyConverter() {
  const [rates, setRates] = useState(null);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://v6.exchangerate-api.com/v6/2533521423241228fd48a0ee/latest/USD"
      )
      .then((response) => {
        setRates(response.data.conversion_rates);
      })
      .catch((error) => {
        console.log(`Ocorreu um error:`, error);
      });
  }, []);

  return (
    <div className="converter">
      <h2>Conversor de Moedas</h2>
      <input type="number" placeholder="Digite o Valor" value={amount} />
      <span>Selecione as Moedas</span>
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        {rates &&
          Object.keys(rates).map((currency) => (
            <option value={currency} key={currency}>
              {currency}
            </option>
          ))}
      </select>
      <span>Para</span>
      <select
        value={toCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        {rates &&
          Object.keys(rates).map((currency) => (
            <option value={currency} key={currency}>
              {currency}
            </option>
          ))}
      </select>
      <h3>
        {convertedAmount} {toCurrency}
      </h3>
      <p>
        {amount} {fromCurrency} valem {convertedAmount} {toCurrency}
      </p>
    </div>
  );
}

export default CurrencyConverter;
