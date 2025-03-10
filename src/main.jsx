import { createRoot } from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import Store from './store/Store.jsx';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import App from './App.jsx';
import Movies from './Components/Movies.jsx';
import TVShows from './Components/TVShows.jsx';
import Search from './Components/Search.jsx'
import Details from './Components/Details.jsx';

const MainLayout = () => (
  <Provider store={Store}>
    <div className='bg-[#020c1b]'>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  </Provider>
);

const Router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <App /> }, 
      { path: 'movies', element: <Movies /> }, 
      { path: 'TVShows', element: <TVShows/> }, 
      { path: '*', element: <Navigate to="/" replace /> }, 
      { path: 'Search/multi', element:<Search/> },
      { path: "details/:type/:id", element: <Details /> }
    ],
  },
]);


if (location.pathname !== "/") {
  location.replace("/");
} else {
  createRoot(document.getElementById('root')).render(
    <RouterProvider router={Router} />
  );
}
