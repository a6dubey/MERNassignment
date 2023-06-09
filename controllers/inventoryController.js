const Inventory = require('../models/inventory');

exports.addInventory = async (req, res) => {
    try {
      const { category, subcategory, productName, mrp, sp, qty, images } = req.body;
    //   const sellerId = req.user._id; // Assuming the seller's ID is available in req.user._id
  
      // Create a new inventory item
      const inventoryItem = new Inventory({
        category,
        subcategory,
        productName,
        mrp,
        sp,
        qty,
        images,
      });
  
      // Save the inventory item to the database
      await inventoryItem.save();
  
      res.status(201).json({ message: 'Inventory item added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

exports.searchInventory = async (req, res) => {
    try {
      const { keyword } = req.query;
  
      let searchResults;
  
      if (keyword) {
        // Search for inventory items based on the provided keyword
        searchResults = await Inventory.find({
          productName: { $regex: keyword, $options: 'i' },
        });
      } else {
        // Fetch all inventory items
        searchResults = await Inventory.find();
      }
  
      if (searchResults.length === 0) {
        return res.status(200).json({ message: 'No Products Found' });
      }
  
      res.status(200).json(searchResults);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
