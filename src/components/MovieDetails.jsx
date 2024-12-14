import React, { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";
import { useKey } from "./useKey";

function MovieDetails({ selectedId, handleCloseMovie, onAddWatched, watched }) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState("");

	const counterRef = useRef(0);

	useEffect(
		function () {
			if (userRating) {
				counterRef.current += 1;
			}
		},
		[userRating]
	);

	const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
	const watchedUserRating = watched.find(
		(movie) => movie.imdbID === selectedId
	)?.userRating;

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
		Genre: genre,
	} = movie;

	function handleAdd() {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(" ").at(0)),
			userRating,
			countRatingDecision: counterRef.current,
		};

		onAddWatched(newWatchedMovie);
		handleCloseMovie();
	}

	useKey("Escape", handleCloseMovie);

	useEffect(
		function () {
			async function getMovieDetails() {
				setIsLoading(true);
				const res = await fetch(
					`https://www.omdbapi.com/?apikey=9d2d0c58&i=${selectedId}`
				);

				const data = await res.json();
				console.log(data);
				setMovie(data);
				setIsLoading(false);
			}
			getMovieDetails();
		},
		[selectedId]
	);

	useEffect(
		function () {
			if (!title) return;
			document.title = `Movie | ${title}`;

			return function () {
				document.title = "usePopcorn";
			};
		},
		[title]
	);

	return (
		<div className="details">
			{isLoading ? (
				<Loader />
			) : (
				<>
					<button className="btn-black" onClick={handleCloseMovie}>
						&larr;
					</button>
					<header>
						<img src={poster} alt={`Poster of ${movie} movie`} />
						<div className="details-overview">
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>{imdbRating} IMDb rating</p>
						</div>
					</header>
					<section>
						<div className="rating">
							{!isWatched ? (
								<>
									<StarRating size={24} onSetRating={setUserRating} />
									{userRating > 0 && (
										<button className="btn-add" onClick={handleAdd}>
											Add to list
										</button>
									)}{" "}
								</>
							) : (
								<p>You rated this movie {watchedUserRating}</p>
							)}
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed by {director}</p>
					</section>
				</>
			)}
		</div>
	);
}

export default MovieDetails;
