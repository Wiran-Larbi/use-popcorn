import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {

    const [value, setValue] = useState(function() {
        const storedValues = localStorage.getItem("watched") || `${initialState}`;
        return JSON.parse(storedValues);
    });


    useEffect(function() {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, setValue]);


    return [value, setValue];
}