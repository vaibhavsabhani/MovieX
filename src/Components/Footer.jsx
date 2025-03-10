import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="text-white bg-black flex flex-col justify-center items-center p-12 ">
        <div>
          <ul className="flex gap-4 mt-2 text-sm font-bold">
            <li className="hover:text-blue-300">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-blue-300">
              <Link to="movies">Movies</Link>
            </li>
            <li className="hover:text-blue-300">
              <Link to="TVShows">TV Shows</Link>
            </li>
          </ul>
        </div>
        <div className="mt-5 md:px-10  lg:px-80  text-[11px] md:text-[13px] text-center flex justify-center items-center flex-col gap-1 text-gray-500 font-extrabold">
          <p className="">
            MovieX is an project in which you can search for movies and tv show
            check their ratings and find movie that you love to watch. You can
            also find the suggestion related to movies and related tv show and
            their full cast and you can also watch some movie or tv shows stuff
            regarding tv shows or movie.
          </p>
        </div>
        <div className="mt-8 text-xl text-blue-400 ">
          <ul className="flex gap-7  ">
            <a href="https://www.facebook.com/">
              <li className="border-none text-blue-500 bg-[#020c1b] rounded-full p-3">
                <FaFacebookF />
              </li>
            </a>
            <a href="https://www.instagram.com/">
              <li className="border-none bg-[#020c1b] rounded-full p-3">
                <FaInstagram />
              </li>
            </a>
            <a href="https://x.com/?lang=en">
              <li className="border-none bg-[#020c1b] rounded-full p-3">
                <FaTwitter />
              </li>
            </a>
            <a href="https://www.linkedin.com/feed/">
              <li className="border-none bg-[#020c1b] rounded-full p-3">
                <FaLinkedin />
              </li>
            </a>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
