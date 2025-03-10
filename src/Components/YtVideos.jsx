import React from "react";
import {
  useGetMovieVideoQuery,
  useGetTVVideoQuery,
} from "../store/Slices/ApiSlice";
import { useParams } from "react-router-dom";

const YtVideos = () => {
  const { type, id } = useParams();
  const ytBaseUrl = "https://www.youtube.com/embed/";

  const getVideo =
    type === "movie" ? useGetMovieVideoQuery(id) : useGetTVVideoQuery(id);
  const { data } = getVideo;
  console.log(data);

  return (
    <div>
      <h1 className="text-2xl font-bold mt-10 text-white">Official Videos</h1>
      <div className="flex  gap-2 overflow-x-auto mt-5 no-scrollbar">
        {data?.results?.length > 0 ? (
          data?.results?.map((video) => (
            <div key={video?.id}>
              <iframe
                src={`${ytBaseUrl}${video?.key}`}
                title="YouTube video player"
                className="rounded-2xl h-[150px]"
                allowFullScreen
              ></iframe>
            </div>
          ))
        ) : (
          <p> No video Available</p>
        )}
      </div>
    </div>
  );
};

export default YtVideos;
