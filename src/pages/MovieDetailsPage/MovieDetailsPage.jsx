import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const prevLocation = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2FhNGExNDcwNTg5YjFiN2EyZGY4MzViYTI2ZGYxNSIsIm5iZiI6MTcyMjE3NTk2Ni4xNzk2ODMsInN1YiI6IjY2YTBiOGQ0NTU3ZDEyMmU4NTE4YzA2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h0wGEpqItklOCphTrXJY8XDiK_wzQh_Z_xbjr24YlMc",
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <Link to={prevLocation.current} className={styles.backButton}>
        Go back
      </Link>
      <div className={styles.movieDetails}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.info}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Rating: {movie.vote_average}</p>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <Link to={`cast`} className={styles.link}>
          Cast
        </Link>
        <Link to={`reviews`} className={styles.link}>
          Reviews
        </Link>
      </div>
      <Outlet />
    </div>
  );
};
export default MovieDetailsPage;
