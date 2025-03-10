import Body from "./Components/Body";
import PopularMovieList from "./Components/PopularMovieList";
import TopRatedList from "./Components/TopRatedList";
import TrendingMovieList from "./Components/TrendingMovieList";


 const App = () => {
  return (
    <div className='bg-[#020c1b]'>
    <div className=''>
    <Body/>
    <TrendingMovieList/>
    <PopularMovieList/>
    <TopRatedList/>
    </div>
    </div>
  )
}
export default App;