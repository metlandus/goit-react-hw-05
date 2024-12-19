import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import axios from "axios";

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzlmMjA0ZTM0MDA1YjA3ZjdiZDhkYTE4NzAxYWEwMSIsIm5iZiI6MTczNDYxNTgwNS42NjQsInN1YiI6IjY3NjQyMmZkNTgxYTNjMDUwN2FiMTU1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H2zVA8_TxewSx4sBLnqHzOIbpyk_QuVhk32mQ5EUz0k",
    },
};

function Cast() {
    const movieId = useOutletContext();
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(function () {
        async function fetchMovieCast() {
            try {
                setLoading(true);
                const res = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
                    options
                );
                const data = await res.data.cast;
                if (data.length === 0) throw new Error("Can not find cast members");
                setCast(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchMovieCast();
    }, []);

    return (
        <>
            {loading && <p>Loading cast members</p>}
            {error && <p>{error.message}</p>}
            {cast.length > 0 && (
                <ul>
                    {cast.map((actor) => (
                        <li key={actor.id}>
                            <img
                                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                alt={`${actor.name} profile`}
                            />

                            <p>{actor.name}</p>
                            <p>Character: {actor.character}</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

export default Cast;