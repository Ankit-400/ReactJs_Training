import { Await, defer, json, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from '../components/EventItem'
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventDetail() {

    // const data = useRouteLoaderData('event-detail');
    // This hooks allows us to access data returned by any loader of RENDERED component which is present at anywhere in entire route tree. Trying to access data from not-rendered component's loader function then it will be undefined.
    // console.log(data);

    const { event, events } = useRouteLoaderData('event-detail');
    return <>

        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={event}>
                {(loadedEvent) => <EventItem event={loadedEvent} />}
            </Await>
        </Suspense>
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={events}>
                {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
        </Suspense>


    </>
}

export default EventDetail;

async function loadEvent(id) {
    const response = await fetch('http://localhost:8080/events/' + id);
    if (!response.ok) {
        throw json({ message: 'Unable to fetch the event detail. Invalid event!' }, { status: 500 })
    }
    else {
        const resData = await response.json();
        return resData.event;
    }
}

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        throw json({ message: 'Could not fetch events.' }, { status: 500 });
    } else {
        const resData = await response.json();
        return resData.events;
    }
}

export async function loader({ request, params }) {
    const id = params.eventId;

    return defer({
        event: await loadEvent(id),
        events: loadEvents()
    })

    // In case we have multiple async req in defer like showed above, we can control that component should be rendered after completion of which req.?
    // For each we have to write separate combination of suspense and await or else it will wait untill all the data inside one component is rendered completely.

    // await keyword inside defer indicates that you must wait for loadvent

}



export async function action({ params, request }) {
    const eventId = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method
    });
    if (!response.ok) {
        throw json({ message: 'Could not delete event..!!' }, { status: 500 })
    }
    return redirect('/events');
}