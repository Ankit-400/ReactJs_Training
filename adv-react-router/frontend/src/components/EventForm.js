import { Form, json, redirect, useActionData, useNavigate, useNavigation } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {

  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData();
  // It gives us access to the data returned by our action (closest action, may be for old version only)

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method='POST' className={classes.form}>
      {/* If we want to trigger the action of any other route then we should mention that route with actionattribute. Or if we wanna trigger the action  of the currently active route, we do not need action prop. */}

      {
        data && data.errors && (
          <ul>
            {
              Object.values(data.errors).map(err => (
                <li key={err}>{err}</li>
              ))
            }
          </ul>
        )
      }
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : ''} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}> {isSubmitting ? 'Submitting..' : 'Save'} </button>
      </div>
    </Form >
  );
}

export default EventForm;

export async function action({ request, params }) {
  console.log(request);
  const data = await request.formData();

  const newEventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description')
  }
  console.log(newEventData);

  let url = 'http://localhost:8080/events';
  if (request.method === 'PATCH') url = url + '/' + params.eventId;

  const response = await fetch(url, {
    method: request.method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newEventData)
  })

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Unable to add new event...!!' }, { status: 500 })
  }

  return redirect('/events');
}
