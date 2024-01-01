import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [sourceCrypto, setSourceCrypto] = useState('');
  const [amount, setAmount] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('usd');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the list of cryptocurrencies
    axios.get('https://crypto-currency-convertor.onrender.com/cryptocurrencies')
      .then((response) => {
        setCryptocurrencies(response.data);
        setSourceCrypto(response.data[0]?.id || ''); // Ensure a default value is set
      })
      .catch((error) => console.error(error));

    // Fetch the list of supported currencies
    axios.get('https://crypto-currency-convertor.onrender.com/currencies')
      .then((response) => {
        setCurrencies(response.data);
        setTargetCurrency(response.data[0] || 'usd'); // Ensure a default value is set
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = () => {
    if (!sourceCrypto || !amount || isNaN(amount) || amount <= 0) {
      setError('Invalid input. Please check your values.');
      return;
    }

    setError('');

    // Perform currency conversion
    axios.post('https://crypto-currency-convertor.onrender.com/convert', { sourceCrypto, amount, targetCurrency })
      .then((response) => setConvertedAmount(response.data.convertedAmount))
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-gray-200 p-8 rounded shadow-2xl ring-gray-700 w-96">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Currency Converter</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Source Cryptocurrency:</label>
            <select
              value={sourceCrypto}
              onChange={(e) => setSourceCrypto(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              {cryptocurrencies.map((crypto) => (
                <option key={crypto.id} value={crypto.id}>
                  {crypto.name} ({crypto.symbol})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Target Currency:</label>
            <select
              value={targetCurrency}
              onChange={(e) => setTargetCurrency(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Convert
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {convertedAmount !== null && (
          <div className="mt-4">
            <h2 className="text-xl font-bold text-gray-800">Converted Amount:</h2>
            <p className="text-gray-800">{convertedAmount} {targetCurrency.toUpperCase()}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
