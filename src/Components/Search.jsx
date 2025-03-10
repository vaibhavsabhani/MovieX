import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGetSearchQuery } from "../store/Slices/ApiSlice";
import { CircularProgress } from "@mui/joy";

const Search = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query") || "";

  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);

  const { data, isFetching, error } = useGetSearchQuery({
    searchTerm: searchQuery,
    page,
  });

  console.log(data);


  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight - 100
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  useEffect(() => {
    if (data?.results?.length) {
      setMovies((prev) => [...prev, ...data.results]);
    }
  }, [data]);

  useEffect(()=>{
    setMovies([]);
    setPage(1)
  },[searchQuery])
   
  const imgBaseUrl = "https://image.tmdb.org/t/p/w500/";

  return (
    <>
      <div className="flex flex-wrap justify-center lg:mx-4 gap-10 lg:gap-8 mt-20 ">
        {movies
          .filter((data) => data.poster_path)
          .map((data) => {
            return (
              <Link
                to={`/details/${data.media_type || "movie"}/${data.id}`}
                key={data.id}
              >
                <div className="rounded-xl shadow-lg">
                  <img
                    src={`${imgBaseUrl}${data.poster_path}`}
                    alt={data.title || data.name}
                    className="lg:object-cover h-[240px] w-[140px] md:h-[300px] md:w-[180px] lg:h-[350px] lg:w-[250px] rounded-2xl"
                  />
                  <div className="w-full">
                    <h1 className="text-white font-semibold w-28 text-left truncate">
                      {data.title || data.name}
                    </h1>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
      {isFetching && (
        <div className="text-center mt-4">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default Search;
