import { WatchedMovieElement } from "./WatchedMovieElement";
export function WatchedMoviesList({ watched, onRemoveWatched }) {


    return (
        <>
            <ul className="list">
                {
                    watched.map((movie) => (
                        <WatchedMovieElement movie={movie} key={movie.imdbId} onRemoveWatched={onRemoveWatched} />
                    ))
                }
            </ul>

        </>
    )
}
