import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

const Products = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {

            const response = await api.get("/products");

            setProducts(response.data.products);

        } catch (error) {

            toast.error("Failed to fetch products");

        } finally {

            setLoading(false);

        }
    };

    const addToCart = async (productId) => {

        try {

            await api.post("/cart", {
                productId,
                quantity: 1
            });

            toast.success("Product added to cart");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to add product"
            );

        }

    };

    if (loading) {
        return (
            <div className="text-center mt-20 text-2xl">
                Loading Products...
            </div>
        );
    }

    return (

        <div className="max-w-7xl mx-auto px-6 py-10">

            <h1 className="text-4xl font-bold mb-8 text-center">
                Our Products
            </h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                {products.map((product) => (

                    <div
                        key={product._id}
                        className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300"
                    >

                        <img
                            src={
                                product.image ||
                                "https://via.placeholder.com/300"
                            }
                            alt={product.title}
                            className="w-full h-60 object-cover rounded-t-xl"
                        />

                        <div className="p-5">

                            <h2 className="text-xl font-semibold">
                                {product.title}
                            </h2>

                            <p className="text-gray-500 mt-2 line-clamp-2">
                                {product.description}
                            </p>

                            <div className="flex justify-between items-center mt-4">

                                <span className="text-2xl font-bold text-blue-600">
                                    ₹{product.price}
                                </span>

                                <span
                                    className={`font-medium ${
                                        product.stock > 0
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {product.stock > 0
                                        ? `${product.stock} left`
                                        : "Out of Stock"}
                                </span>

                            </div>

                            <div className="flex gap-2 mt-6">

                                <Link
                                    to={`/products/${product._id}`}
                                    className="flex-1 text-center bg-gray-800 text-white py-2 rounded hover:bg-gray-900"
                                >
                                    View
                                </Link>

                                <button
                                    onClick={() => addToCart(product._id)}
                                    disabled={product.stock === 0}
                                    className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                                >
                                    Add to Cart
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

};

export default Products;