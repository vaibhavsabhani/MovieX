import MovieList from "../../Components/MovieList";
import { useGetPopularMoviesQuery, useGetPopularShowsQuery, useGetTopRatedMoviesQuery, useGetTopRatedShowsQuery, useGetTrendingdayMoviesQuery, useGetTrendingweekMoviesQuery } from "../../store/Slices/ApiSlice";
import SearchBar from "./SearchBar";

export const HomePage = () => {
    return (
        <>
            <div>
                <SearchBar />
            </div>
            <div>
                <MovieList
                    title="Trending"
                    moviesQuery={useGetTrendingdayMoviesQuery}
                    showsQuery={useGetTrendingweekMoviesQuery}
                    defaultType="trendingMovie"
                    toggleTitle1="day"
                    toggleTitle2="week"
                />
                <MovieList
                    title="Popular"
                    moviesQuery={useGetPopularMoviesQuery}
                    showsQuery={useGetPopularShowsQuery}
                    defaultType="popularMovie"
                />
                <MovieList
                    title="Top Rated"
                    moviesQuery={useGetTopRatedMoviesQuery}
                    showsQuery={useGetTopRatedShowsQuery}
                    defaultType="topRatedMovie"
                />
            </div>
        </>
    );
};