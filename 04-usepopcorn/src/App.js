import { useEffect, useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const KEY = "354eaade"

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App () {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [query, setQuery] = useState("");

  function onSetQuery (value) {
    setQuery(value)
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setErrors(null)

        const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`)

        if (!response.ok) {
          throw new Error("Something went wrong while movie fetching")
        }

        const data = await response.json();

        if (data.Response === "False") {
          throw new Error("Movie not found")
        }

        setMovies(data.Search || [data]);
        setIsLoading(false)
      } catch (error) {
        setErrors(error.message || "Something went wrong")
        console.log(errors);
      } finally {
        setIsLoading(false)
      }
    }
    if (query.length >= 3) {
      fetchMovies();
    }
  }, [query])

  return (
    <>
      <NavBar >
        <SearchBar query={query} onQuery={onSetQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main  >
        <Box >
          {isLoading && <Loader />}
          {!isLoading && !errors && <ListOfMovies movies={movies} />}
          {errors && <ErrorMessage error={errors} />}
        </Box>
        <Box>
          <WatchedSummery watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

function Loader () {
  return <p className="loader">Loading....</p>
}

function ErrorMessage ({ error }) {
  return <p className="error">{error || error?.message}</p>
}

function NavBar ({ children }) {
  return <nav className="nav-bar">
    <Logo />
    {children}
  </nav>
}

function Logo () {
  return <div className="logo">
    <span role="img">🍿</span>
    <h1>usePopcorn</h1>
  </div>
}

function SearchBar ({ query, onQuery }) {

  return <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => onQuery(e.target.value)}
  />
}

function NumResults ({ movies }) {
  return <p className="num-results">
    Found <strong>{movies.length}</strong> results
  </p>
}

function Main ({ children }) {
  return <main className="main">{children}</main>
}

function Box ({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return <div className="box">
    <button
      className="btn-toggle"
      onClick={() => setIsOpen((open) => !open)}
    >
      {isOpen ? "–" : "+"}
    </button>
    {isOpen && (children)}
  </div>
}

function ListOfMovies ({ movies }) {
  return <ul className="list">
    {movies?.map((movie) => (
      <Movie movie={movie} key={movie.imdbID} />
    ))}
  </ul>
}

function Movie ({ movie }) {
  return <li >
    <img src={movie.Poster} alt={`${movie.Title} poster`} />
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>🗓</span>
        <span>{movie.Year}</span>
      </p>
    </div>
  </li>
}

function WatchedSummery ({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return <div className="summary">
    <h2>Movies you watched</h2>
    <div>
      <p>
        <span>#️⃣</span>
        <span>{watched.length} movies</span>
      </p>
      <p>
        <span>⭐️</span>
        <span>{avgImdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{avgUserRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{avgRuntime} min</span>
      </p>
    </div>
  </div>

}


function WatchedMovieList ({ watched }) {
  return <ul className="list">
    {watched.map((movie) => (
      <WatchedMovie movie={movie} key={movie.imdbID} />
    ))}
  </ul>
}

function WatchedMovie ({ movie }) {
  return <li >
    <img src={movie.Poster} alt={`${movie.Title} poster`} />
    <h3>{movie.Title}</h3>
    <div>
      <p>
        <span>⭐️</span>
        <span>{movie.imdbRating}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{movie.userRating}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{movie.runtime} min</span>
      </p>
    </div>
  </li>
}