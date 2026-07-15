import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get("/products");
            setProducts(response.data.products);
        } catch (error) {
            toast.error("Failed to fetch products");
        }
    };

    const deleteProduct = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/products/${id}`);

            toast.success("Product deleted");

            fetchProducts();

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Delete failed"
            );
        }
    };

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Products
                </h1>

                <Link
                    to="/admin/products/add"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Product
                </Link>
            </div>

            <input
                type="text"
                placeholder="Search products..."
                className="border rounded p-2 w-full mb-6"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <table className="w-full border-collapse border">

                <thead>

                    <tr className="bg-gray-200">

                        <th className="border p-3">Image</th>

                        <th className="border p-3">Title</th>

                        <th className="border p-3">Price</th>

                        <th className="border p-3">Stock</th>

                        <th className="border p-3">Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {filteredProducts.map((product) => (

                        <tr key={product._id}>

                            <td className="border p-2">

                                <img
                                    src={product.image || "https://via.placeholder.com/80"}
                                    alt={product.title}
                                    className="w-16 h-16 object-cover rounded"
                                />

                            </td>

                            <td className="border p-2">

                                {product.title}

                            </td>

                            <td className="border p-2">

                                ₹{product.price}

                            </td>

                            <td className="border p-2">

                                {product.stock}

                            </td>

                            <td className="border p-2 space-x-2">

                                <Link
                                    to={`/admin/products/edit/${product._id}`}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </Link>

                                <button
                                    onClick={() => deleteProduct(product._id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default AdminProducts;