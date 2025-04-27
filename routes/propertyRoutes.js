const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const auth = require('../middlewares/auth');

router.get('/', propertyController.getAllProperties);
router.get('/:id', propertyController.getPropertyById);
router.post('/', auth.authenticate, auth.authorize('admin'), propertyController.createProperty);
router.put('/:id', auth.authenticate, auth.authorize('admin'), propertyController.updateProperty);
router.delete('/:id', auth.authenticate, auth.authorize('admin'), propertyController.deleteProperty);

module.exports = router;