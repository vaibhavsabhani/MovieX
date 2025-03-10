import { useEffect, useRef, useState } from 'react';
import { useGetTopRatedMoviesQuery, useGetTopRatedShowsQuery } from '../store/Slices/ApiSlice';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CircularProgress } from '@mui/joy';
import { Link } from 'react-router-dom';

const TopRatedList = () => {
    const [showData, setShowData] = useState([]);
    const [defaultData, setDefaultData] = useState("topRatedMovie");
    const { data: topRatedMovie } = useGetTopRatedMoviesQuery();
    const { data: topRatedShow } = useGetTopRatedShowsQuery();
    const scrollRef = useRef(null);
    console.log(topRatedMovie);
    console.log(topRatedShow);

    useEffect(() => {
        if (defaultData === "topRatedMovie" && topRatedMovie?.results) {
            setShowData(topRatedMovie.results);
        } else if (defaultData === "topRatedShow" && topRatedShow?.results) {
            setShowData(topRatedShow.results);
        }
    }, [topRatedShow, topRatedMovie, defaultData]);

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
                <h2 className="font-extrabold text-xl md:text-2xl lg:text-3xl text-white">Top Rated</h2>
                <div className="flex gap-2.5 items-center justify-center">
                    <h2
                        onClick={() => setDefaultData("topRatedMovie")}
                        className={`cursor-pointer text-sm md:text-xl lg:text-2xl px-4 py-1 rounded-md transition-all duration-300 ${defaultData === "topRatedMovie" ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" : "hover:text-blue-800"}`}
                    >
                        Movies
                    </h2>
                    <h2
                        onClick={() => setDefaultData("topRatedShow")}
                        className={`cursor-pointer px-4 text-sm md:text-xl lg:text-2xl py-1 rounded-md transition-all duration-300 ${defaultData === "topRatedShow" ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" : "hover:text-blue-800"}`}
                    >
                        TV Shows
                    </h2>
                </div>
            </div>

            <div className="relative w-[90%] lg:w-[75%] mx-auto text-white mt-4">
                <button
                    className="hidden lg:flex absolute left-0 top-[45%] transform -translate-y-1/2 bg-gray-900 p-3 rounded-full z-10"
                    onClick={() => scroll(-1000)}
                >
                    <FaChevronLeft size={15} />
                </button>
                <button
                    className="hidden lg:flex absolute right-0 top-[45%] transform -translate-y-1/2 bg-gray-900 p-3 rounded-full z-10"
                    onClick={() => scroll(1000)}
                >
                    <FaChevronRight size={15} />
                </button>
                <div ref={scrollRef} className="flex gap-4 overflow-x-auto lg:overflow-x-hidden scroll-smooth no-scrollbar">
                    {showData.map((movie, index) => {
                        const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');  // If no media_type, fall back to checking 'title'

                        return (
                            <Link to={`/details/${mediaType}/${movie.id}`} key={movie.id}>
                                <div key={index} className="shrink-0 w-[120px] sm:w-1/3 md:w-[180px] lg:w-[200px] max-w-[250px]">
                                    {movie.poster_path ? (
                                        <img
                                            src={`${imgBaseUrl}${movie.poster_path}`}
                                            className="rounded-2xl w-full h-auto"
                                            alt={movie.title}
                                        />
                                    ) : (
                                        <div className="h-40 bg-gray-700 flex items-center justify-center rounded-2xl">
                                            <p className="text-white text-xs">No Image</p>
                                        </div>
                                    )}
                                    <h2 className="text-white text-xs md:text-lg text-left mt-7 relative line-clamp-1">{movie.title || movie.original_name}</h2>
                                    <p className="text-xs text-left">{formatDate(movie.release_date || movie.first_air_date)}</p>
                                    <CircularProgress
                                        className="absolute z-10 bottom-21 md:bottom-24 lg:bottom-24 left-3 bg-white border-2"
                                        size="md"
                                        determinate value={movie.vote_average * 10}
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

export default TopRatedList;
