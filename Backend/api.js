const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5173;

app.use(express.json());
app.use(cors());

// Proxy endpoint to fetch data from external API
app.get('/api/auction', async (req, res) => {
  try {
    const response = await axios.get('http://uptime-auction-api.azurewebsites.net/api/Auction');
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching auction data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to submit offer
app.post('/api/offers', (req, res) => {
  const { auctionId, productId, offerAmount } = req.body;
  // Process the offer and store it in the database
  // For simplicity, we'll just send back a success response
  res.json({ success: true });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
