import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetMoviesRecommandationQuery,
  useGetTVShowsRecommandationQuery,
} from "../store/Slices/ApiSlice";

const RecommandMovies = () => {
  const { type, id } = useParams();
  const imgBaseUrl = "https://image.tmdb.org/t/p/w500/";

  const { data, isFetching } =
    type === "movie"
      ? useGetMoviesRecommandationQuery(id)
      : useGetTVShowsRecommandationQuery(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl mt-10 text-white">Recommandations</h1>
      <div className="mt-5 flex gap-4 overflow-x-auto no-scrollbar">
        {isFetching ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="min-w-[250px] h-[350px] bg-gray-700 animate-pulse rounded-2xl"></div>
          ))
        ) : data?.results?.length > 0 ? (
          data.results
            .filter((card) => card?.poster_path)
            .map((card) => (
              <Link to={`/details/${card.media_type || type}/${card.id}`} key={card.id}>
                <div className="relative">
                  <img
                    src={`${imgBaseUrl}${card?.poster_path}`}
                    alt=""
                    className="min-w-[250px] h-[350px] border-2 border-white rounded-2xl"
                  />
                  <h1 className="pl-3 mt-4 text-xl">{card?.title || card?.name}</h1>
                </div>
              </Link>
            ))
        ) : (
          <p>No data Available</p>
        )}
      </div>
    </div>
  );
};

export default RecommandMovies;
