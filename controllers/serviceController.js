const { Service } = require('../models');
const upload = require('../utils/upload');

exports.getAllServices = async (req, res) => {
  try {
    const { type } = req.query;
    const where = {};
    
    if (type) {
      where.type = type;
    }

    const services = await Service.findAll({ where });
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createService = async (req, res) => {
  try {
    await upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { name, description, type, pricePerHour, pricePerDay } = req.body;
      const imageUrl = req.file ? `/public/uploads/${req.file.filename}` : null;

      const service = await Service.create({
        name,
        description,
        type,
        imageUrl,
        pricePerHour,
        pricePerDay
      });

      res.status(201).json(service);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    await upload.single('image')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { name, description, type, pricePerHour, pricePerDay, available } = req.body;
      
      if (req.file) {
        service.imageUrl = `/public/uploads/${req.file.filename}`;
      }

      service.name = name || service.name;
      service.description = description || service.description;
      service.type = type || service.type;
      service.pricePerHour = pricePerHour || service.pricePerHour;
      service.pricePerDay = pricePerDay || service.pricePerDay;
      service.available = available !== undefined ? available : service.available;

      await service.save();
      res.json(service);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    await service.destroy();
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};