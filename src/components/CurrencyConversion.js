import React, { useEffect, useState } from "react";
import "./CurrencyConversion.css";
import axios from "axios";
import currencies from "../currencies.json";
const CurrencyConverter = () => {
  const [sourceCurrency, setSourceCurrency] = useState("INR");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [showDownload, setshowDownload] = useState(false);
  const [histroyId, sethistroyId] = useState("");
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
        sethistroyId(result.data.result.id);
        setshowDownload(true);
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
          id: histroyId,
        },
      });

      if (result.data.status) {
        console.log("Res data", result);
        let bufferData = result.data.result.data;
        console.log(bufferData, "bufferData");
        const byteArray = new Uint8Array(bufferData);
        const blob = new Blob([byteArray], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      } else {
      }
      console.log(result, "result");
    } catch (error) {
      throw error.message;
    }
  };

  const handleDownloadImage = async (is_gray_scale = 0) => {
    try {
      console.log("Download Image");

      let result = await axios.get(
        `${apiUrl}/generateCurrencyConversionImage`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          params: {
            id: histroyId,
            is_gray_scale: is_gray_scale,
          },
        }
      );

      if (result.data.status) {
        console.log("Res data", result);
        let bufferData;
        let byteArray;
        if (is_gray_scale) {
          bufferData = result.data.result.data;
          console.log(bufferData, "bufferData");
          byteArray = new Uint8Array(bufferData);
        } else {
          bufferData = result.data.result.data || result.data.result;
          byteArray = Object.values(bufferData);
          console.log(byteArray, "byteArray");
        }

        const uint8Array = new Uint8Array(byteArray);

        const blob = new Blob([uint8Array], { type: "image/png" });
        console.log(blob, "blob");
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      } else {
      }
      console.log(result, "result");
    } catch (error) {
      throw error.message;
    }
  };

  const showDownloadButton = () => {
    if (showDownload) {
      return (
        <>
          <button onClick={handleDownloadPDF} className="download-button">
            Download PDF
          </button>
          <button
            onClick={() => handleDownloadImage()}
            className="download-button"
          >
            Download Image
          </button>
          <button
            onClick={() => handleDownloadImage(1)}
            className="download-button"
          >
            Download Gray Scale Image
          </button>
        </>
      );
    }
  };

  useEffect(() => {
    sethistroyId("");
    setConvertedAmount("");
    setshowDownload(false);
  }, [sourceCurrency, targetCurrency, amount]);
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
      </form>
      <div className="button-container">{showDownloadButton()}</div>
    </div>
  );
};

export default CurrencyConverter;
