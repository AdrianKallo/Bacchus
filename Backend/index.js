import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { auctionsController } from './controllers/auctions.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auctions', auctionsController);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});