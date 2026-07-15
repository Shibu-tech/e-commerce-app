import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";
import Loader from "../components/Loader";

const CheckOut = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [cart, setCart] = useState(null);

    const [shippingAddress, setShippingAddress] = useState("");
    const fetchCart = async () => {

        try {

            const response = await api.get("/cart");

            setCart(response.data);

        } catch (error) {

            toast.error("Unable to fetch cart");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchCart();

    }, []);
    const placeOrder = async () => {

        if (!shippingAddress.trim()) {
            return toast.error("Please enter your shipping address");
        }

        try {

            const response = await api.post("/orders/checkout", {
                shippingAddress
            });

            toast.success(response.data.message);

            navigate("/orders");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Order failed"
            );

        }

    };
    if (loading) {

        return <Loader />;

    }
    if (!cart || cart.totalItems === 0) {

        return (

            <div className="text-center mt-20">

                <h1 className="text-3xl font-bold">

                    Cart is Empty

                </h1>

            </div>

        );

    }
    return (

        <div className="max-w-6xl mx-auto py-10 px-5">

            <h1 className="text-4xl font-bold mb-8">

                Checkout

            </h1>

            <div className="grid md:grid-cols-2 gap-10">

                <div>

                    <h2 className="text-2xl font-semibold mb-4">

                        Shipping Address

                    </h2>

                    <textarea
                        rows="8"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Enter your complete address..."
                        className="w-full border rounded-lg p-4"
                    />

                </div>

                <div>

                    <h2 className="text-2xl font-semibold mb-4">

                        Order Summary

                    </h2>

                    {
                        cart.cart.products.map(item => (

                            <div
                                key={item.product._id}
                                className="flex justify-between border-b py-3"
                            >

                                <span>

                                    {item.product.title} × {item.quantity}

                                </span>

                                <span>

                                    ₹{item.product.price * item.quantity}

                                </span>

                            </div>

                        ))
                    }

                    <div className="flex justify-between mt-6 text-2xl font-bold">

                        <span>Total</span>

                        <span>

                            ₹{cart.totalAmount}

                        </span>

                    </div>

                    <button
                        onClick={placeOrder}
                        className="mt-8 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                    >

                        Place Order

                    </button>

                </div>

            </div>

        </div>

    )
}

export default CheckOut;