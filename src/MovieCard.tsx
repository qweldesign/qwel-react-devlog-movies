import { Link } from 'react-router';

type Movie = {
  id: string;
  title: string;
  poster_path: string;
};

type Props = {
  movie: Movie;
};

const MovieCard = (props: Props) => {
  const { movie } = props;

  return (
    <Link className="flex-1/5 mb-12" to={`/${movie.id}`} key={movie.id}>
      <img
        src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
        alt={movie.title}
      />
      <h3 className="my-3 text-xl text-center">{movie.title}</h3>
    </Link>
  );
};

export default MovieCard;
