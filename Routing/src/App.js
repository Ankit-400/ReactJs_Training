import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import { createRoutesFromElements, Route } from 'react-router-dom'
import Home from './Home';
import Products from './Products';
import RootLayout from './Root';
import Error from './Error';
import ProductDetail from './ProductDetail';

// old way to use react router dom is using createRoutesFromElements() from react-router-dom

// const routeDefinition = createRoutesFromElements(
//   <Route>
//     <Route path='/' element={<Home />} />
//     <Route path='/' element={<Products />} />
//   </Route>
// )
// const router = createBrowserRouter(routeDefinition);


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />
//   },
//   {
//     path: '/products',
//     element: <Products />
//   },

// ]);

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // It is fixed to render this element when the above mentioned path matched
    errorElement: <Error />,
    children: [
      { path: '', element: <Home /> },
      // { index: true, element: <Home /> },
      { path: '/', element: <div>Hii : <Home /></div> },
      { path: 'products', element: <Products /> },
      { path: 'products/:productId', element: <ProductDetail /> }
    ]
    // Then according to the matching route in this children array of objs, the corresponding components will be rendered. 
    // If wrong route is specified in URL which is not present in this array then it will be considered as error. 
    // Element of first matched route from children array will be rendered. So write them in proper order too.
    // '' or '/' - refers to the URL like : https://localhost:3000/ -> Homepage, whichever route we have mentioned first in children array will be rendered.
    // In case of multiple objects with same path, the object that comes earlier, it's component will be rendered.

    // About style of writing paths
    // Absolute path - Starting of path with '/' indicates the absolute path which will be appended to the end of domain name. It does not deal with the parent route.
    // Relative path - Do not start path with '/'. This will add your path after the wrapper parent route. The path will be added after the currently active routes path.

    // If we wanted to load any component when the parent route itself is matched with the URL then we can achieve this via writing just an empty path string...which will be considered as rendering the component when the url is same as parent route.

    // But to handle this we have another solution called, index routes. This allows you to define the default route that should be loaded if the parent route is active. Special index prop is there accepting true for loading the component as per mentioned above. Means path: '' or index: true. 

    // when to use children prop?  =>  When we want to keep one component on page and wants to change the sub-part of page by rendering any other component based on route present on URl then we should go with children.
    // - Component that we have wirtten in child route will be passed to the Outlet component always which we should import in parent to render that component. Without using Outlet we cannot use the component written for some child route.

  }
])

function App() {
  return <RouterProvider router={router} />;
}

export default App;