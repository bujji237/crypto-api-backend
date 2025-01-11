const axios = require('axios');
const Crypto = require('../models/Crypto');
const schedule = require('node-schedule');

const COINS = ['bitcoin', 'matic-network', 'ethereum'];
const API_URL = 'https://api.coingecko.com/api/v3/coins/';

async function fetchData() {
  try {
    for (const coin of COINS) {
      const response = await axios.get(`${API_URL}${coin}`);
      const data = response.data;

      const cryptoData = new Crypto({
        coin: coin,
        price: data.market_data.current_price.usd,
        marketCap: data.market_data.market_cap.usd,
        change24h: data.market_data.price_change_percentage_24h,
      });

      await cryptoData.save();
      console.log(`Data for ${coin} saved.`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Run fetchData every 2 hours
schedule.scheduleJob('0 */2 * * *', fetchData);
module.exports = fetchData;
