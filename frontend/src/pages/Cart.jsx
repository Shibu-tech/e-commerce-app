import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Cart = () => {
    // console.log(api.defaults.baseURL);
    // const response = await api.get("/cart");
    const navigate = useNavigate();

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchCart = async () => {

        try {

            const response = await api.get("/cart");

            setCart(response.data);

        } catch (error) {

            toast.error("Failed to fetch cart");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchCart();

    }, []);

    const updateQuantity = async (productId, quantity) => {

        if (quantity < 1) return;

        try {

            await api.put("/cart/update", {
                productId,
                quantity
            });

            fetchCart();

        } catch (error) {

            toast.error(error.response?.data?.message);

        }

    };
    const removeItem = async (productId) => {

        try {

            await api.delete(`/cart/remove/${productId}`);

            toast.success("Item removed");

            fetchCart();

        } catch (error) {

            toast.error(error.response?.data?.message);

        }

    };
    if (loading) {

        return <Loader />;

    }
    if (!cart || cart.totalItems === 0) {

        return (

            <div className="text-center mt-20">

                <h1 className="text-3xl font-bold">

                    Your Cart is Empty

                </h1>

            </div>

        );

    }
    return (

        <div className="max-w-6xl mx-auto py-10">

            <h1 className="text-4xl font-bold mb-10">

                Shopping Cart

            </h1>

            {
                cart.cart.products.map(item => (

                    <div
                        key={item.product._id}
                        className="flex justify-between items-center border-b py-6"
                    >

                        <div className="flex gap-5">

                            <img
                                src={item.product.image || "https://via.placeholder.com/120"}
                                alt={item.product.title}
                                className="w-28 h-28 rounded-lg object-cover"
                            />

                            <div>

                                <h2 className="text-xl font-bold">

                                    {item.product.title}

                                </h2>

                                <p>

                                    ₹{item.product.price}

                                </p>

                            </div>

                        </div>

                        <div className="flex items-center gap-4">

                            <button
                                onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                className="bg-gray-200 px-3 py-1 rounded"
                            >

                                -

                            </button>

                            <span>

                                {item.quantity}

                            </span>

                            <button
                                onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                className="bg-gray-200 px-3 py-1 rounded"
                            >

                                +

                            </button>

                        </div>

                        <button
                            onClick={() => removeItem(item.product._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >

                            Remove

                        </button>

                    </div>

                ))
            }

            <div className="flex justify-between mt-10">

                <h2 className="text-2xl font-bold">

                    Total: ₹{cart.totalAmount}

                </h2>

                <button
                    onClick={() => navigate("/checkout")}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
                >

                    Proceed To Checkout

                </button>

            </div>

        </div>

    )
}

export default Cart;