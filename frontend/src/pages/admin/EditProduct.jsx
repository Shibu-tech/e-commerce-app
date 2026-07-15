import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";

const EditProduct = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: ""
    });

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await api.get(`/products/${id}`);

            setFormData({
                title: response.data.product.title,
                description: response.data.product.description,
                price: response.data.product.price,
                category: response.data.product.category,
                stock: response.data.product.stock,
                image: response.data.product.image
            });

        } catch (error) {
            toast.error("Failed to fetch product");
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            await api.put(`/products/${id}`, formData);

            toast.success("Product updated successfully");

            navigate("/admin/products");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Update failed"
            );

        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">

            <h1 className="text-3xl font-bold mb-8">
                Edit Product
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                >
                    <option value="">Select Category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mobiles">Mobiles</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Books">Books</option>
                    <option value="Home">Home</option>
                </select>

                <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                    required
                />

                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full border p-3 rounded-lg"
                />

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                >
                    Update Product
                </button>

            </form>

        </div>
    );
};

export default EditProduct;