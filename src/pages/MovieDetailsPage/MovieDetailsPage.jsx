import { useParams, useNavigate, Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
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
    };

    fetchMovie();
  }, [movieId]);
  const handleGoBack = () => {
    navigate(location?.state?.from ?? "/");
  };
  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.movieDetails}>
      <button className={styles.backButton} onClick={handleGoBack}>
        GoBack
      </button>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <div className={styles.movieLinks}>
        <Link to={`cast`}>Cast</Link>
        <Link to={`reviews`}>Reviews</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
