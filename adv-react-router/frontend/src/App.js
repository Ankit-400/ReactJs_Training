// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Home from './pages/Home';
// import Events, { loader as eventsLoader } from './pages/Events';
// import EventDetail, { loader as eventDetailLoader, action as onDeleteEvent } from './pages/EventDetail';
// import NewEvent from './pages/NewEvent';
// import EditEvent from './pages/EditEvent';
// import Root from './pages/Root';
// import EventsRoot from './pages/EventsRoot';
// import ErrorPage from './pages/Error';
// import { action as manipulateEventAction } from './components/EventForm'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />
//   },
//   {
//     path: '/events',
//     element: <Events />,
//     children: [
//       {
//         path: ':id',
//         element: <EventDetail />,
//         children: [
//           {
//             path: 'edit',
//             element: <EditEvent />
//           }
//         ]
//       },
//       {
//         path: 'new',
//         element: <NewEvent />
//       }
//     ]
//   }
// ])

// Output of the above mentioned router definition : 
//  / => Home Page...!!
// /events => Events Page...!!
// /events/any-id => Events Page...!! Event Detail Page...!! (ofcourse not in single line..)
// /events/any-id/edit =>  Events Page...!! Event Detail Page...!! Edit Event Page...!!
// /events/new => Events Page...!! New Event Page...!!

// So Use this type of children structure where you want to keep the parent route as it is and change one of the children omponent as per the route.


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Root />,
//     errorElement: <ErrorPage />,
//     children: [
//       { index: true, element: <Home /> },  // instead index: true => path: '' can also be used
//       {
//         path: 'events',
//         element: <EventsRoot />,
//         children: [
//           {
//             index: true,
//             element: <Events />,
//             loader: eventsLoader
//           },
//           {
//             id: 'event-detail',
//             path: ':eventId',
//             loader: eventDetailLoader,
//             children: [
//               { index: true, element: <EventDetail />, action: onDeleteEvent },
//               { path: 'edit', element: <EditEvent />, action: manipulateEventAction }
//             ]
//           },
//           { path: 'new', element: <NewEvent /> },
//         ]
//       }
//     ]
//   }
// ])

// function App() {
//   return <RouterProvider router={router}>
//     <div>App.js page is here.....!!1</div>
//   </RouterProvider>
// }

// export default App;

// genrally to avoid App.js file bloated and keep related things in same components, we put loader logic into the Events page as it is the component where we actually uses the data. So we can say that this data is related to the events page. So we simply keep our loader function inside the Events page.


import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditEventPage from './pages/EditEvent';
import ErrorPage from './pages/Error';
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from './pages/EventDetail';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home';
import NewEventPage from './pages/NewEvent';
import RootLayout from './pages/Root';
import { action as manipulateEventAction } from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';

import { thisFunction } from './pages/Events';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        action: thisFunction,         // demo only
        element: < EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: manipulateEventAction,
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: manipulateEventAction,
          },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;