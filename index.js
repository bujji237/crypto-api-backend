const express = require('express');
const mongoose = require('mongoose');
const Crypto = require('./models/Crypto');
const fetchData = require('./jobs/fetchData');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://bujji:bujjiprasad@cluster0.q9bqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

app.use(express.json());

// Task 2: Get cryptocurrency stats
app.get('/stats', async (req, res) => {
  const { coin } = req.query;
  try {
    const latestData = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(1);
    if (latestData.length === 0) {
      return res.status(404).json({ error: 'Coin data not found' });
    }
    const { price, marketCap, change24h } = latestData[0];
    return res.json({ price, marketCap, change24h });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching stats' });
  }
});

// Task 3: Get standard deviation for the last 100 records of a coin
app.get('/deviation', async (req, res) => {
  const { coin } = req.query;
  try {
    const data = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
    if (data.length === 0) {
      return res.status(404).json({ error: 'No records found for this coin' });
    }

    const prices = data.map((record) => record.price);
    const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
    const squaredDifferences = prices.map((price) => Math.pow(price - mean, 2));
    const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / prices.length;
    const deviation = Math.sqrt(variance);

    res.json({ deviation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error calculating deviation' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  fetchData();  // Initial data fetch on server start
});
