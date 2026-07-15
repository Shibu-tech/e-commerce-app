const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        let cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            cart = await Cart.create({
                user: req.user.id,
                products: []
            });
        }

        const itemIndex = cart.products.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex > -1) {
            cart.products[itemIndex].quantity += quantity || 1;
        } else {
            cart.products.push({
                product: productId,
                quantity: quantity
            });
        }

        await cart.save();

        res.status(201).json({
            success: true,
            message: "Product added to cart",
            cart
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.getCart = async (req, res) => {
    try {

        const cart = await Cart.findOne({
            user: req.user.id
        }).populate("products.product");

        if (!cart) {
            return res.status(200).json({
                success: true,
                totalItems: 0,
                totalAmount: 0,
                cart: {
                    products: []
                }
            });
        }

        let totalAmount = 0;

        cart.products.forEach(item => {
            totalAmount += item.product.price * item.quantity;
        });

        return res.status(200).json({
            success: true,
            totalItems: cart.products.length,
            totalAmount,
            cart
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


exports.updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || quantity < 1) {
            res.status(400).json({
                success: false,
                message: "Valid product Id and quantity are required"
            });
        }

        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const item = cart.products.find(
            item => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        item.quantity = quantity;
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.removeCartItem = async (req, res) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.products = cart.products.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product removed from cart",
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

exports.clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.products = [];
        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
            cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}