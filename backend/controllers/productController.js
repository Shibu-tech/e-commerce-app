const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            category,
            stock,
            image,
            rating,
            createdBy
        } = req.body;

        if (!title || !description || !price || !category) {
            res.status(401).json({
                success: false,
                message: "Provide all the field values"
            });
        }

        const product = await Product.create({
            title,
            description,
            price,
            category,
            stock,
            image,
            rating,
            createdBy: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getProducts = async (req, res) => {
    try {
        const {
            keyword, category, sort, page = 1, limit = 10
        } = req.query;

        const query = {};

        if (keyword) {
            query.title = {
                $regex: keyword,
                $options: "i"
            }
        }

        if (category) {
            query.category = category;
        }

        let productsQuery = Product.find(query);

        if (sort === "price_asc") {
            productsQuery = productsQuery.sort({ price: 1 });
        } else if (sort === "price_desc") {
            productsQuery = productsQuery.sort({ price: -1 });
        } else {
            productsQuery = productsQuery.sort({ createdAt: -1 });
        }

        const skip = (page - 1) * limit;

        productsQuery = productsQuery
            .skip(skip)
            .limit(Number(limit));

        const products = await productsQuery;
        const totalProducts = await Product.countDocuments(query);

        res.status(201).json({
            success: true,
            totalProducts,
            currentPage: Number(page),
            totalPages: Math.ceil(totalProducts / limit),
            products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(401).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(201).json({
            success: true,
            product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(401).json({
                success: false,
                message: "Product not found"
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(201).json({
            success: true,
            message: "Product updated",
            updatedProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(401).json({
                success: false,
                message: "Product not found"
            });
        }

        await product.deleteOne();

        res.status(201).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }

}