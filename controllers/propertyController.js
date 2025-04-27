const { Property } = require('../models');
const upload = require('../utils/upload');

exports.getAllProperties = async (req, res) => {
  try {
    const { type, location } = req.query;
    const where = {};
    
    if (type) {
      where.type = type;
    }
    if (location) {
      where.location = location;
    }

    const properties = await Property.findAll({ where });
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createProperty = async (req, res) => {
  try {
    await upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { 
        title, 
        description, 
        type, 
        location, 
        price, 
        bedrooms, 
        bathrooms, 
        area 
      } = req.body;
      
      const imageUrl = req.file ? `/public/uploads/${req.file.filename}` : null;

      const property = await Property.create({
        title,
        description,
        type,
        location,
        price,
        bedrooms,
        bathrooms,
        area,
        imageUrl
      });

      res.status(201).json(property);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    await upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { 
        title, 
        description, 
        type, 
        location, 
        price, 
        bedrooms, 
        bathrooms, 
        area,
        available 
      } = req.body;
      
      if (req.file) {
        property.imageUrl = `/public/uploads/${req.file.filename}`;
      }

      property.title = title || property.title;
      property.description = description || property.description;
      property.type = type || property.type;
      property.location = location || property.location;
      property.price = price || property.price;
      property.bedrooms = bedrooms || property.bedrooms;
      property.bathrooms = bathrooms || property.bathrooms;
      property.area = area || property.area;
      property.available = available !== undefined ? available : property.available;

      await property.save();
      res.json(property);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByPk(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    await property.destroy();
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};