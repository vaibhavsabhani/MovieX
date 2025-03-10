import React, { useState, useEffect } from "react";
import { useGetExploreTVShowsQuery, useGetTVGenresQuery } from "../store/Slices/ApiSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/joy";
import Select from "react-select";
import { Link } from "react-router-dom";

const SORT_OPTIONS = [
  { label: "Popularity Desc", value: "popularity.desc" },
  { label: "Popularity Asc", value: "popularity.asc" },
  { label: "First Air Date Desc", value: "first_air_date.desc" },
  { label: "First Air Date Asc", value: "first_air_date.asc" },
  { label: "Rating Desc", value: "vote_average.desc" },
  { label: "Rating Asc", value: "vote_average.asc" },
];

const TVShows = () => {
  const [page, setPage] = useState(1);
  const [shows, setShows] = useState([]);
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const { data: genreData } = useGetTVGenresQuery();
  const { data, isFetching, error } = useGetExploreTVShowsQuery({
    page,
    sort: selectedSort.value,
    genres: selectedGenres.map((genre) => genre.value),
  });

  useEffect(() => {
    if (data?.results) {
      setShows((prevShows) => [...prevShows, ...data.results]);
    }
  }, [data]);

  useEffect(() => {
    setShows([]);
    setPage(1);
  }, [selectedSort, selectedGenres]);

  const fetchMoreData = () => {
    if (data?.total_pages > page && !isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4 lg:px-20">
      <div className="flex md:flex-row flex-col justify-between items-center mb-6">
        <h1 className="text-white text-3xl font-bold">Explore TV Shows</h1>
        <div className="flex gap-4 md:flex-row flex-col">
          <Select
            options={SORT_OPTIONS}
            value={selectedSort}
            onChange={setSelectedSort}
            className="md:w-52 w-64"
          />
          <Select
            options={
              genreData?.genres.map((genre) => ({ label: genre.name, value: genre.id })) || []
            }
            value={selectedGenres}
            onChange={setSelectedGenres}
            isMulti
            className="md:w-52 w-64"
          />
        </div>
      </div>

      {error && <p className="text-red-500 text-center">Error loading results.</p>}

      <InfiniteScroll
        dataLength={shows.length}
        next={fetchMoreData}
        hasMore={page < (data?.total_pages || 1)}
        loader={
          <div className="flex justify-center items-center pt-60 pr-15">
            <CircularProgress />
          </div>
        }
        className="flex flex-wrap justify-center gap-5"
      >
        {shows.length > 0 ? (
          shows
            .filter((show) => show.poster_path)
            .map((show) => (
              <Link to={`/details/${show.media_type || 'tv'}/${show.id}`} key={show.id}>
                <div className="rounded-lg shadow-lg">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.name || "TV Show Poster"}
                    className="object-cover h-[350px] w-[250px] rounded-2xl"
                  />
                  <div className="p-4 text-left">
                    <h2 className="text-white font-semibold w-52 text-left truncate">
                      {show.name || show.original_name}
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                      {show.first_air_date
                        ? new Date(show.first_air_date).toLocaleDateString()
                        : "Unknown Air Date"}
                    </p>
                  </div>
                </div>
              </Link>
            ))
        ) : (
          <p className="text-white text-center">No shows found</p>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default TVShows;
