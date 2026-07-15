import { useEffect, useState } from "react";
import api from "../api/axios";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {

        try {

            const response = await api.get("/orders/my-orders");

            setOrders(response.data.orders);

        } catch (error) {

            toast.error("Unable to fetch orders");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchOrders();

    }, []);

    if (loading) {

        return <Loader />;

    }
    if (orders.length === 0) {

        return (

            <div className="text-center mt-20">

                <h1 className="text-3xl font-bold">

                    No Orders Yet

                </h1>

            </div>

        );

    }
    return (

        <div className="max-w-6xl mx-auto py-10 px-5">

            <h1 className="text-4xl font-bold mb-10">

                My Orders

            </h1>

            {
                orders.map(order => (

                    <div
                        key={order._id}
                        className="bg-white shadow-lg rounded-xl p-6 mb-8"
                    >

                        <div className="flex justify-between mb-5">

                            <div>

                                <h2 className="font-bold">

                                    Order ID

                                </h2>

                                <p>{order._id}</p>

                            </div>

                            <div>

                                <h2 className="font-bold">

                                    Placed On

                                </h2>

                                <p>

                                    {new Date(order.createdAt).toLocaleDateString()}

                                </p>

                            </div>

                        </div>

                        {
                            order.products.map(item => (

                                <div
                                    key={item.product._id}
                                    className="flex justify-between border-b py-3"
                                >

                                    <div>

                                        <h3>

                                            {item.product.title}

                                        </h3>

                                        <p>

                                            Quantity : {item.quantity}

                                        </p>

                                    </div>

                                    <div>

                                        ₹{item.price * item.quantity}

                                    </div>

                                </div>

                            ))
                        }

                        <div className="flex justify-between mt-6">

                            <h2 className="text-xl font-bold">

                                Total

                            </h2>

                            <h2 className="text-xl font-bold">

                                ₹{order.totalAmount}

                            </h2>

                        </div>

                        <div className="flex justify-between mt-5">

                            <span>

                                Payment :
                                <strong>

                                    {order.paymentStatus}

                                </strong>

                            </span>

                            <span>

                                Status :
                                <strong>

                                    {order.orderStatus}

                                </strong>

                            </span>

                        </div>

                    </div>

                ))
            }

        </div>

    )
}

export default Orders;
