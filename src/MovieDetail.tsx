import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

type Movie = {
  id: string;
  original_title: string;
  poster_path: string;
  overview: string;
  year: number;
  rating: number;
  runtime: number;
  score: number;
};

function MovieDetail() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { movieId } = useParams();

  const fetchMovieDetail = async () => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=ja&page=1&append_to_response=credits`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    const data = await response.json();
    setMovie({
      id: data.id,
      original_title: data.title,
      poster_path: data.poster_path,
      year: Number(data.release_date.split("-")[0]),
      rating: data.vote_average,
      runtime: data.runtime,
      score: data.vote_count,
      overview: data.overview
    });
  };

  useEffect(() => {
    fetchMovieDetail();
  }, []);

  return (
    <>
      {movie && (
        <div className="flex flex-wrap items-center w-4xl min-h-screen mx-auto">
          <div className="basis-1/3">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
            />
          </div>
          <div className="basis-2/3 p-12">
            <h2 className="my-3 text-xl">{movie.original_title}</h2>
            <p className="my-3">{movie.year}年</p>
            <p className="my-3">{movie.overview}</p>
            <p className="my-3"><Link to="/">&lt; Back</Link></p>
          </div>
        </div>
      )}
    </>
  );
}

export default MovieDetail;
