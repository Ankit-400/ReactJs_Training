import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query'

import Header from '../Header.jsx';
import { deleteEvent, fetchEvent, queryClient } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { useState } from 'react';
import Modal from '../UI/Modal.jsx';

export default function EventDetails() {

  const [isDeleting, setIsDeleting] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id })
  });

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErorDeletion,
    error: errorDeletion

  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none'

        // When we delete the event, we will also invaidate query next subsequent use. When any query is invalidated, react-query will immediatly triggers refetch for that query. As after invalidating the query, we are still on the same page of the specific event, which we have just deleted. So we are getting the error for not finding the event.
        // To avoid this behaviour of react-query we have one prop which is refetchType. Setting it to none will make sure that when we call invalidate queries, these existing queries will not automatically be triggered again immediatly. Instead they will just be invalidated and the next time they are required, they will run again.
        // So after setting this prop on which we are currently at will not trigger again but when we go back to the all events page the queries on that page will be triggered again because that component re-rendered. But the query on the page on which we triggered the deletion, where the component for this page was not re rendered, will not be triggered.  
      })
      navigate('/events');
    }
  });

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  function handleClick() {
    mutate({ id: params.id });
  }

  let content;

  if (isPending) {
    content = (
      <div id="event-details-content" className='center'>
        <p>Fetching event details...</p>
      </div>
    );
  }

  if (isError) {
    content = (
      <div id="event-details-content" className='center'>
        <ErrorBlock
          title="Failed to load the event..!!"
          message={
            error.info?.message || 'Failed to fetch the event data. Please try again later.'
          }
        />
      </div>
    )
  }

  if (data) {

    const formattedDate = new Date(data.date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })

    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{formattedDate} @{data.time}</time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>

    )
  }

  return (
    <>
      {
        isDeleting && (
          <Modal onClose={handleStopDelete}>
            <h2>Are you sure..?</h2>
            <p>
              Do you really want to delete this event? This action cannot be undone.
            </p>
            <div className="form-actions">
              {isPendingDeletion && <p>Deleting, please wait...!!</p>}
              {
                !isPendingDeletion && (<>
                  <button onClick={handleStopDelete} className='button-text'>Cancel</button>
                  <button onClick={handleClick} className='button'>Delete</button>
                </>
                )
              }
            </div>
            {
              isErorDeletion && (
                <ErrorBlock
                  title='Failed to delete event!'
                  message={errorDeletion.info?.message || 'Failed to delete event, please try again later.'}
                />
              )
            }
          </Modal>
        )
      }
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {content}
      </article>
    </>
  );
}
