import React from "react";
import {
  useGetMovieCreditsQuery,
  useGetTVCreditsQuery,
} from "../store/Slices/ApiSlice";
import { useParams } from "react-router-dom";

const Cast = () => {
  const { id, type } = useParams();
  const imgBasUrl = "https://image.tmdb.org/t/p/w500/";

  const getCredits =
    type === "movie" ? useGetMovieCreditsQuery(id) : useGetTVCreditsQuery(id);

  const { data } = getCredits;
  return (
    <div>
      <h1 className="text-2xl font-bold mt-10 text-white">Top Cast</h1>
      <div className="flex  mt-5 overflow-x-auto no-scrollbar">
        {data?.cast
          ?.filter((cast) => cast.profile_path)
          ?.map((cast) => (
            <div key={cast.id} className="  ">
              <div className=" h-[200px] w-[150px]">
                <img
                  src={`${imgBasUrl}${cast?.profile_path}`}
                  className="rounded-full h-32 w-32 object-cover"
                  alt="name"
                />
                <h1 className="w-[85%] truncate text-center ">{cast.name}</h1>
                <h1 className="w-[85%] truncate text-center text-gray-500">{cast.character}</h1>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Cast;
