import { useEffect, useState } from "react";
import Header from "./components/Header";
import ListBox from "./components/ListBox";
import WatchedBox from "./components/WatchedBox";
import Search from "./components/Search";
import Logo from "./components/Logo";
import NumResults from "./components/NumResults";
import { useMovies } from "./components/useMovies";
import { useLocalStorageState } from "./components/useLocalStorageState";

const KEY = "9d2d0c58";

export default function App() {
	const [query, setQuery] = useState("");
	const [selectedId, setSelectedId] = useState(null);

	const [watched, setWatched] = useLocalStorageState([], "watched");

	//const [watched, setWatched] = useState([]);
	/* const [watched, setWatched] = useState(function () {
		const storedValue = localStorage.getItem("watched");
		return JSON.parse(storedValue);
	}); */

	const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

	function handleSelectMovie(id) {
		if (id === selectedId) {
			setSelectedId(null);
			return;
		}

		setSelectedId(id);
	}

	function handleCloseMovie(id) {
		setSelectedId(null);
	}

	function handleAddWatched(movie) {
		setWatched((prev) => [...prev, movie]);

		//localStorage.setItem("watched", JSON.stringify([...watched, movie]));
	}

	function handleDeleteWatched(id) {
		setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
	}

	return (
		<>
			<Header>
				<Logo />
				<Search query={query} setQuery={setQuery} />
				<NumResults movies={movies} />
			</Header>

			<main className="main">
				<ListBox
					handleSelectMovie={handleSelectMovie}
					isLoading={isLoading}
					error={error}
					movies={movies}
					query={query}
				/>
				<WatchedBox
					handleCloseMovie={handleCloseMovie}
					watched={watched}
					selectedId={selectedId}
					onAddWatched={handleAddWatched}
					onDeleteWatched={handleDeleteWatched}
				/>
			</main>
		</>
	);
}
