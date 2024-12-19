import { useState, useEffect, useRef } from "react";
import { useParams, Link, NavLink, Outlet, useLocation } from "react-router";
import axios from "axios";

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzlmMjA0ZTM0MDA1YjA3ZjdiZDhkYTE4NzAxYWEwMSIsIm5iZiI6MTczNDYxNTgwNS42NjQsInN1YiI6IjY3NjQyMmZkNTgxYTNjMDUwN2FiMTU1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H2zVA8_TxewSx4sBLnqHzOIbpyk_QuVhk32mQ5EUz0k",
    },
};

function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const location = useLocation();
    const backLinkRef = useRef(location.state?.from ?? "/movies");

    useEffect(
        function () {
            async function fetchMovieDetails() {
                try {
                    setLoading(true);
                    const res = await axios.get(
                        `https://api.themoviedb.org/3/movie/${movieId}`,
                        options
                    );
                    const data = await res.data;
                    setMovieDetails(data);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            }

            fetchMovieDetails();
        },
        [movieId]
    );

    return (
        <>
            <Link to={backLinkRef.current}>Go back</Link>
            {loading && <p>Loading</p>}
            {error && <p>{error}</p>}
            {movieDetails && (
                <div>
                    <img
                        src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`}
                        alt={`${movieDetails.title} poster`}
                    />
                    <div>
                        <h2>{movieDetails.title}</h2>
                        <p>Score: {movieDetails.vote_average.toFixed(2)}</p>
                        <h3>Overview</h3>
                        <p>{movieDetails.overview}</p>
                        <h3>Genres</h3>
                        <p>{movieDetails.genres.map((g) => g.name + ", ")}</p>
                        <nav>
                            <NavLink to="cast">Cast</NavLink>
                            <NavLink to="reviews">Reviews</NavLink>
                        </nav>
                    </div>
                </div>
            )}
            <Outlet context={movieId} />
        </>
    );
}

export default MovieDetailsPage;