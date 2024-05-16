import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';

import { useQuery } from '@tanstack/react-query'
import { fetchEvents } from '../../util/http.js';


export default function NewEventsSection() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', { max: 3 }],
    // every fetch request (get request in the end) we are sending should have this unique key which will be then used by tanstack query internallyto cache the data that's yielded by that request so that the response from thet request could be reused in the future if we are trying to send the same request again.
    // we also can confgure that for how long should be stored and reused by tanstack query. 
    // This key is actully an array which can be of heterigeneous type (having string, bool, array, obj atbthe same type) which will be stored internally.
    // When we are reusing the similar array with simiar values, the existing data will be re-used. The sequence of the value doens not matter at all.  
    // Since query keys uniquely describe the data they are fetching, they should include any variables you use in your query function that change.

    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] })
    // Function in which we defined the actual code that will be executed that will send the actual request.
    // Technically we even do not need to send the request here, as it just wants a function who returns the promise.
  });

  // isError will only work if the code which sends the http request throws the error on getting the error.
  // error is a object that contains the detail about the error

  // This hook now behind the scene sends http request using the function provided by use, and gets us the data, details about loading state and potential errors.

  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock title="An error occurred"
        message={error.info?.message || "Failed to fetch events"
        } />
    );
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <hr />
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}


// in order to use react query and the useQuery hook, we must wrap the components that do want to use these features with a special provider component provoided by react query.


