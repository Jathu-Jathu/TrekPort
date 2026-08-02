import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    FaTachometerAlt,
    FaMapMarkedAlt,
    FaSafari,
    FaCalendarCheck,
    FaUsers,
    FaStar,
    FaChevronDown,
    FaGlobeAsia,
    FaPlus
} from "react-icons/fa";

export default function Sidebar() {
    const [openMenu, setOpenMenu] = useState("");

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? "" : menu);
    };

    const menuClass = (isActive) =>
        `sidebar-link ${isActive ? "sidebar-link--active" : ""}`;

    return (
        <div className="sidebar-wrapper">
            <aside id="sidebar">
                <div className="sidebar-brand">
                    <div className="sidebar-brand-icon">
                        <FaMapMarkedAlt />
                    </div>

                    <div>
                        <span>TrekPort</span>
                        <small>Admin Panel</small>
                    </div>
                </div>

              {/* //<div className="sidebar-menu-label">Main menu</div> */}

                <nav className="sidebar-nav">
                    <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) => menuClass(isActive)}
                    >
                        <FaTachometerAlt />
                        <span>Dashboard</span>
                    </NavLink>

                    <div className={`sidebar-group ${openMenu === "tours" ? "is-open" : ""}`}>
                        <button
                            type="button"
                            className="sidebar-link sidebar-dropdown-toggle"
                            onClick={() => toggleMenu("tours")}
                        >
                            <span className="sidebar-link-start">
                                <FaMapMarkedAlt />
                                <span>Tours</span>
                            </span>
                            <FaChevronDown className="sidebar-chevron" />
                        </button>

                        <div className="sidebar-submenu">
                            <NavLink to="/admin/tours">
                                <FaGlobeAsia />
                                All Tours
                            </NavLink>
                            <NavLink to="/admin/tours/create">
                                <FaPlus />
                                Create Tour
                            </NavLink>
                        </div>
                    </div>

                    <div className={`sidebar-group ${openMenu === "safaris" ? "is-open" : ""}`}>
                        <button
                            type="button"
                            className="sidebar-link sidebar-dropdown-toggle"
                            onClick={() => toggleMenu("safaris")}
                        >
                            <span className="sidebar-link-start">
                                <FaSafari />
                                <span>Safaris</span>
                            </span>
                            <FaChevronDown className="sidebar-chevron" />
                        </button>

                        <div className="sidebar-submenu">
                            <NavLink to="/admin/safaris">
                                <FaGlobeAsia />
                                All Safaris
                            </NavLink>
                            <NavLink to="/admin/safaris/create">
                                <FaPlus />
                                Create Safari
                            </NavLink>
                        </div>
                    </div>

                    <div className={`sidebar-group ${openMenu === "bookings" ? "is-open" : ""}`}>
                        <button
                            type="button"
                            className="sidebar-link sidebar-dropdown-toggle"
                            onClick={() => toggleMenu("bookings")}
                        >
                            <span className="sidebar-link-start">
                                <FaCalendarCheck />
                                <span>Bookings</span>
                            </span>
                            <FaChevronDown className="sidebar-chevron" />
                        </button>

                        <div className="sidebar-submenu">
                            <NavLink to="/admin/orders">
                                <FaMapMarkedAlt />
                                Tour Bookings
                            </NavLink>
                            <NavLink to="/admin/safariOrders">
                                <FaSafari />
                                Safari Bookings
                            </NavLink>
                        </div>
                    </div>

                    <NavLink
                        to="/admin/users"
                        className={({ isActive }) => menuClass(isActive)}
                    >
                        <FaUsers />
                        <span>Users</span>
                    </NavLink>

                    <div className={`sidebar-group ${openMenu === "reviews" ? "is-open" : ""}`}>
                        <button
                            type="button"
                            className="sidebar-link sidebar-dropdown-toggle"
                            onClick={() => toggleMenu("reviews")}
                        >
                            <span className="sidebar-link-start">
                                <FaStar />
                                <span>Reviews</span>
                            </span>
                            <FaChevronDown className="sidebar-chevron" />
                        </button>

                        <div className="sidebar-submenu">
                            <NavLink to="/admin/reviews">
                                <FaStar />
                                Tour Reviews
                            </NavLink>
                            <NavLink to="/admin/safariReviews">
                                <FaStar />
                                Safari Reviews
                            </NavLink>
                        </div>
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <span className="sidebar-status-dot" />
                    System online
                </div>
            </aside>
        </div>
    );
}