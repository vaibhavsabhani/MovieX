import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNDU0MDNjYzY4YTM3OGYwNjk4YjU3MWViMDhhNGE2ZSIsIm5iZiI6MTczOTI3MjEyOS41NDcwMDAyLCJzdWIiOiI2N2FiMmZjMTZiZTZhYjZlMTM5Yjk2MjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.PGcK5-lsEou8HaaKJU2OYAoyWj-8y4Yyrp_kR9bWc-Y";

const ApiSlice = createApi({
  reducerPath: "ApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${API_TOKEN}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({

    getTrendingdayMovies: builder.query({
      query: () => "/trending/movie/day",
    }),
    getTrendingweekMovies: builder.query({
      query: () => "/trending/movie/week",
    }),
    getPopularMovies: builder.query({
      query: () => "/movie/popular",
    }),
    getPopularShows: builder.query({
      query: () => "/tv/popular",
    }),
    getTopRatedMovies: builder.query({
      query: () => "/movie/top_rated",
    }),
    getTopRatedShows: builder.query({
      query: () => "/tv/top_rated",
    }),
    getExploreMovies: builder.query({
      query: ({ page = 1, sort = "popularity.desc", genres = [] }) => {
        const genreQuery = genres.length ? `&with_genres=${genres.join(",")}` : "";
        return `/discover/movie?language=en-US&include_adult=false&page=${page}&sort_by=${sort}${genreQuery}`;
      },
    }),
    getExploreTVShows: builder.query({
      query: ({ page = 1, sort = "popularity.desc", genres = [] }) => {
        const genreQuery = genres.length ? `&with_genres=${genres.join(",")}` : "";
        return `/discover/tv?language=en-US&include_adult=false&include_null_first_air_dates=false&page=${page}&sort_by=${sort}${genreQuery}`;
      },
    }),
    getGenres: builder.query({
      query: () => "/genre/movie/list?language=en-US",
    }),
    getTVGenres: builder.query({
      query: () => "/genre/tv/list?language=en-US",
    }),
    getMovieDetails: builder.query({
      query: (id) => `/movie/${id}?language=en-US`,
    }),
    getMovieCredits: builder.query({
      query: (id) => `/movie/${id}/credits?language=en-US`,
    }),
    getMovieVideo: builder.query({
      query: (id) => `/movie/${id}/videos`,
    }),
    getTVDetails: builder.query({
      query: (id) => `/tv/${id}?language=en-US`,
      transformResponse: (response, meta) => {
        if (meta.response.status === 404) {
          console.error(`TV show with ID ${id} not found.`);
        }
        return response;
      },
    }),
    getTVCredits: builder.query({
      query: (id) => `/tv/${id}/credits?language=en-US`,
      transformResponse: (response, meta) => {
        if (meta.response.status === 404) {
          console.error(`TV show credits for ID ${id} not found.`);
        }
        return response;
      },
    }),
    getTVVideo: builder.query({
      query: (id) => `/tv/${id}/videos`,
      transformResponse: (response, meta) => {
        if (meta.response.status === 404) {
          console.error(`TV show videos for ID ${id} not found.`);
        }
        return response;
      },
    }),
    getSearch: builder.query({
      query: ({ searchTerm, page = 1 }) => 
        `search/movie?query=${encodeURIComponent(searchTerm)}&page=${page}&api_key=YOUR_API_KEY`,
    }),    
    getMoviesRecommandation:builder.query({
      query:(id)=>`/movie/${id}/recommendations`
    }),
    getTVShowsRecommandation:builder.query({
      query:(id)=>`/tv/${id}/recommendations`
    }),
    getMovieSimilar:builder.query({
      query:(id)=>`/movie/${id}/similar`
    }),
    getTVShowSimilar:builder.query({
      query:(id)=>`/tv/${id}/similar`
    })
  }),
});

export const {
  useGetTrendingdayMoviesQuery,
  useGetTrendingweekMoviesQuery,
  useGetPopularMoviesQuery,
  useGetPopularShowsQuery,
  useGetTopRatedMoviesQuery,
  useGetTopRatedShowsQuery,
  useGetExploreMoviesQuery,
  useGetExploreTVShowsQuery,
  useGetGenresQuery,
  useGetTVGenresQuery,
  useGetMovieDetailsQuery,
  useGetTVDetailsQuery,
  useGetSearchQuery,
  useGetMovieCreditsQuery,
  useGetMovieVideoQuery,
  useGetTVCreditsQuery,
  useGetTVVideoQuery,
  useGetMoviesRecommandationQuery,
  useGetTVShowsRecommandationQuery,
  useGetMovieSimilarQuery,
  useGetTVShowSimilarQuery
} = ApiSlice;

export default ApiSlice;
