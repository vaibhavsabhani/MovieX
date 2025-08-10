import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/movix-logo.svg'; // adjust the path based on file location

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [inputValue,setInputValue] = useState("")
  const navigate = useNavigate()
  const handleButton1 =()=>{
    if(inputValue.trim()!==""){
     navigate(`/search/multi?query=${encodeURIComponent(inputValue)}`)
     setIsSearch(!isSearch);
    }
}

  const handleButton = () => {
    setIsOpen(!isOpen);
    if(isSearch)setIsSearch(false)
  };

  const handleSearch = () => {
    setIsSearch(!isSearch);
    if(isOpen)setIsOpen(false)
  };

  return (
    <div className="flex justify-between items-center bg-transparent h-20 text-2xl pr-3 md:pr-9 pl-2.5 shadow-2xl ">
      <div>
        <Link to="/">
          <img className="md:h-14" src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="md:flex hidden text-white">
        <ul className="flex items-center gap-7 cursor-pointer">
          <li className="hover:text-blue-300">
            <Link to="movies">Movies</Link>
          </li>
          <li className="hover:text-blue-300">
            <Link to="TVShows">TV Shows</Link>
          </li>
          <li onClick={handleSearch} className="hover:text-blue-300 cursor-pointer">
            {isSearch ? "❌" : "🔍"}
          </li>
        </ul>
      </div>

      <div className="md:hidden flex items-center gap-3">
        <p onClick={handleSearch} className="cursor-pointer">
          {isSearch ? "❌" : "🔍"}
        </p>
        <div onClick={handleButton} className="cursor-pointer">
          {isOpen ? <GrClose className="text-white" /> : <FaBars className="text-white" />}
        </div>
      </div>

      {isSearch && (
        <div className=" flex absolute top-20 left-1/2 transform -translate-x-1/2 w-full bg-white p-3 rounded-md shadow-lg">
          <input
            type="text"
            className="w-full p-2 text-black text-sm border-none outline-none rounded-md"
            placeholder="Search for a movie or TV show..."
            onChange={(e)=>setInputValue(e.target.value)}

          />
          <p className="cursor-pointer" onClick={handleButton1}>🔍</p>
        </div>
      )}

      {isOpen && (
        <div className="absolute z-10 top-20 left-0 w-full bg-gray-800 text-white text-center p-3 shadow-lg">
          <ul className="flex flex-col items-center py-2.5 gap-4 font-bold cursor-pointer">
            <li className="hover:text-blue-300 w-full text-center">
              <Link to="movies"  onClick={() => setIsOpen(false)}>Movies</Link>
            </li>
            <li className="hover:text-blue-300 w-full text-center">
              <Link to="TVShows"  onClick={() => setIsOpen(false)}>TV Shows</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
