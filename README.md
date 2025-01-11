# Crypto API Backend

This is the backend for a cryptocurrency data API built using Node.js, Express, MongoDB, and integrated with the CoinGecko API to fetch real-time data for popular cryptocurrencies like Bitcoin, Matic, and Ethereum.

## Features

- Fetches cryptocurrency data (price, market cap, and 24h change) for Bitcoin, Matic, and Ethereum every 2 hours.
- Provides an API to fetch the latest stats for a specific coin.
- Implements an API to calculate the standard deviation of the price for the last 100 records of a specific cryptocurrency.

## Technologies Used

- Node.js
- Express
- MongoDB
- CoinGecko API
- Axios
- Node-schedule

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/bujji237/crypto-api-backend.git
   
2. Install dependencies:<br>
cd crypto-api-backend<br>
npm install


3. Create a .env file with the following variables:<br>
MONGODB_URI=your-mongodb-connection-string<br>
PORT=3000

4. Run the application:<br>
npm start


API Endpoints
1. /stats<br>
Query Parameters:
coin (string): The name of the cryptocurrency (e.g., bitcoin, matic-network, ethereum).
Sample Response:
{<br>
  "price": 40000,<br>
  "marketCap": 800000000,<br>
  "24hChange": 3.4<br>
}
2. /deviation<br>
Query Parameters:
coin (string): The name of the cryptocurrency (e.g., bitcoin, matic-network, ethereum).
Sample Response:
{<br>
  "deviation": 4082.48<br>
}
