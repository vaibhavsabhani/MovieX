import React, { useState, useEffect } from "react";
import {
  useGetExploreMoviesQuery,
  useGetGenresQuery,
} from "../store/Slices/ApiSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/joy";
import Select from "react-select";
import { Link } from "react-router-dom";

const SORT_OPTIONS = [
  { label: "Popularity Desc", value: "popularity.desc" },
  { label: "Popularity Asc", value: "popularity.asc" },
  { label: "Release Date Desc", value: "release_date.desc" },
  { label: "Release Date Asc", value: "release_date.asc" },
  { label: "Rating Desc", value: "vote_average.desc" },
  { label: "Rating Asc", value: "vote_average.asc" },
];

const Movies = () => {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const { data: genreData } = useGetGenresQuery();
  const { data, isFetching, error } = useGetExploreMoviesQuery({
    page,
    sort: selectedSort.value,
    genres: selectedGenres.map((genre) => genre.value),
  });

  useEffect(() => {
    if (data?.results) {
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
    }
  }, [data]);

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [selectedSort, selectedGenres]);

  const fetchMoreData = () => {
    if (data?.total_pages > page && !isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4 lg:px-20">
      <div className="flex justify-between items-center mb-6 flex-col md:flex-row">
        <h1 className="text-white text-3xl font-bold">Explore Movies</h1>
        <div className="flex flex-col md:flex-row mt-3   gap-4 relative">
          <Select
            options={SORT_OPTIONS}
            value={selectedSort}
            onChange={setSelectedSort}
            className=" md:w-52 w-64"
          />
          <Select
            options={
              genreData?.genres.map((genre) => ({
                label: genre.name,
                value: genre.id,
              })) || []
            }
            value={selectedGenres}
            onChange={setSelectedGenres}
            isMulti
            className="md:w-52 w-64"
          />
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-center">Error loading results.</p>
      )}

      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreData}
        hasMore={page < (data?.total_pages || 1)}
        loader={
          <div className="flex justify-center items-center pt-60 pr-15">
            <CircularProgress />
          </div>
        }
        className="flex flex-wrap justify-center gap-5"
      >
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <Link
              to={`/details/${movie.media_type || "movie"}/${movie.id}`}
              key={movie.id}
            >
              <div className="rounded-2xl shadow-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || "Movie Poster"}
                  className="object-cover h-[350px] w-[250px] rounded-2xl"
                />
                <div className="p-4">
                  <h2 className="text-white font-semibold w-52 text-left truncate">
                    {movie.title || movie.original_name}
                  </h2>
                  <p className="text-sm mt-1">
                    {new Date(
                      movie.release_date || movie.first_air_date
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default Movies;
