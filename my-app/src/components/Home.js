import { Fragment, useEffect, useState } from "react";
import Tour from "./tour/tour";
import { useDispatch, useSelector } from "react-redux";
import { getTours } from "../actions/tourAction";
import { toast } from "react-toastify";
import MetaData from "./layouts/MetaData";
import Pagination from "react-js-pagination";
import Loader from "./layouts/loader";
import { Link } from "react-router-dom";
import ChatWidget from "./ChatWidget";
import {
    FaArrowDown,
    FaArrowRight,
    FaCompass,
    FaMapMarkedAlt,
    FaStar
} from "react-icons/fa";

export default function Home() {
    const dispatch = useDispatch();

    const { tours, toursCount, resPerPage, loading, error } = useSelector(
        (state) => state.toursState
    );

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getTours(null, null, null, null, currentPage));
    }, [dispatch, currentPage]);

    useEffect(() => {
        if (error) {
            toast.error(error, { position: "bottom-center" });
        }
    }, [error]);

    if (loading) return <Loader />;

    return (
        <Fragment>
            <MetaData title="Trekport" />

            <main className="tour-home-v2">
                <div className="container">
                    <section className="tour-home-v2-banner">
                        <div className="tour-home-v2-banner-content">
                            <span className="tour-home-v2-tag">
                                <FaCompass />
                                Explore Sri Lanka
                            </span>

                            <h1>Find a journey you will remember.</h1>

                            <p>
                                Discover handpicked tours, destinations and experiences
                                for your next adventure.
                            </p>

                            <a href="#trending-tours" className="tour-home-v2-banner-link">
                                Explore Tours
                            </a>
                        </div>

                        <div className="tour-home-v2-banner-side">
                            <div>
                                <FaMapMarkedAlt />
                                <strong>{toursCount || 0}+</strong>
                                <span>experiences to explore</span>
                            </div>
                        </div>
                    </section>

                    <section className="tour-home-v2-catalogue">
                        <div className="tour-home-v2-heading">
                            <div>
                                <span className="tour-home-v2-small-title">
                                    <FaStar />
                                    Most popular
                                </span>
                                <h2>Trending Tours</h2>
                                <p>Explore our most loved travel experiences.</p>
                            </div>
                        </div>

                        {tours?.length > 0 ? (
                            <div className="row g-4">
                                {tours.map((tour) => (
                                    <Tour col={4} key={tour._id} tour={tour} />
                                ))}
                            </div>
                        ) : (
                            <div className="tour-home-v2-empty">
                                <FaMapMarkedAlt />
                                <h3>No tours available right now</h3>
                                <p>Please check back soon.</p>
                            </div>
                        )}

                        {toursCount > resPerPage && (
                            <div className="tour-home-v2-pagination">
                                <Pagination
                                    activePage={currentPage}
                                    onChange={setCurrentPage}
                                    totalItemsCount={toursCount}
                                    itemsCountPerPage={resPerPage}
                                    nextPageText="Next"
                                    prevPageText="Previous"
                                    firstPageText="First"
                                    lastPageText="Last"
                                    itemClass="page-item"
                                    linkClass="page-link"
                                />
                            </div>
                        )}
                    </section>

                    <section className="tour-home-v2-safari-card">
                        <div>
                            <span>Into the wild</span>
                            <h2>Experience Sri Lanka’s wildlife safaris.</h2>
                        </div>

                        <Link to="/safaris">
                            View Safaris
                            <FaArrowRight />
                        </Link>
                    </section>
                </div>
            </main>

            <ChatWidget />
        </Fragment>
    );
}