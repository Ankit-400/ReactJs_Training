import { useQuery } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { fetchEvents } from '../../util/http';
import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorBlock from '../UI/ErrorBlock';
import EventItem from './EventItem';

export default function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTerm] = useState(undefined);

  const { isPending, isLoading, data, isError, error } = useQuery({
    queryKey: ['events', { searchTerm: searchTerm }],
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),
    // Some default data is passed to the fetchEvents() which is provided by the quryFn.
    // enabled: searchTerm !== ''
    enabled: searchTerm !== undefined
  });


  // Here initially, we do  not have any search term entered, so we are getting full list of events as we do not have any criteria to filter or search the list of events. But we want to request the data only when there is some search term enterd by user in the search box. 
  // The prop enabled (bool) is there to control the request.
  // The behaviour we wanted to achieve,
  // Initially no events should be there.
  // If searchTerm then fetch the events accordingly.
  // If user then clears the search bar, show all the events without filtering.
  // So enabled: searchTerm !== '' will not work as expected here.
  // Initialize the searchTerm with undefined.

  // The logical meaning of the request is diabled is that req is pending, so data is not arrived and so the spinner will be displayed until the data arrives there. 

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  let content = <p>Please enter a search term to find events..!!</p>


  if (isLoading) content = <LoadingIndicator />

  if (isError)
    content = (
      <ErrorBlock
        error={error}
        title="An error occurred"
        message={error.info?.message || 'Failed to fetch events.'}
      />
    )

  if (data)
    content = (
      <ul className='events-list'>
        {
          data.map(event => (
            <li key={event.id}>
              <EventItem event={event} />
            </li>
          ))
        }
      </ul >
    )

  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}


// isLoading vs isPending => isLoading will not be true in case of the req is disabled. (isPending will be true although.)