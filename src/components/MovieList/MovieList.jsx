import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          <Link
            to={{ pathname: `/movies/${movie.id}`, state: { from: location } }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Замініть `posterUrl` на правильне поле з даними
              alt={movie.title}
              className={styles.image}
            />
            <h3 className={styles.title}>{movie.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
