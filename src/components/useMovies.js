import { useEffect, useState } from "react";

export function useMovies(query, callback) {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(
		function () {
			callback?.();

			const controller = new AbortController();

			async function fetchMovies() {
				try {
					setIsLoading(true);
					setError("");
					const res = await fetch(
						`https://www.omdbapi.com/?apikey=9d2d0c58&s=${query}`,
						{ signal: controller.signal }
					);

					if (!res.ok) throw new Error("Something went wrong!");

					const resData = await res.json();
					if (resData.Response === "False") throw new Error("Movie not found");

					console.log(resData);
					setMovies(resData.Search);
					setError("");
				} catch (error) {
					console.log(error.message);
					if (error.name !== "AbortError") {
						setError(error.message);
					}
				} finally {
					setIsLoading(false);
				}
			}

			if (query.length < 3) {
				setMovies([]);
				setError("");
				return;
			}

			fetchMovies();

			return function () {
				controller.abort();
			};
		},
		[query]
	);

	return {
		movies,
		isLoading,
		error,
	};
}
