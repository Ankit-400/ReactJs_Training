import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// import BlogPage, { loader as postsLoader } from './pages/Blog';
// It is called loaded eagerly.
import HomePage from './pages/Home';
// import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';

const BlogPage = lazy(() => import('./pages/Blog'));
const PostPage = lazy(() => import('./pages/Post'));
// const BlogPage = () => import('./pages/Blog');   This is not valid component as it is not returning JSX.

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          // { index: true, element: <BlogPage />, loader: postsLoader },
          {
            index: true,
            element: <Suspense fallback={<p>Loading...</p>}><BlogPage /></Suspense>,
            loader: () => import('./pages/Blog').then(module => module.loader()) // importing function lazily
          },

          // It only imports when it is neeeded. Here when we try to visit BlogPage, the loader function will be executed which will trigger the import.


          { path: ':id', element: <Suspense fallback={<p>Loading...</p>}><PostPage /></Suspense>, loader: async (meta) => (await import('./pages/Post')).loader(meta) },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;


// When using import as a function, it takes file to the path and returns a promise, as it is async task because the file it is importing can be too big so it must not stop the execution.
// Instead of then we can also use async await.