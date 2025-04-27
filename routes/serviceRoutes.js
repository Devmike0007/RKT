const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const auth = require('../middlewares/auth');

router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);
router.post('/', auth.authenticate, auth.authorize('admin'), serviceController.createService);
router.put('/:id', auth.authenticate, auth.authorize('admin'), serviceController.updateService);
router.delete('/:id', auth.authenticate, auth.authorize('admin'), serviceController.deleteService);

module.exports = router;