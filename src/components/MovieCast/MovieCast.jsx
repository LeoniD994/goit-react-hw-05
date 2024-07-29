import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjY2FhNGExNDcwNTg5YjFiN2EyZGY4MzViYTI2ZGYxNSIsIm5iZiI6MTcyMjE3NTk2Ni4xNzk2ODMsInN1YiI6IjY2YTBiOGQ0NTU3ZDEyMmU4NTE4YzA2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h0wGEpqItklOCphTrXJY8XDiK_wzQh_Z_xbjr24YlMc",
            },
          }
        );
        setCast(response.data.cast);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCast();
  }, [movieId]);

  if (error) {
    return <p className={styles.error}>Error: {error}</p>;
  }

  return (
    <div className={styles.cast}>
      <h2>Cast</h2>
      {cast.length > 0 ? (
        <ul>
          {cast.map((actor) => (
            <li key={actor.cast_id}>
              <p>
                {actor.name} as {actor.character}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No cast information available</p>
      )}
    </div>
  );
};

export default MovieCast;
