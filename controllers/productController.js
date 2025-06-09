const Product = require('../models/product');

// @desc    Create a new product (Admin only)

exports.createProduct = async (req, res) => {
    try {
        console.log('req.user:', req.user);  // Check if user is present
        const { name, description, price, stock } = req.body;
        const image = `/uploads/${req.file.filename}`;
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const product = new Product({
            name,
            description,
            price,
            stock,
            image,
            createdBy: req.user._id
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create product', error: error.message });
    }
};


// @desc    Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error: error.message });
    }
};

// @desc    Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('createdBy', 'name email role');
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch product', error: error.message });
    }
};

// @desc    Update product (Admin only)
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const { name, description, price, image, stock } = req.body;

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.image = image || product.image;
        product.stock = stock !== undefined ? stock : product.stock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update product', error: error.message });
    }
};

// @desc    Delete product (Admin only)
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }
};
