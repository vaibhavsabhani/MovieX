import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleButton = () => {
    if (inputValue.trim() !== "") {
      navigate(`/search/multi?query=${encodeURIComponent(inputValue)}`);
    }
  };
  return (
    <>
      <div className="bg-blue-950 text-white text-center flex flex-col items-center px-4 py-10 min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
        <h1 className="font-extrabold text-5xl md:text-7xl lg:text-8xl mt-8 md:mt-16">
          Welcome
        </h1>
        <p className="text-md md:text-2xl  mt-4 max-w-3xl">
          Millions of Movies, TV Shows, and People to Discover. Explore Now.
        </p>
        <div className="flex items-center justify-center w-full max-w-3xl mt-6 lg:mt-10 bg-white rounded-full overflow-hidden shadow-md">
          <input
            type="text"
            className="flex-grow px-4  py-3 md:py-4 lg:py-5 text-gray-700 outline-none text-sm md:text-lg"
            placeholder="Search for a movie or TV show...."
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={handleButton}
            className="px-6 md:px-10 py-3 md:py-4 lg:py-6 text-white font-medium bg-gradient-to-r from-orange-400 to-yellow-500"
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
