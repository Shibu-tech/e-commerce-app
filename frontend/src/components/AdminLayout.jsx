import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen">

            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white p-5">

                <h2 className="text-2xl font-bold mb-8">
                    Admin Panel
                </h2>

                <nav className="space-y-4">

                    <Link
                        to="/admin/dashboard"
                        className="block hover:text-blue-400"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/admin/products"
                        className="block hover:text-blue-400"
                    >
                        Products
                    </Link>

                    <Link
                        to="/admin/products/add"
                        className="block hover:text-blue-400"
                    >
                        Add Product
                    </Link>

                    <Link
                        to="/admin/orders"
                        className="block hover:text-blue-400"
                    >
                        Orders
                    </Link>

                </nav>

            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-8">
                <Outlet />
            </main>

        </div>
    );
};

export default AdminLayout;