import { useEffect, useState } from 'react';

type Movie = {
  id: string;
  title: string;
  poster_path: string;
  overview: string;
};

function App() {
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
      <h1 className="my-12 font-bold text-2xl text-center">映画検索</h1>
      <div className="w-sm mx-auto my-12 text-lg">
        <span className="inline-block w-16 font-bold">検索: </span>
        <input className="w-xs border" type="text" onChange={(e) => setKeyword(e.target.value)} />
      </div>
      <div className="flex flex-wrap">
        {movieList
          .filter((movie) => movie.title.includes(keyword))
          .map((movie) => (
            <div className="flex flex-wrap flex-1/2 my-3" key={movie.id}>
              <div className="flex-2/3 px-6">
                <h2 className="mb-3 font-bold text-lg">{movie.title}</h2>
                <p className="text-sm">{movie.overview}</p>
              </div>
              <div className="flex-1/3">
                <img className="aspect-5/8 object-cover" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              </div>
            </div>
          ))
        }
      </div>
    </>
  );
}

export default App;
