import { useState } from "react";
import { API_URL, tempMovieData, tempWatchedData } from "./data";
import { API_KEY } from "./data";
import { useEffect } from "react";
// Componenets

import { NavBar } from "./components/NavBar";
import { Logo } from "./components/Logo";
import { Search } from "./components/Search";
import { NumResults } from "./components/NumResults";
import { Main } from "./components/Main";
import { Box } from "./components/Box";
import { MovieList } from "./components/MovieList"
import { MovieDetails } from "./components/MovieDetails";
import { ErrorMessage } from "./components/ErrorMessage"
import { Loader } from "./components/Loader";
import { WatchedMoviesList } from "./components/WatchedMoviesList";
import { WatchedSummary } from "./components/WatchedSummary";

export default function App() {

  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSelectedMovie(id) {
    setSelectedId(selectedId => id === selectedId ? null : id);
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleAddToWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleRemoveFromWatched(id) {
    setWatched(watched => watched.filter(movie => movie.imdbId !== id));
  }

  useEffect(() => {
    const controller = new AbortController();

    async function getMovies() {

      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(`${API_URL}?apikey=${API_KEY}&s=${query}`, {
          signal: controller.signal
        });
        const data = await res.json();
        if (data.Response === 'False') throw new Error('Movie Not Found')

        setMovies(data.Search);


      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error.message);
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }

    }

    if (query.length < 3) {
      setMovies([])
      setError("")
      return
    }

    getMovies();

    // CleanUp Function
    return () => {
      controller.abort();
    }

  }, [query]);



  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults count={movies.length} />
      </NavBar>
      <Main>
        <Box>
          {
            !isLoading
            &&
            !error
            &&
            <MovieList movies={movies} onSelect={handleSelectedMovie} />
          }
          {
            isLoading
            &&
            !error
            &&
            <Loader />
          }
          {
            error
            &&
            !isLoading
            &&
            <ErrorMessage message={error} />

          }
        </Box>
        <Box>
          {
            selectedId
              ?
              <MovieDetails watched={watched} selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddToWatched={handleAddToWatched} />
              :
              <>
                <WatchedSummary watched={watched} />
                <WatchedMoviesList watched={watched} onRemoveWatched={handleRemoveFromWatched} />
              </>
          }
        </Box>
      </Main>
    </>
  );
}



// function WatchedBox() {

//   const [watched, setWatched] = useState(tempWatchedData);
//   const [isOpen2, setIsOpen2] = useState(true);



//   return (
//     <>
//       <div className="box">
//         <button
//           className="btn-toggle"
//           onClick={() => setIsOpen2((open) => !open)}
//         >
//           {isOpen2 ? "–" : "+"}
//         </button>
//         {
//           isOpen2
//           &&
//           <>
//             <WatchedSummary watched={watched} />
//             <WatchedMoviesList watched={watched} />
//           </>
//         }
//       </div>

//     </>
//   )
// }
