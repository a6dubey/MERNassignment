const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Seller = require('../models/seller');

exports.signup = async (req, res) => {
  try {
    const {name, email, businessName, password } = req.body;
console.log(req.body)
    // Check if the email is already registered
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    // Create a new seller
    const newSeller = new Seller({ name,email, businessName, password });
    await newSeller.save();

    // Generate JWT token for authentication
    const token = jwt.sign({ sellerId: newSeller._id }, 'your-secret-key');

    res.status(201).json({ message: 'Seller registered successfully', name });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

