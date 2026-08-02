import { useEffect } from "react";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAdminTours } from "../../actions/tourAction";
import { getAdminSafaris } from "../../actions/safariAction";
import { getUsers } from "../../actions/userActions";
import { adminBookings as adminOrderAction } from "../../actions/orderAction";
import { adminBookings as adminSafariOrderAction } from "../../actions/safariOrderAction";
import { Link } from "react-router-dom";
import {
    FaUsers,
    FaSafari,
    FaTicketAlt,
    FaWallet,
    FaGlobeAsia,
    FaCalendarCheck,
    FaArrowRight,
    FaCompass
} from "react-icons/fa";

export default function Dashboard() {
    const { tours = [] } = useSelector((state) => state.toursState);
    const { safaris = [] } = useSelector((state) => state.safarisState);
    const { adminOrder = [] } = useSelector((state) => state.orderState);
    const { adminSafariOrder = [] } = useSelector((state) => state.safariOrderState);
    const { users = [] } = useSelector((state) => state.userState);
    const dispatch = useDispatch();

    let totalAmount = 0;
    if (adminOrder.length > 0) {
        adminOrder.forEach((order) => {
            totalAmount += Number(order.totalAmount);
        });
    }

    let totalSafariAmount = 0;
    if (adminSafariOrder.length > 0) {
        adminSafariOrder.forEach((order) => {
            totalSafariAmount += Number(order.totalAmount);
        });
    }

    const amount = totalSafariAmount + totalAmount;
    const totalBookings = adminOrder.length + adminSafariOrder.length;
    const totalExperiences = tours.length + safaris.length;

    useEffect(() => {
        dispatch(getAdminTours);
        dispatch(getAdminSafaris);
        dispatch(getUsers);
        dispatch(adminOrderAction);
        dispatch(adminSafariOrderAction);
    }, []);

    const stats = [
        {
            title: "Total Tours",
            value: tours.length,
            description: "Available travel packages",
            icon: <FaGlobeAsia />,
            variant: "blue",
            link: "/admin/tours"
        },
        {
            title: "Total Safaris",
            value: safaris.length,
            description: "Wildlife experiences",
            icon: <FaSafari />,
            variant: "green",
            link: "/admin/safaris"
        },
        {
            title: "Tour Bookings",
            value: adminOrder.length,
            description: "Tour reservations received",
            icon: <FaTicketAlt />,
            variant: "purple",
            link: "/admin/orders"
        },
        {
            title: "Safari Bookings",
            value: adminSafariOrder.length,
            description: "Safari reservations received",
            icon: <FaCalendarCheck />,
            variant: "orange",
            link: "/admin/safariOrders"
        },
        {
            title: "Total Revenue",
            value: `Rs. ${amount.toFixed(2)}`,
            description: "Earnings from all bookings",
            icon: <FaWallet />,
            variant: "gold",
            isRevenue: true
        },
        {
            title: "Total Users",
            value: users.length,
            description: "Registered platform users",
            icon: <FaUsers />,
            variant: "rose",
            link: "/admin/users"
        }
    ];

    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    return (
        <div className="container-fluid dashboard-page">
            <div className="row g-0">
                <aside className="col-12 col-md-2 dashboard-sidebar">
                    <Sidebar />
                </aside>

                <main className="col-12 col-md-10 dashboard-content">
                    <section className="dashboard-header">
                        <div>
                            <span className="dashboard-eyebrow">
                                <FaCompass />
                                Admin workspace
                            </span>

                            <h1>Dashboard Overview</h1>

                            <p>
                                Monitor your tours, safaris, bookings and platform activity
                                from one place.
                            </p>
                        </div>

                        <div className="dashboard-date">
                            <FaCalendarCheck />
                            <div>
                                <span>Today</span>
                                <strong>{currentDate}</strong>
                            </div>
                        </div>
                    </section>

                    <section className="dashboard-section">
                        <div className="section-heading">
                            <div>
                                <h2>Platform statistics</h2>
                                <p>A quick summary of your latest activity.</p>
                            </div>
                        </div>

                        <div className="row g-4">
                            {stats.map((stat) => (
                                <div
                                    key={stat.title}
                                    className="col-12 col-md-6 col-xl-4"
                                >
                                    <article
                                        className={`dashboard-card dashboard-card--${stat.variant}`}
                                    >
                                        <div className="dashboard-card-top">
                                            <div>
                                                <p className="dashboard-card-label">
                                                    {stat.title}
                                                </p>
                                                <h3 className="dashboard-card-value">
                                                    {stat.value}
                                                </h3>
                                            </div>

                                            <div className="stat-icon-wrapper">
                                                {stat.icon}
                                            </div>
                                        </div>

                                        <p className="dashboard-card-description">
                                            {stat.description}
                                        </p>

                                        {stat.link ? (
                                            <Link
                                                to={stat.link}
                                                className="btn-dashboard-view"
                                            >
                                                View details
                                                <FaArrowRight />
                                            </Link>
                                        ) : (
                                            <div className="revenue-footer">
                                                <FaWallet />
                                                Revenue overview
                                            </div>
                                        )}
                                    </article>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="management-panel">
                        <div className="management-panel-heading">
                            <div>
                                <span className="dashboard-eyebrow dashboard-eyebrow--dark">
                                    Quick actions
                                </span>
                                <h2>Manage your platform</h2>
                                <p>Open the area you want to manage.</p>
                            </div>
                        </div>

                        <div className="row g-3">
                            <div className="col-12 col-md-4">
                                <Link to="/admin/tours" className="quick-action">
                                    <span className="quick-action-icon quick-action-icon--blue">
                                        <FaGlobeAsia />
                                    </span>
                                    <span>
                                        <strong>Manage tours</strong>
                                        <small>Create and update tour packages</small>
                                    </span>
                                    <FaArrowRight className="quick-action-arrow" />
                                </Link>
                            </div>

                            <div className="col-12 col-md-4">
                                <Link to="/admin/safaris" className="quick-action">
                                    <span className="quick-action-icon quick-action-icon--green">
                                        <FaSafari />
                                    </span>
                                    <span>
                                        <strong>Manage safaris</strong>
                                        <small>Update wildlife experiences</small>
                                    </span>
                                    <FaArrowRight className="quick-action-arrow" />
                                </Link>
                            </div>

                            <div className="col-12 col-md-4">
                                <Link to="/admin/users" className="quick-action">
                                    <span className="quick-action-icon quick-action-icon--rose">
                                        <FaUsers />
                                    </span>
                                    <span>
                                        <strong>Manage users</strong>
                                        <small>View registered user accounts</small>
                                    </span>
                                    <FaArrowRight className="quick-action-arrow" />
                                </Link>
                            </div>
                        </div>

                        <div className="dashboard-mini-summary">
                            <span>
                                <strong>{totalExperiences}</strong> travel experiences available
                            </span>
                            <span className="mini-summary-divider" />
                            <span>
                                <strong>{totalBookings}</strong> total bookings received
                            </span>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}