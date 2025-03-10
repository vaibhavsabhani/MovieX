import { useEffect, useRef, useState } from "react";
import { useGetPopularMoviesQuery, useGetPopularShowsQuery } from "../store/Slices/ApiSlice";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CircularProgress } from "@mui/joy";
import { Link } from "react-router-dom";

const PopularMovieList = () => {
    const [showData, setShowData] = useState([]);
    const [defaultData, setDefaultData] = useState("popularMovies");
    const { data: popularMovies } = useGetPopularMoviesQuery();
    const { data: popularShows } = useGetPopularShowsQuery();
    const scrollRef = useRef(null);

    useEffect(() => {
        if (defaultData === "popularMovies" && popularMovies?.results?.length) {
            setShowData(popularMovies.results);
        } else if (defaultData === "popularShows" && popularShows?.results?.length) {
            setShowData(popularShows.results);
        }
    }, [popularMovies, popularShows, defaultData]);

    const formatDate = (dateString) => {
        if (!dateString) return "Unknown Date";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        });
    };

    const imgBaseUrl = "https://image.tmdb.org/t/p/w500/";

    const scroll = (offset) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += offset;
        }
    };

    return (
        <>
            <div className="mt-4 flex text-white items-center justify-between text-xl md:text-3xl w-[90%] lg:w-[75%] mx-auto">
                <h2 className="font-extrabold text-xl md:text-2xl lg:text-3xl text-white">What's Popular</h2>
                <div className="flex gap-2.5 items-center justify-center">
                    <h2
                        onClick={() => setDefaultData("popularMovies")}
                        className={`cursor-pointer text-sm md:text-xl lg:text-2xl px-4 py-1 rounded-md transition-all duration-300 ${defaultData === "popularMovies"
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                            : "hover:text-blue-800"
                            }`}
                    >
                        Movies
                    </h2>
                    <h2
                        onClick={() => setDefaultData("popularShows")}
                        className={`cursor-pointer px-2 py-1 text-sm md:text-xl lg:text-2xl rounded-md transition-all duration-300 ${defaultData === "popularShows"
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                            : "hover:text-blue-800"
                            }`}
                    >
                        TV Shows
                    </h2>
                </div>
            </div>

            <div className="relative w-[90%] lg:w-[75%] mx-auto text-white mt-4">
                <button
                    className="lg:flex absolute left-0 top-[45%] transform -translate-y-1/2 bg-gray-900 p-3 rounded-full z-10"
                    onClick={() => scroll(-1000)}
                >
                    <FaChevronLeft size={15} />
                </button>
                <button
                    className="lg:flex absolute right-0 top-[45%] transform -translate-y-1/2 bg-gray-900 p-3 rounded-full z-10"
                    onClick={() => scroll(1000)}
                >
                    <FaChevronRight size={15} />
                </button>
                <div ref={scrollRef} className="flex gap-4 overflow-x-auto lg:overflow-x-hidden scroll-smooth no-scrollbar">
                {showData.map((movie, index) => {
    const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');  // If no media_type, fall back to checking 'title'

    return (
        <Link to={`/details/${mediaType}/${movie.id}`} key={movie.id}>
            <div className="shrink-0 w-[120px] sm:w-1/3 md:w-[180px] lg:w-[200px] max-w-[250px]">
                <div className="lg:h-[350px] w-full flex items-center justify-center">
                    {movie.poster_path ? (
                        <img
                            src={`${imgBaseUrl}${movie.poster_path}`}
                            className="rounded-2xl w-full h-full object-cover"
                            alt={movie.title || movie.original_name}
                        />
                    ) : (
                        <div className="h-full w-full bg-gray-700 flex items-center justify-center rounded-2xl">
                            <p className="text-white text-xs">No Image</p>
                        </div>
                    )}
                </div>
                <h2 className="text-white text-xs md:text-lg text-left mt-6 relative line-clamp-1">
                    {movie.title || movie.original_name}
                </h2>
                <p className="text-xs text-left">{formatDate(movie.release_date || movie.first_air_date)}</p>
                <CircularProgress
                    className="absolute z-10 bottom-22 left-3 bg-white border-2 text-white"
                    size="md"
                    determinate
                    value={movie.vote_average * 10}
                    color="danger"
                >
                    <span className="text-[10px] md:text-[12px] lg:text-[14px] font-bold">{movie.vote_average.toFixed(1)}</span>
                </CircularProgress>
            </div>
        </Link>
    );
})}

                </div>
            </div>
        </>
    );
};

export default PopularMovieList;
