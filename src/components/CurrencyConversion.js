import React, { useState } from "react";
import "./CurrencyConversion.css";
import axios from "axios";
import currencies from "../currencies.json";
const CurrencyConverter = () => {
  const [sourceCurrency, setSourceCurrency] = useState("INR");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const apiUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:1000/api"
      : "https://blaze-backend-34wl.onrender.com/api";

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let result = await axios.get(`${apiUrl}/convertCurrency`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        params: {
          source_currency: sourceCurrency,
          target_currency: targetCurrency,
          amount: amount,
        },
      });

      if (result.data.status) {
        setConvertedAmount(result.data.result.converted_amount);
      } else {
      }
      console.log(result, "result");
    } catch (error) {
      throw error.message;
    }
  };

  const handleDownloadPDF = async () => {
    try {
        console.log("Download PDF");
        
      let result = await axios.get(`${apiUrl}/generateCurrencyConversionPdf`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        params: {
          source_currency: sourceCurrency,
          target_currency: targetCurrency,
          amount: amount,
        },
      });

      if (result.data.status) {
        console.log("Res data", result);
        let bufferData = result.data.result.data;
        console.log(bufferData, "bufferData");
        const byteArray = new Uint8Array(bufferData);
        const blob = new Blob([byteArray], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      } else {
      }
      console.log(result, "result");
    } catch (error) {
      throw error.message;
    }
  };

  return (
    <div className="converter-container">
      <h1>Currency Converter</h1>
      <form onSubmit={handleSubmit} className="converter-form">
        <div className="form-group">
          <label htmlFor="sourceCurrency">Source Currency:</label>
          <select
            id="sourceCurrency"
            value={sourceCurrency}
            onChange={(e) => setSourceCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option
                key={currency.currency_code}
                value={currency.currency_code}
              >
                {currency.currency_code}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="targetCurrency">Target Currency:</label>
          <select
            id="targetCurrency"
            value={targetCurrency}
            onChange={(e) => setTargetCurrency(e.target.value)}
          >
            {currencies.map((currency) => (
              <option
                key={currency.currency_code}
                value={currency.currency_code}
              >
                {currency.currency_code}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <div className="form-group">
          <label htmlFor="convertedAmount">Converted Amount:</label>
          <input
            type="text"
            id="convertedAmount"
            value={convertedAmount}
            readOnly
            placeholder="Converted amount"
          />
        </div>

        <button type="submit" className="convert-button">
          Convert
        </button>
        <button onClick={ handleDownloadPDF} className="download-button">
          Download PDF
        </button>
      </form>
       
    </div>
  );
};

export default CurrencyConverter;
