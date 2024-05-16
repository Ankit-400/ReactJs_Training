import { Link, useNavigate } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation } from '@tanstack/react-query';
import { createNewEvent } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { queryClient } from '../../util/http.js';

export default function NewEvent() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        // Write the key of the query whose data you wanted to refetch immediatly. This will refetch all the query data which has this key element included in its key array. 
        // exact: true
        // If you wanted to refetch the query which exactly mathces this key, then  we have exact prop.
      });
      navigate('/events');
      // After successful execution of the mutation function this navigation will take place, but our newly added event will not be listed on our homepage. Although if we switch tab for once then our new event will be listed as changing the tab triggers the refetch. 

      // What if we wanted immediate refetch?
      // In that case our queryClient provides us the feature to do that. It allows us to mark the data as stale or outdated which is connected with any query, and so that it triggers the refetch of data.
      // This allows us to invalidate one or more query which them triggers immediate refetch.
    }
  })

  // Here mutationKey is not mandatory as here we are not storing some data on frontend side instead we are sending the POST req to the backend.

  function handleSubmit(formData) {
    console.log(formData);
    mutate({ event: formData });


    // After mutating the state, we can simply navigate to any other page like /events. But then this navigation will take place every time independently of success of mutation.
    // That's why we have another prop called onSuccess in useMutation hook, which only executes if our mutation is successful.
  }

  return (
    <Modal onClose={() => navigate('../')}>
      <EventForm onSubmit={handleSubmit}>
        {isPending && 'Submitting...'}
        {
          !isPending && <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Create
            </button>
          </>
        }
      </EventForm>
      {
        isError && (
          <ErrorBlock
            title="Failed to create event"
            message={
              error.info?.message || 'Failed to create event. Please check your inputs and try again later!'
            }
          />
        )
      }
    </Modal >
  );
}
