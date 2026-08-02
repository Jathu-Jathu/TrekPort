import Search from "./search";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Image } from "react-bootstrap";
import { logout } from "../../actions/userActions";
import { toast } from "react-toastify";
import {
    FaUser,
    FaTachometerAlt,
    FaCalendarCheck,
    FaSafari,
    FaSignOutAlt,
    FaShoppingBag
} from "react-icons/fa";

export default function Header() {
    const { isAuthenticated, user } = useSelector((state) => state.authState);
    const { items: cartItems = [] } = useSelector((state) => state.cartState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        await dispatch(logout);
        navigate("/login");

        toast("Successfully logged out!", {
            position: "top-center",
            type: "success"
        });
    };

    return (
        <nav className="navbar main-navbar">
            <div className="container-fluid header-container">
                <Link to="/" className="header-logo">
                    <img
                        src="/images/tourLogo1.png"
                        alt="TrekPort Logo"
                    />
                </Link>

                <div className="header-search">
                    <Search />
                </div>

                <div className="header-actions">
                    {isAuthenticated ? (
                        <Dropdown align="end" className="header-user-dropdown">
                            <Dropdown.Toggle
                                id="profile-dropdown"
                                className="header-profile-toggle"
                            >
                                <figure className="avatar avatar-nav avatar-circle">
                                    <Image
                                        src={user?.avatar || "/images/default_avatar.png"}
                                        alt={user?.name || "User"}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "/images/default_avatar.png";
                                        }}
                                    />
                                </figure>

                                <span className="header-user-name">
                                    {user?.name || "My Account"}
                                </span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="header-dropdown-menu">
                                {user?.role === "admin" && (
                                    <Dropdown.Item
                                        onClick={() => navigate("/admin/dashboard")}
                                    >
                                        <FaTachometerAlt />
                                        Dashboard
                                    </Dropdown.Item>
                                )}

                                <Dropdown.Item onClick={() => navigate("/myprofile")}>
                                    <FaUser />
                                    My Profile
                                </Dropdown.Item>

                                <Dropdown.Item onClick={() => navigate("/bookings")}>
                                    <FaCalendarCheck />
                                    Tour Bookings
                                </Dropdown.Item>

                                <Dropdown.Item onClick={() => navigate("/safariBookings")}>
                                    <FaSafari />
                                    Safari Bookings
                                </Dropdown.Item>

                                <Dropdown.Divider />

                                <Dropdown.Item
                                    onClick={logoutHandler}
                                    className="header-logout"
                                >
                                    <FaSignOutAlt />
                                    Log out
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <Link to="/login" className="header-login-btn">
                            Login
                        </Link>
                    )}

                    <Link to="/cart" className="header-cart">
                        <FaShoppingBag />
                        <span className="header-cart-text">Cart</span>
                        <span className="header-cart-count">
                            {cartItems.length}
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}