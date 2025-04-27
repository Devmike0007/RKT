const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/auth');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', auth.authenticate, auth.authorize('admin'), productController.createProduct);
router.put('/:id', auth.authenticate, auth.authorize('admin'), productController.updateProduct);
router.delete('/:id', auth.authenticate, auth.authorize('admin'), productController.deleteProduct);

module.exports = router;