# Crypto Currency Converter

![Crypto Currency Converter](https://github.com/adityaS011/Crypto-Currency-Convertor/blob/main/frontend/public/ss.png)

A simple and elegant web application for converting cryptocurrencies to different currencies. This project consists of a backend server built with Express.js and a frontend application developed using React and Vite.

## Features

- View the top 100 cryptocurrencies along with their symbols.
- Perform real-time currency conversion between cryptocurrencies and supported currencies.
- Choose your source cryptocurrency, enter the amount, select the target currency, and get the converted amount instantly.
- User-friendly interface with input validation and error handling.

## Live Demo

- **Frontend:** [Crypto Currency Converter](https://cryptocurrency-to-currency.netlify.app/)
- **Backend:** [Crypto Currency Converter API](https://crypto-currency-convertor.onrender.com)

## Technologies Used

- **Backend:**
  - Express.js for building the server
  - Axios for making API requests
  - CORS for handling Cross-Origin Resource Sharing

- **Frontend:**
  - React for building the user interface
  - Vite as the build tool
  - Axios for making API requests
  - Tailwind CSS for styling

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/adityaS011/Crypto-Currency-Convertor.git

2. Change Directory:

   ```bash
   cd Crypto-Currency-Convertor
   
2. Install Dependencies:

   ```bash
   # Install backend dependencies
    cd backend
    npm install
    
    # Install frontend dependencies
    cd ../frontend
    npm install

2. Run:

   ```bash
    # Start the backend server
    cd ../backend
    npm start
    
    # Start the frontend application
    cd ../frontend
    npm run dev
  
# Acknowledgments
Thanks to Coingecko API for providing cryptocurrency data.
Thanks to ExchangeRate-API for providing exchange rate data.
