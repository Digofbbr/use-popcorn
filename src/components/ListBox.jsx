import React, { useState } from "react";
import MovieList from "./MovieList";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
function ListBox({ movies, isLoading, error, handleSelectMovie, query }) {
	const [isOpen1, setIsOpen1] = useState(true);
	return (
		<div className="box">
			<button
				className="btn-toggle"
				onClick={() => setIsOpen1((open) => !open)}
			>
				{isOpen1 ? "–" : "+"}
			</button>
			{/* {isLoading ? <Loader /> : isOpen1 && <MovieList movies={movies} />} */}
			{isLoading && <Loader />}
			{!isLoading && !error && isOpen1 && (
				<MovieList
					handleSelectMovie={handleSelectMovie}
					movies={movies}
					query={query}
				/>
			)}
			{error && <ErrorMessage message={error} />}
			{/* <Loader /> : isOpen1 && <MovieList movies={movies} />} */}
		</div>
	);
}

export default ListBox;
