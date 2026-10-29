import { useState } from "react";

import { MovieDetails } from "./MovieDetail";
import {
  Box,
  MainComponent,
  MovieList,
  WatchedMovieList,
  WatchedSummary,
} from "./MainComponent";

import { Logo, Navbar, Navresults, Search } from "./Navbar";

import { ErrorMessage, Loader } from "./Loader";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const KEY = "ba0da50a";

export const App = () => {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, loading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([]);

  //  const [watched, setWatched] = useState([]);

  useKey("Escape");
  function handleSelectedId(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddwatched(movie) {
    setWatched((watched) => [...watched, movie]);

    //  localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Navresults movies={movies} />
      </Navbar>
      <MainComponent>
        <Box>
          {loading && <Loader />}
          {!loading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectedId} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddwatched}
              watched={watched}
              KEY={KEY}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </MainComponent>
    </>
  );
};
