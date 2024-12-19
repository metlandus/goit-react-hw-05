import { Route, Routes } from "react-router";
import HomePage from "./Pages/HomePage";
import MoviesPage from "./Pages/MoviesPage";
import NotFoundPage from "./Pages/NotFoundPage";
import MovieDetailsPage from "./Pages/MovieDetailsPage";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
                <Route path="cast" element={<MovieCast />} />
                <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;