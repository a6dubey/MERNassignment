const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const MONGO_URI = process.env.MONGO_URI; // Retrieve the MongoDB URI from the environment variables
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const sellerRoutes = require('./routes/sellerRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

// API routes
app.use('/api/sellers', sellerRoutes);
app.use('/api/inventory', inventoryRoutes);
