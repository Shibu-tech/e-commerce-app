import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

const AdminOrders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const response = await api.get("/orders");

            setOrders(response.data.orders);

        } catch (error) {

            toast.error("Failed to fetch orders");

        }

    };

    const updateStatus = async (orderId, orderStatus) => {

        try {

            await api.put(`/orders/${orderId}`, {
                orderStatus
            });

            toast.success("Order updated");

            fetchOrders();

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Update failed"
            );

        }

    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-8">
                Manage Orders
            </h1>

            <table className="w-full border">

                <thead className="bg-gray-200">

                    <tr>

                        <th className="border p-3">Customer</th>

                        <th className="border p-3">Amount</th>

                        <th className="border p-3">Payment</th>

                        <th className="border p-3">Status</th>

                        <th className="border p-3">Products</th>

                    </tr>

                </thead>

                <tbody>

                    {orders.map((order) => (

                        <tr key={order._id}>

                            <td className="border p-3">
                                <div>
                                    <strong>{order.user.name}</strong>
                                    <br />
                                    <small>{order.user.email}</small>
                                </div>
                            </td>

                            <td className="border p-3">
                                ₹{order.totalAmount}
                            </td>

                            <td className="border p-3">
                                {order.paymentStatus}
                            </td>

                            <td className="border p-3">

                                <select
                                    value={order.orderStatus}
                                    onChange={(e) =>
                                        updateStatus(
                                            order._id,
                                            e.target.value
                                        )
                                    }
                                    className="border rounded p-2"
                                >

                                    <option value="Pending">
                                        Pending
                                    </option>

                                    <option value="Confirmed">
                                        Confirmed
                                    </option>

                                    <option value="Shipped">
                                        Shipped
                                    </option>

                                    <option value="Delivered">
                                        Delivered
                                    </option>

                                    <option value="Cancelled">
                                        Cancelled
                                    </option>

                                </select>

                            </td>

                            <td className="border p-3">

                                {order.products.map((item) => (

                                    <div key={item._id}>

                                        {item.product?.title || "Product Deleted"}

                                        {" × "}

                                        {item.quantity}

                                    </div>

                                ))}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default AdminOrders;