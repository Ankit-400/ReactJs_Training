import { Link, useNavigate, useParams, redirect, useSubmit, useNavigation } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query'

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { fetchEvent, queryClient, updateEvent } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {

  const params = useParams();
  const { state } = useNavigation();
  const submit = useSubmit();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
    staleTime: 10000
  });

  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     const newEvent = data.event;

  //     await queryClient.cancelQueries({ queryKey: ['events', params.id] })
  //     // The cancelQueries method can be used to cancel outgoing queries based on their query keys or any other functionally accessible property/state of the query.

  //     const previousEvent = queryClient.getQueryData(['events', params.id]);
  //     // getQueryData is a synchronous function that can be used to get an existing query's cached data. If the query does not exist, undefined will be returned.
  //     // This isto store the previous state of the cached data, which will be usefull to rollback our optimistic update.

  //     queryClient.setQueryData(['events', params.id], newEvent)
  //     // It is a synchronous function that can be used to immediately update a query's cached data. If the query does not exist, it will be created. If the query is not utilized by a query hook in the default cacheTime of 5 minutes, the query will be garbage collected. To update multiple queries at once and match query keys partially, you need to use queryClient.setQueriesData instead.

  //     return { previousEvent }
  //   },
  //   // This function will fire before the mutation function is fired and is passed the same variables the mutation function would receive. Can be used for performing *optimistic updates (Explanation is at below).
  //   // This will be executed right when you call mutate. This props accepts function as a value and will get object as parameter which we have passed to the mutate.   
  //   // The value returned from this function will be passed to both the onError and onSettled functions in the event of a mutation failure and can be useful for rolling back optimistic updates.

  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(['events', params.id], context.previousEvent)
  //   },
  //   // This function will fire if the mutation encounters an error and will be passed the error.
  //   // error - with which it failed
  //   // data - sent data to backend for mutation, which can be considered as latest data.
  //   // context - Contains previous data which must be returned by the onMutate prop.

  //   onSettled: () => {
  //     queryClient.invalidateQueries(['events', params.id])
  //     // So that refetch will be triggered.
  //   }
  //   // This function will fire when the mutation is either successfully fetched or encounters an error and be passed either the data or error
  // })

  const navigate = useNavigate();

  function handleSubmit(formData) {
    // mutate({ id: params.id, event: formData })
    // navigate('../')

    submit(formData, { method: 'PUT' });
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if (isPending) {
    content = (
      <div className='center'>
        <LoadingIndicator />
      </div>
    )
  }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            'Failed to load event. Please check your inputs and try again later.'
          }
        />
        <div className='form-actions'>
          <Link to='../' className='button'>Okay</Link>
        </div>
      </>
    )
  }


  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {
          state === 'submitting' ? (
            <p>Sending data...</p>
          ) : (
            <>
              <Link to="../" className="button-text">
                Cancel
              </Link>
              <button type="submit" className="button">
                Update
              </button>
            </>
          )
        }
      </EventForm>
    )
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id })
  })
}

// We are using features of rect router along with tanstack query. The useQuery hook will trigger the request when the component is rendered. But we wanted to load the data earlier, which can be achieved by using the feature of react-router's loader function. 
// queryClient is able to generate or trigger the fetch request programatically using the fetchQuery. This function accepts the same configuration object as useQuery. It returns promise of data.
// There are some props which are available for useQuery and not for fetchQuery like onSuccess, onSettle, onError, enabled etc.

// Now when the component is about to render, this loader function will be executed and the data will be fetched from API. This response will be cached. Now when the component renders, useQuery will also trigger the fetch, but it will found data into cache and will return the same data. But at the same time it will also send req behind the scene to just re-validate and check the data. If the data is different there, cached data will be updated and the displayed data will also update accordingly. 

// But wait....we have just cached the data right before loading the component. So data will be same. So no need to fetch again. So to avoid this fetch staleTime prop is there which indicates time in milliseconds after data is considered stale. This value only applies to the hook it is defined on.

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData });
  await queryClient.invalidateQueries(['events'])
  return redirect('../');
}