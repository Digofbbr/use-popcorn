import React from "react";
import Movie from "./Movie";

function MovieList({ movies, handleSelectMovie, query }) {
	if (query.length === 0)
		return <div className="no-movies-searched">Search for a movie...</div>;

	return (
		<ul className="list list-movies">
			{movies?.map((movie) => (
				<Movie
					handleSelectMovie={handleSelectMovie}
					key={movie.imdbID}
					movie={movie}
				/>
			))}
		</ul>
	);
}

export default MovieList;
