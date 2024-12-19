import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzlmMjA0ZTM0MDA1YjA3ZjdiZDhkYTE4NzAxYWEwMSIsIm5iZiI6MTczNDYxNTgwNS42NjQsInN1YiI6IjY3NjQyMmZkNTgxYTNjMDUwN2FiMTU1MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H2zVA8_TxewSx4sBLnqHzOIbpyk_QuVhk32mQ5EUz0k",
    },
};

function Reviews() {
    const movieId = useOutletContext();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(function () {
        async function fetchReviews() {
            try {
                setLoading(true);
                const res = await axios.get(
                    `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
                    options
                );
                const data = await res.data;
                if (data.length === 0) throw new Error("Can not find any review");
                setReviews(data.results);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchReviews();
    }, []);

    return (
        <>
            {loading && <p>Loading reviews...</p>}
            {error && <p>{error.message}</p>}
            {reviews.length > 0 && (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            <h2>Author: {review.author}</h2>
                            <p>{review.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}

export default Reviews;