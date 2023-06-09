// authController.js
const jwt = require('jsonwebtoken');

const Seller = require('../models/seller');

exports.signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the seller by email
      const seller = await Seller.findOne({ email });
      if (!seller) {
        return res.status(404).json({ message: 'Seller not found' });
      }
  
      // Compare the password
      const isPasswordValid = await seller.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
  
      // Generate JWT token for authentication
      const token = jwt.sign({ sellerId: seller._id }, 'your-secret-key');
  
      res.status(200).json({ message: 'Seller signed in successfully', token });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
      console.log(error)
    }
  };

exports.signOut = async (req, res) => {
  // Clear the JWT token from client-side storage
  res.clearCookie('token');

  res.status(200).json({ message: 'Signed out successfully' });
};
