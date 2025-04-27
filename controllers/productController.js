const { Product } = require('../models');
const upload = require('../utils/upload');

exports.getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const where = {};
    
    if (category) {
      where.category = category;
    }

    const products = await Product.findAll({ where });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  try {
    await upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { name, description, category, subcategory, location } = req.body;
      const imageUrl = req.file ? `/public/uploads/${req.file.filename}` : null;

      const product = await Product.create({
        name,
        description,
        category,
        subcategory,
        imageUrl,
        location
      });

      res.status(201).json(product);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { name, description, category, subcategory, location, available } = req.body;
      
      if (req.file) {
        product.imageUrl = `/public/uploads/${req.file.filename}`;
      }

      product.name = name || product.name;
      product.description = description || product.description;
      product.category = category || product.category;
      product.subcategory = subcategory || product.subcategory;
      product.location = location || product.location;
      product.available = available !== undefined ? available : product.available;

      await product.save();
      res.json(product);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};