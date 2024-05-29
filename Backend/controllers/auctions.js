import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://uptime-auction-api.azurewebsites.net/api/Auction');
    const auctions = response.data;
    res.json(auctions);
  } catch (error) {
    console.error('Error fetching auctions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/bid', async (req, res) => {
  try {
    console.log('Received bid request:', req.body);

    // Extract necessary data from request body
    const { productId, bidTime, bid_amount, user_id } = req.body;

    // Your bid processing logic here

    // Dummy response for testing
    res.json({ message: 'Bid saved successfully' });
  } catch (error) {
    console.error('Error saving bid:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/removeBid', async (req, res) => {
  try {
    console.log('Received bid removal request:', req.body);

    // Extract necessary data from request body
    const { productId, user_id } = req.body;

    // Your bid removal logic here

    // Dummy response for testing
    res.json({ message: 'Bid removed successfully' });
  } catch (error) {
    console.error('Error removing bid:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/userAuctions', async (req, res) => {
  try {
    const { userId } = req.query;

    // Your user auctions retrieval logic here

    // Dummy response for testing
    res.json([]);
  } catch (error) {
    console.error('Error fetching user auctions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export const auctionsController = router;
