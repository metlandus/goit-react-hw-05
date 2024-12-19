import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import axios from "axios";
import MovieList from "../Components/MovieList";
import Navigation from "../Components/Navigation";

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzlmMjA0ZTM0MDA1YjA3ZjdiZDhkYTE4NzAxYWEwMSIsIm5iZiI6MTczNDYxNTgwNS42NjQsInN1YiI6IjY3NjQyMmZkNTgxYTNjMDUwN2FiMTU1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H2zVA8_TxewSx4sBLnqHzOIbpyk_QuVhk32mQ5EUz0k",
    },
};

function MoviesPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const inputRef = useRef(null);
    const query = searchParams.get("query") || "";

    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}`;

    async function fetchMoviesByQuery() {
        try {
            setIsLoading(true);
            const res = await axios.get(url, options);
            const data = res.data.results;
            setMovies(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    function handleSearch(e) {
        e.preventDefault();
        setSearchParams({ query: inputRef.current.value });
    }

    useEffect(
        function () {
            fetchMoviesByQuery();
        },
        [searchParams]
    );

    return (
        <>
            <Navigation />
            <form onSubmit={(e) => handleSearch(e)}>
                <input type="text" ref={inputRef} />
                <button>Search</button>
            </form>

            {isLoading && <p>Loading</p>}
            {error && <p>{error}</p>}
            {movies.length > 0 && <MovieList movies={movies} />}
        </>
    );
}

export default MoviesPage;