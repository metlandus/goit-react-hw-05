import axios from "axios";
import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation/Navigation";
import MovieList from "../../components/MovieList/MovieList";

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzlmMjA0ZTM0MDA1YjA3ZjdiZDhkYTE4NzAxYWEwMSIsIm5iZiI6MTczNDYxNTgwNS42NjQsInN1YiI6IjY3NjQyMmZkNTgxYTNjMDUwN2FiMTU1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H2zVA8_TxewSx4sBLnqHzOIbpyk_QuVhk32mQ5EUz0k",
    },
};

const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

function HomePage() {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    async function fetchTrendMovies() {
        try {
            setIsLoading(true);
            const res = await axios.get(url, options);
            const data = res.data.results;
            setTrendingMovies(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(function () {
        fetchTrendMovies();
    }, []);

    return (
        <>
            <Navigation />
            <h1>Trend Movies</h1>
            {isLoading && <p>Loading</p>}
            {error && <p>{error.message}</p>}
            {trendingMovies && <MovieList movies={trendingMovies} />}
        </>
    );
}

export default HomePage;