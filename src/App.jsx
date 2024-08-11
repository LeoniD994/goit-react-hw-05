import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styles from './App.module.css'

const MovieReviews = lazy(() =>
  import("./components/MovieReviews/MovieReviews")
);
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading page...</div>}>
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navLink}>
              <Link to="/">Home</Link>
            </li>
            <li className={styles.navLink}>
              <Link to="/movies">Movies</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
