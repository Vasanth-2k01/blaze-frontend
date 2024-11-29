import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CurrencyConversionHistory.css";

const CurrencyConversionHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState([]);
  const apiUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:1000/api"
      : "https://blaze-backend-34wl.onrender.com/api";
  const [currencyConversionHistory, setcurrencyConversionHistory] = useState(
    {}
  );
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      let response = await axios.get(`${apiUrl}/getCurrencyConversionHistory`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        params: {
          page: currentPage,
          limit: 10,
        },
      });

      if (response.data.status) {
        console.log(response);
        setcurrencyConversionHistory(response.data.result);

        console.log(
          response.data.result.last_page,
          "response.data.result.last_page"
        );

        if (response.data.result.last_page) {
          let totalPage = [];
          for (let index = 0; index < response.data.result.last_page; index++) {
            totalPage.push(index + 1);
          }
        
          console.log(totalPage, "totalPage");
        
          setTotalPages(totalPage);
        }
        
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  },[currentPage]);

  const handleClick = (page) => {
    console.log(page, "handleClick");

    console.log(
      page,
      "handleClick",
      page >= 1, page <= totalPages.length,
      totalPages
    );
    if (page >= 1 && page <= totalPages.length) {
      setCurrentPage(page);
      console.log(currentPage, "currentPage");
    }
  };

  return (
    <div className="table-container">
      <div className="header-container">
        <h2>Currency Conversion List</h2>
        <div className="button-container">
          <button onClick={() => navigate("/currency-conversion")}>
            Check Currency Conversion
          </button>
        </div>
      </div>
      <table className="item-table">
        <thead>
          <tr>
            <th>Source Currency</th>
            <th>Target Currency</th>
            <th>Amount</th>
            <th>Conversion Amount</th>
          </tr>
        </thead>
        <tbody>
          {currencyConversionHistory &&
          currencyConversionHistory.data &&
          currencyConversionHistory.data.length ? (
            currencyConversionHistory.data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.source_currency}</td>
                  <td>{item.target_currency}</td>
                  <td>{item.amount}</td>
                  <td>{item.converted_amount}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4">No conversion history found.</td>
            </tr>
          )}
        </tbody>
      </table>
      {currencyConversionHistory &&
      currencyConversionHistory.data &&
      currencyConversionHistory.data.length ? (
        <div className="pagination">
          <button
            onClick={() => handleClick(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {totalPages > 0
            ? totalPages.map((number) => (
                <button
                  key={number}
                  onClick={() => handleClick(number)}
                  className={number === currentPage ? "active" : ""}
                >
                  {number}
                </button>
              ))
            : ""}
          <button
            onClick={() => handleClick(currentPage + 1)}
            disabled={currentPage === totalPages.length}
          >
            Next
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CurrencyConversionHistory;
