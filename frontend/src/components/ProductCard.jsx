import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

      <img
        src={product.image || "https://via.placeholder.com/300"}
        alt={product.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-bold">
          {product.title}
        </h2>

        <p className="text-gray-500 mt-2">
          {product.category}
        </p>

        <h3 className="text-blue-600 text-2xl font-bold mt-4">
          ₹{product.price}
        </h3>

        <Link
          to={`/products/${product._id}`}
          className="block text-center mt-5 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          View Details
        </Link>

      </div>

    </div>
  );
};

export default ProductCard;