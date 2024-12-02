import AuthMiddleware from "./components/AuthMiddleware";
import Login from "./components/Login";
import CurrencyConversion from "./components/CurrencyConversion";
import CurrencyConversionHistory from "./components/CurrencyConversionHistory";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="content">
        <div>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/currency-conversion"
                element={
                  <AuthMiddleware>
                    <CurrencyConversion />
                  </AuthMiddleware>
                }
              />
              <Route
                path="/currency-conversion-history"
                element={
                  <AuthMiddleware>
                    <CurrencyConversionHistory />
                  </AuthMiddleware>
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
