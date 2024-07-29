import { useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: {
            query,
            include_adult: false,
            language: "en-US",
            page: 1,
          },
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2FhNGExNDcwNTg5YjFiN2EyZGY4MzViYTI2ZGYxNSIsIm5iZiI6MTcyMjE3NTk2Ni4xNzk2ODMsInN1YiI6IjY2YTBiOGQ0NTU3ZDEyMmU4NTE4YzA2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h0wGEpqItklOCphTrXJY8XDiK_wzQh_Z_xbjr24YlMc",
          },
        }
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error searching for movies:", error);
    }
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
