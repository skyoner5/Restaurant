import express from 'express';
import dotenv from 'dotenv';
import { paymentMiddleware } from '@x402/express';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// CONFIGURATION
const RESTAURANT_WALLET = process.env.SOLANA_WALLET; 
const STATS_FACILITATOR = "https://stats-solana.openfacilitator.com"; // Resource 1

app.use(express.json());

// X402 GATEWAY
app.use(paymentMiddleware(
  RESTAURANT_WALLET,
  {
    "/api/unlock-menu": {
      price: "0.05 SOL", // Price based on SolanaXLikes20 (Resource 2)
      network: "solana:mainnet",
      description: "Priority Access to Solana Bistro Secret Menu",
      facilitator: STATS_FACILITATOR
    }
  }
));

// PROTECTED RESOURCE
app.get('/api/unlock-menu', (req, res) => {
  res.json({
    success: true,
    secret_dish: "Golden Truffle Risotto",
    discount_code: "X402_BISTRO_2024",
    message: "Data retrieved via Wurk SolanaXLikes20 integration."
  });
});

app.listen(PORT, () => console.log(`Restaurant Server live on ${PORT}`));
