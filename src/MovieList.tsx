import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

type Movie = {
  id: string;
  title: string;
  poster_path: string;
  overview: string;
};

function MovieList() {
  const [keyword, setKeyword] = useState('');
  const [movieList, setMovieList] =useState<Movie[]>([]);

  const fetchMovieList = async () => {
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
    const url = keyword ?
      `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ja&page=1` :
      'https://api.themoviedb.org/3/movie/popular?include_adult=false&language=ja&page=1';
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    const data = await response.json();
    setMovieList(
      data.results.map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
      }))
    );
  };

  useEffect(() => {
    fetchMovieList();
  }, [keyword]);

  return (
    <>
      <div className="w-sm mx-auto py-12 text-lg">
        <span className="inline-block w-16 font-bold">検索: </span>
        <input className="w-xs border bg-white text-black" type="text" onChange={(e) => setKeyword(e.target.value)} />
      </div>
      <div className="flex flex-wrap justify-around">
        {movieList
          .filter((movie) => movie.title.includes(keyword))
          .map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        }
      </div>
    </>
  );
}

export default MovieList;
