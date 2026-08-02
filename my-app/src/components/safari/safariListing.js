import { useDispatch, useSelector } from "react-redux";
import { getSafaris } from "../../actions/safariAction";
import { toast } from "react-toastify";
import Loader from "../layouts/loader";
import MetaData from "../layouts/MetaData";
import { Fragment, useEffect } from "react";
import Safari from "../safari/safari";
import { FaBinoculars, FaMapMarkedAlt, FaSafari } from "react-icons/fa";

export default function SafariListing() {
    const dispatch = useDispatch();

    const { safaris = [], loading, error } = useSelector(
        (state) => state.safarisState
    );

    useEffect(() => {
        dispatch(getSafaris());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "bottom-center"
            });
        }
    }, [error]);

    if (loading) return <Loader />;

    return (
        <Fragment>
            <MetaData title="Trending Safaris" />

            <main className="safari-listing-page">
                <div className="container">
                    <section className="safari-listing-intro">
                        <div>
                            <span>
                                <FaBinoculars />
                                Wildlife experiences
                            </span>

                            <h1>Discover Sri Lanka’s wild side.</h1>

                            <p>
                                Find unforgettable safari adventures and get closer
                                to nature.
                            </p>
                        </div>

                        <div className="safari-listing-count">
                            <FaSafari />
                            <strong>{safaris.length}</strong>
                            <small>Safaris available</small>
                        </div>
                    </section>

                    <section className="safari-listing-content">
                        <div className="safari-listing-heading">
                            <div>
                                <span>
                                    <FaMapMarkedAlt />
                                    Explore now
                                </span>
                                <h2>Trending Safaris</h2>
                            </div>

                            <p>
                                Choose the wildlife adventure that suits you best.
                            </p>
                        </div>

                        {safaris.length > 0 ? (
                            <div className="row g-4">
                                {safaris.map((safari) => (
                                    <Safari
                                        col={3}
                                        key={safari._id}
                                        safari={safari}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="safari-listing-empty">
                                <FaSafari />
                                <h3>No safaris available right now</h3>
                                <p>Please check back soon for new adventures.</p>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </Fragment>
    );
}