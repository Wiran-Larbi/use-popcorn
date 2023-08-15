import { useState } from "react";
import { tempMovieData, tempWatchedData } from "./data";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);


function NavBar({ children }) {


  return (
    <>
      <nav className="nav-bar">
        {
          children
        }
      </nav>
    </>

  )
}

function Logo() {


  return (
    <>
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
    </>
  )
}

function Search() {
  const [query, setQuery] = useState("");

  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  )
}

function NumResults({ count }) {

  return (
    <>
      <p className="num-results">
        Found <strong>{count}</strong> results
      </p>
    </>
  )
}

function Box({ children }) {

  const [isOpen, setIsOpen] = useState(true);


  return (
    <>
      <div className="box">

        <ShowHideButton isOpen={isOpen} setIsOpen={setIsOpen} />

        {
          isOpen
          &&
          children
        }
      </div>
    </>
  )
}

function ShowHideButton({ isOpen, setIsOpen }) {

  return (
    <>
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
    </>
  )
}


function MovieList({ movies }) {


  return (
    <>
      <ul className="list">
        {
          movies?.map((movie) => (
            <MovieElement movie={movie} key={movie.imdbID} />
          ))
        }
      </ul>
    </>
  )
}

function MovieElement({ movie }) {


  return (
    <>
      <li key={movie.imdbID}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
    </>
  )
}

function WatchedSummary({ watched }) {

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));


  return (
    <>
      <div className="summary">
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
    </>
  )
}

function WatchedMoviesList({ watched }) {


  return (
    <>
      <ul className="list">
        {
          watched.map((movie) => (
            <WatchedMovieElement movie={movie} key={movie.imdbID} />
          ))
        }
      </ul>

    </>
  )
}

function WatchedMovieElement({ movie }) {


  return (
    <>
      <li key={movie.imdbID}>
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
    </>
  )
}

function Main({ children }) {


  return (
    <>
      <main className="main">
        {
          children
        }
      </main>
    </>
  )
}

export default function App() {

  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);


  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults count={movies.length} />
      </NavBar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} />
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
