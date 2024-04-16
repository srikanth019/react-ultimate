import { useEffect, useRef, useState } from "react";
import StarRating from "./components/StarRating";
import { useLocalStorageState } from "./customHooks/useLocalStorageState";
import { useKey } from "./customHooks/useKey";

const KEY = "354eaade"

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App () {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null)

  const [watched, setWatched] = useLocalStorageState([], "watched")

  function onSetQuery (value) {
    setQuery(value)
  }

  function handleSetSelectId (id) {
    setSelectedId((prevId) => prevId === id ? null : id)
  }

  function handleCloseSelectedMovie () {
    setSelectedId(null)
  }

  function handleAddWatchMovie (movie) {
    setWatched((prevMovies) => [...prevMovies, movie])
    // localStorage.setItem('watched', JSON.stringify([...watched, movie]))
  }

  function handleDeleteWatchMovie (id) {
    setWatched((prevMovies) => prevMovies.filter((movie) => movie.imdbID !== id))
  }

  useEffect(() => {
    const controller = new AbortController()
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setErrors(null)

        const response = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        )

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
        if (error.name !== "AbortError") {
          setErrors(error.message || "Something went wrong")
        }
      } finally {
        setIsLoading(false)
      }
    }
    if (query.length >= 2) {
      handleCloseSelectedMovie()
      fetchMovies();
      return function () {
        controller.abort()
      }
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
          {!isLoading && !errors && <ListOfMovies movies={movies} onSelectMovie={handleSetSelectId} />}
          {errors && <ErrorMessage error={errors} />}
        </Box>
        <Box>
          {selectedId ?
            <SelectedMovie
              selectedId={selectedId}
              onCloseSelectedMovie={handleCloseSelectedMovie}
              handleAddWatchMovie={handleAddWatchMovie}
              watched={watched}
            /> :
            (<>
              <WatchedSummery watched={watched} />
              <WatchedMovieList
                watched={watched}
                handleDeleteWatchMovie={handleDeleteWatchMovie}
              />
            </>)
          }
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
  const inputEl = useRef(null)

  //To focus on the search input element when clicking on "Enter" Additionally clear prev input
  useEffect(() => {
    function onEnterFocus (e) {
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") {
        inputEl.current.focus()
        // inputEl.current.value = ""
        onQuery("")
      }
    }
    document.addEventListener("keydown", onEnterFocus)

    return () => {
      document.removeEventListener("keydown", onEnterFocus);
    };
  }, [onQuery])

  return <input
    className="search"
    type="text"
    placeholder="Search movies..."
    value={query}
    onChange={(e) => onQuery(e.target.value)}
    ref={inputEl}
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

function ListOfMovies ({ movies, onSelectMovie }) {
  return <ul className="list list-movies">
    {movies?.map((movie) => (
      <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
    ))}
  </ul>
}

function SelectedMovie ({ selectedId, onCloseSelectedMovie, handleAddWatchMovie,
  watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("")

  const isWatched = watched.map((movie) => movie.imdbID)?.includes(movie.imdbID)

  const isUserRate = watched.find((movie) => movie.imdbID === selectedId)?.userRating

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;



  function onAddMovie () {
    const newMovie = {
      imdbID: selectedId,
      title,
      year: year || "",
      poster,
      runtime: Number(runtime?.split(" ")?.at(0)) || Number("0"),
      imdbRating: Number(imdbRating),
      userRating: userRating,
    }
    handleAddWatchMovie(newMovie);
    onCloseSelectedMovie();
  }

  useEffect(
    function () {
      async function getMovieDetails () {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(() => {
    if (!title) {
      return
    }
    document.title = `Movie | ${title}`

    return function () {
      document.title = "usePopcorn"
    }
  }, [title])

  // useKey("Escape", onCloseSelectedMovie)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Escape") {
        onCloseSelectedMovie();
        console.log("CLOSED");
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup function to remove event listener when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCloseSelectedMovie]);


  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseSelectedMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released || ""} &bull; {runtime || ""}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ?
                <>
                  <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                  {userRating ? <button className="btn-add" onClick={() => onAddMovie()}>+ Add to list</button> : ""}
                </>
                :
                <p>You already rated this movie with {isUserRate} ⭐️</p>
              }
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function Movie ({ movie, onSelectMovie }) {
  return <li onClick={() => onSelectMovie(movie.imdbID)}>
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
        <span>{avgImdbRating.toFixed(2)}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{avgUserRating.toFixed(2)}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{avgRuntime.toFixed(2)} min</span>
      </p>
    </div>
  </div>

}


function WatchedMovieList ({ watched, handleDeleteWatchMovie }) {
  return <ul className="list">
    {watched.map((movie) => (
      <WatchedMovie movie={movie} key={movie.imdbID} handleDeleteWatchMovie={handleDeleteWatchMovie} />
    ))}
  </ul>
}

function WatchedMovie ({ movie, handleDeleteWatchMovie }) {
  return <li >
    <img src={movie.poster} alt={`${movie.title} poster`} />
    <h3>{movie.title}</h3>
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

      <button className="btn-delete" onClick={() => handleDeleteWatchMovie(movie.imdbID)}>X</button>
    </div>
  </li>
}