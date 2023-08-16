import { MovieElement } from "./MovieElement"
export function MovieList({ movies, onSelect }) {


    return (
        <>
            <ul className="list list-movies">
                {
                    movies?.map((movie) => (
                        <MovieElement movie={movie} onSelect={onSelect} key={movie.imdbID} />
                    ))
                }
            </ul>
        </>
    )
}