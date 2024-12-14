import React, { useState } from "react";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import MovieDetails from "./MovieDetails";

function WatchedBox({
	watched,
	selectedId,
	handleCloseMovie,
	onAddWatched,
	onDeleteWatched,
}) {
	const [isOpen2, setIsOpen2] = useState(true);

	return (
		<div className="box">
			<button
				className="btn-toggle"
				onClick={() => setIsOpen2((open) => !open)}
			>
				{isOpen2 ? "–" : "+"}
			</button>
			{isOpen2 &&
				(selectedId ? (
					<MovieDetails
						handleCloseMovie={handleCloseMovie}
						selectedId={selectedId}
						onAddWatched={onAddWatched}
						watched={watched}
					/>
				) : (
					<>
						<WatchedSummary watched={watched} />
						<WatchedMoviesList
							watched={watched}
							onDeleteWatched={onDeleteWatched}
						/>
					</>
				))}
		</div>
	);
}

export default WatchedBox;
