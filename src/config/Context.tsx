// Context.tsx

import React, { createContext, useState } from 'react';

type ContextType = {
  movies: never[];
  movie: any;
  cast: any[];
  loading: boolean;
  error: boolean;
  setMovies: (movies: never[]) => void;
  setMovie: (movie: any) => void;
  setCast: (cast: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
  themeMode: string;
  setThemeMode: (themeMode: string) => void;
};

const defaultValue: ContextType = {
  movies: [],
  movie: {},
  cast: [],
  loading: false,
  error: false,
  setMovies: () => {},
  setMovie: () => {},
  setCast: () => {},
  setLoading: () => {},
  setError: () => {},
  themeMode: "dark" || "light" ,
  setThemeMode: () => {},
};

export const Context = createContext<ContextType>(defaultValue);

export const ContextProvider = (props: any) => {
  const [movies, setMovies] = useState<never[]>([]);
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [themeMode, setThemeMode] = useState("dark");

  const value: ContextType = {
    movies,
    movie,
    cast,
    loading,
    error,
    setMovies,
    setMovie,
    setCast,
    setLoading,
    setError,
    themeMode,
    setThemeMode,
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );
};

// Path: src\config\Context.tsx