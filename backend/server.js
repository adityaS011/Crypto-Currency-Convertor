const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());


app.get('/cryptocurrencies', async (req, res) => {
  try {
   
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false,
      },
    });

    const cryptocurrencies = response.data.map((crypto) => ({
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
    }));

    res.json(cryptocurrencies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/convert', async (req, res) => {
  const { sourceCrypto, amount, targetCurrency } = req.body;

  try {
    // Use Coingecko API for real-time exchange rates
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: sourceCrypto,
        vs_currencies: targetCurrency.toLowerCase(),
      },
    });

    const exchangeRate = response.data[sourceCrypto][targetCurrency.toLowerCase()];
    const convertedAmount = amount * exchangeRate;

    res.json({ convertedAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/currencies', async (req, res) => {
  try {
    const response = await axios.get('https://open.er-api.com/v6/latest');
    const supportedCurrencies = Object.keys(response.data.rates);

    res.json(supportedCurrencies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
