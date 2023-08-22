import { useState, useRef } from "react";
import { Loader } from "./Loader";
import { StarRating } from "./StarRating";
import { useEffect } from "react";
import { API_KEY, API_URL } from "../data.js";


export function MovieDetails({ selectedId, watched, onCloseMovie, onAddToWatched }) {
    const [movieDetails, setMovieDetails] = useState({});
    const [userRating, setUserRating] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    let ratedCounter = useRef(0);
    
    
    const isWatched = watched.map(movie => movie.imdbId).includes(selectedId);
    const WatchedUserRating = watched.find(movie => movie.imdbId === selectedId)?.userRating;
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
        Genre: genre
    } = movieDetails;
    
    useEffect(() => {
        if (userRating)
        ratedCounter.current++;
    
}, [userRating])

    useEffect(() => {
        async function getMovieDetails() {
            try {
                setIsLoading(true)
                const res = await fetch(`${API_URL}?apikey=${API_KEY}&i=${selectedId}`);
                const data = await res.json();
                
                console.log(data);
                setMovieDetails(data);
                
            } catch (error) {
                console.error(error);
            }
            finally {
                setIsLoading(false);
            }
        }
        
        getMovieDetails();
    }, [selectedId]);
    
    useEffect(() => {
        function updatePageTitle() {
            if (!title) return;
            document.title = `Movie : ${title}`;
            //! Closure Warning: title will be remembered even after unmount 🧐
            return () => {
                document.title = 'usePopcorn';
            }
        }
        
        const cleanUp = updatePageTitle();
        return cleanUp;
    }, [title]);
    
    useEffect(() => {
        function callback(e) {
            if (e.code === "Escape") {
                onCloseMovie();
            }
        }
        
        document.addEventListener("keydown", callback);
        
        
        return function () {
            document.removeEventListener("keydown", callback);
        }
    })
    
    function handleAddToList() {
        const newWatchedMovie = {
            imdbId: selectedId,
            title,
            poster,
            year,
            imdbRating: Number(imdbRating),
            userRating,
            runtime: isNaN(Number(runtime.split(' ').at(0))) ? 0 : Number(runtime.split(' ').at(0)),
            ratedCounter: ratedCounter.current
        }
        
        
        onAddToWatched(newWatchedMovie);
        onCloseMovie();
    }
    
    
    return (
        <>
            <div className="details">
                {
                    isLoading
                    ?
                    <Loader />
                    :
                        <>
                            <header className="">
                                <button className="btn-back" onClick={onCloseMovie}>
                                    <img src="back-left.svg" className="icon-back" alt="back left" />
                                </button>
                                <img src={poster} alt={`Poster of ${title} movie`} />
                                <div className="details-overview">
                                    <h2>{title}</h2>
                                    <p>
                                        {released} &bull; {runtime}
                                    </p>
                                    <p>
                                        {genre}
                                    </p>
                                    <p>
                                        <span>🌟</span>
                                        {imdbRating} IMDb rating
                                    </p>
                                </div>
                            </header>

                            <section>
                                <div className="rating">

                                    {
                                        !isWatched
                                            ?
                                            <>
                                                <StarRating maxRating={10} size={26} onSetRating={setUserRating} />
                                                {
                                                    userRating > 0
                                                    &&
                                                    <button className="btn-add" onClick={handleAddToList}>
                                                        Add to list
                                                    </button>

                                                }

                                            </>
                                            :
                                            <p>You've rated it : {WatchedUserRating}🌟 </p>

                                    }
                                </div>
                                <p>
                                    <em>
                                        {plot}
                                    </em>
                                </p>
                                <p>
                                    Starring {actors}
                                </p>
                                <p>
                                    Directed by {director}
                                </p>
                            </section>
                        </>
                }
            </div>
        </>
    )
}