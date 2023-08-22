import { useState, useEffect } from "react";
import { API_KEY, API_URL } from "../data";

export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");


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

      return {movies, isLoading, error};

}