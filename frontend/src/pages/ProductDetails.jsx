import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const ProductDetails = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {

        fetchProduct();

    }, []);

    const fetchProduct = async () => {

        try {

            const response = await api.get(`/products/${id}`);

            setProduct(response.data.product);

        }

        catch (error) {

            toast.error("Failed to fetch product");

        }

        finally {

            setLoading(false);

        }

    }
    const addToCart = async () => {

        try {

            await api.post("/cart/add", {

                productId: id,

                quantity

            });

            toast.success("Added to cart");

        }

        catch (error) {

            toast.error(error.response?.data?.message);

        }

    };
    if (loading) {

        return <Loader />

    }
    return (

        <div className="max-w-6xl mx-auto p-10">

            <div className="grid md:grid-cols-2 gap-10">

                <img
                    src={product.image || "https://via.placeholder.com/500"}
                    alt={product.title}
                    className="rounded-xl shadow-lg w-full h-125 object-cover"
                />

                <div>

                    <h1 className="text-4xl font-bold">

                        {product.title}

                    </h1>

                    <p className="text-gray-500 mt-3">

                        Category : {product.category}

                    </p>

                    <p className="text-3xl text-blue-600 font-bold mt-5">

                        ₹{product.price}

                    </p>

                    <p className="mt-5 text-gray-700">

                        {product.description}

                    </p>

                    <p className="mt-5">

                        Stock : {product.stock}

                    </p>

                    <div className="flex items-center gap-5 mt-8">

                        <button

                            className="bg-gray-200 px-4 py-2 rounded"

                            onClick={() => {

                                if (quantity > 1) {

                                    setQuantity(quantity - 1)

                                }

                            }}

                        >

                            -

                        </button>

                        <span className="text-xl">

                            {quantity}

                        </span>

                        <button

                            className="bg-gray-200 px-4 py-2 rounded"

                            onClick={() => {
                                if (quantity < product.stock) {
                                    setQuantity(quantity + 1);
                                }
                            }}
                        >

                            +

                        </button>

                    </div>

                    <button

                        onClick={addToCart}
                        disabled={product.stock === 0}
                        className={`mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg ${product.stock === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}

                    >

                        Add To Cart

                    </button>

                </div>

            </div>

        </div >

    )

}

export default ProductDetails;

