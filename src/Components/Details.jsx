import { useEffect, useState } from "react";
import * as React from "react";
import { useParams } from "react-router-dom";
import {
  useGetMovieCreditsQuery,
  useGetMovieDetailsQuery,
  useGetTVCreditsQuery,
  useGetTVDetailsQuery,
} from "../store/Slices/ApiSlice";
import { CircularProgress, Skeleton } from "@mui/joy";
import Cast from "./Cast";
import YtVideos from "./YtVideos";
import PlayButton from "./PlayButton";
import SimilarMovies from "./SimilarMovies";
import RecommandMovies from "./RecommandMovies";

const Details = () => {
  const [show, setShow] = useState(false);
  const { id, type } = useParams();
  const imgBaseUrl = "https://image.tmdb.org/t/p/w500/";

  const handleButton = () => {
    setShow(!show);
  };

  const DetailQuery =
    type === "movie" ? useGetMovieDetailsQuery(id) : useGetTVDetailsQuery(id);
  const { data, isFetching } = DetailQuery;

  const getCredits =
    type === "movie" ? useGetMovieCreditsQuery(id) : useGetTVCreditsQuery(id);
  const { data: credits } = getCredits;

  const Director = credits?.crew?.find((crew) => crew?.job === "Director");
  const Writer = credits?.crew?.find((crew) => crew?.job === "Writer");

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const formatRuntime = (minutes) => {
    if (!minutes) return "N/A";
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };
  useEffect(()=>{
    window.scroll(0,0)
  },[id])

  if (isFetching) {
    return (
      <div className="p-10">
        <Skeleton variant="rectangular" height={500} width="100%" />
        <Skeleton variant="text" className="mt-4" />
        <Skeleton variant="text" width={250} className="mt-2" />
        <Skeleton variant="text" className="mt-2" />
      </div>
    );
  }

  return (
    <div className="text-white mt-10 px-6 md:px-16">
      <div className="md:flex gap-10">
        <div className="w-[350px] h-[500px] md:w-[700px] mx-auto md:mx-0">
          <img
            src={
              data?.backdrop_path
                ? `${imgBaseUrl}${data.backdrop_path}`
                : "/placeholder.jpg"
            }
            alt={data?.title || data?.name || "No Image Available"}
            className="h-full w-full object-cover rounded-lg"
          />
        </div>

        <div className="mt-6 md:mt-0">
          <h1 className="text-3xl font-bold">
            {data?.title || data?.name}
            <span className="text-gray-400">
              ({data?.release_date || data?.first_air_date.slice(0, 4)})
            </span>
          </h1>
          <p className="italic text-gray-400 text-lg mt-2">{data?.tagline}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {data?.genres?.map((genre) => (
              <span
                key={genre?.id}
                className="bg-red-700 text-white px-3 py-1 rounded-full text-sm"
              >
                {genre?.name}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <CircularProgress
              size="lg"
              determinate
              value={data?.vote_average * 10}
              color="danger"
            >
              <span className="text-white text-lg font-bold">
                {data?.vote_average?.toFixed(1)}
              </span>
            </CircularProgress>
            <PlayButton />
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold">Overview</h2>
            <p className="mt-2 text-gray-300">
              {data?.overview || "No overview available."}
            </p>
          </div>

          <div className="mt-6 flex gap-4 text-gray-300">
            <p>
              <span className="text-white font-semibold">Status:</span>{" "}
              {data?.status || "N/A"}
            </p>
            <p>
              <span className="text-white font-semibold">Release Date:</span>{" "}
              {formatDate(data?.release_date)}
            </p>
            <p>
              <span className="text-white font-semibold">Runtime:</span>{" "}
              {formatRuntime(data?.runtime)}
            </p>
          </div>
          <hr className="text-gray-400 mt-3.5" />

          <div className="mt-3.5 text-gray-300">
            <p>
              <span className="text-white font-semibold">Director:</span>{" "}
              {Director?.name || "Not Available"}
            </p>
            <hr className="text-gray-400 mt-3.5" />
            <p className="mt-2">
              <span className="text-white font-semibold">Writer:</span>{" "}
              {Writer?.name || "Not Available"}
            </p>
            <hr className="text-gray-400 mt-3.5" />
          </div>
        </div>
      </div>
      <Cast />
      <YtVideos />
      <SimilarMovies />
      <RecommandMovies />
    </div>
  );
};

export default Details;
