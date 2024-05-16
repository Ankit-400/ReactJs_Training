import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Movie from './components/Movie';
import { Provider } from 'react-redux'
import movieStore from '../redux/store';
import { getMovies } from '../redux/feature/movieSlice';
import { useDispatch } from 'react-redux';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/movie/:movieId',
      element: <Movie />
    }
  ])

  return (
    <RouterProvider router={router}>
      <Provider store={movieStore}>
        <div>
          App.js is calling..!!
        </div>
      </Provider>
    </RouterProvider>
  )
}

export default App
