import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          ShopEase
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">

          <Link to="/" className="hover:text-gray-200">
            Home
          </Link>

          <Link to="/products" className="hover:text-gray-200">
            Products
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-2 hover:text-gray-200"
          >
            <FaShoppingCart />
            Cart
          </Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="hover:text-gray-200"
                >
                  Dashboard
                </Link>
              )}

              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-gray-200"
              >
                <FaUserCircle />
                {user.name}
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200">
                Login
              </Link>

              <Link
                to="/register"
                className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition"
              >
                Register
              </Link>
              <Link
                to="/orders"
                className="hover:text-gray-200"
              >
                My Orders
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;