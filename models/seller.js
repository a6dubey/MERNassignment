const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const sellerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
      },
    email: {
    type: String,
    required: true,
    unique: true
  },
  businessName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Hash the password before saving
sellerSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password during sign-in
sellerSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = mongoose.model('Seller', sellerSchema);

