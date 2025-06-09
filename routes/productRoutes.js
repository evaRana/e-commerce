const express = require('express');
const router = express.Router();
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public Routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Admin Protected Routes
// router.post('/', protect, adminOnly, createProduct);
// router.put('/:id', protect, adminOnly, updateProduct);
// router.delete('/:id', protect, adminOnly, deleteProduct);

router.post('/', protect, adminOnly, upload.single('image'), createProduct);
router.put('/:id', protect, adminOnly, upload.single('image'), updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;
