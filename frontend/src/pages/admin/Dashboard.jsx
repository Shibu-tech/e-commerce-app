import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

const Dashboard = () => {
    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        revenue: 0,
        users: 0
    });

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const [productsRes, ordersRes] = await Promise.all([
                api.get("/products"),
                api.get("/orders"),
            ]);

            const products = productsRes.data.products || [];
            const orders = ordersRes.data.orders || [];

            const revenue = orders.reduce(
                (sum, order) => sum + order.totalAmount,
                0
            );

            setStats({
                products: products.length,
                orders: orders.length,
                revenue,
                users: 0 // We'll replace this once a users endpoint exists
            });
        } catch (error) {
            toast.error("Failed to load dashboard");
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold mb-8">
                Dashboard
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-gray-500">Products</h2>
                    <p className="text-3xl font-bold">
                        {stats.products}
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-gray-500">Orders</h2>
                    <p className="text-3xl font-bold">
                        {stats.orders}
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-gray-500">Revenue</h2>
                    <p className="text-3xl font-bold">
                        ₹{stats.revenue}
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-gray-500">Users</h2>
                    <p className="text-3xl font-bold">
                        {stats.users}
                    </p>
                </div>

            </div>
        </>
    );
};

export default Dashboard;