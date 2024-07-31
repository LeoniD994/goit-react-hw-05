import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2FhNGExNDcwNTg5YjFiN2EyZGY4MzViYTI2ZGYxNSIsIm5iZiI6MTcyMjE3NTk2Ni4xNzk2ODMsInN1YiI6IjY2YTBiOGQ0NTU3ZDEyMmU4NTE4YzA2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h0wGEpqItklOCphTrXJY8XDiK_wzQh_Z_xbjr24YlMc";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const query = searchParams.get("query") || "";

  const Loader = () => <div>Loading...</div>;

  useEffect(() => {
    if (query && API_KEY) {
      setIsLoading(true);
      axios
        .get(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        })
        .then((response) => setMovies(response.data.results))
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const queryValue = form.elements.query.value;
    setSearchParams({ query: queryValue });
  };

  return (
    <div className={styles.moviesPage}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          name="query"
          className={styles.searchInput}
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
      {isLoading ? <Loader /> : <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
