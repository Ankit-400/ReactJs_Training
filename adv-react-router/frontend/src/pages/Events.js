import { Suspense } from 'react';
import EventsList from '../components/EventsList';
import { Await, defer, json, useLoaderData } from 'react-router-dom';

function EventsPage() {

    // const data = useLoaderData();
    // We can use useLoaderData() in the element that's assigned to a route and in all the components that might be used inside that element. Simple means that data can be used at same level or lower level routes only.(As now it only works for same level or current route. To access data returned by any rendered component in entire route tree, we have useRouteLoaderData hook)
    // So this can also be used inside EventsList component which is inside components folder as it is as lower level then where the laoder function is actually used. 

    // Downside of useLoaderData is that component will not be rendered untill the data is ready for displaying. User may fill that nothing is happening during the time of fetching the data from server.  

    // if (data.isError) return <p>{data.message}</p>
    // const events = data.events;
    // return <EventsList events={events} />


    const { events } = useLoaderData();
    return <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
        <Await resolve={events}>
            {(loadEvents) => <EventsList events={loadEvents} />}
        </Await>
    </Suspense>

    // Wer cannor use data returned by defer as reguler data. We have to use Await component provided by react router dom which has resolve attribute accepting one of the defered key value.
    // Once the data is there, one dynamic funcion will be executed. As the argument of this function we will get out desired and fulfilled result from promise which will be passd to the component.
    // The suspense component is a component which can be used in certain situationsto show a fallback whilst waiting for other data  to arrive.


}

export default EventsPage;

async function loadEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // return { isError: true, message: 'Could not fetch events..' }

        // Another ways
        // throw { message: 'Could not fetch events..' }
        // this will be thrown when the error will occur in fetching the data. If errorElement is mentioned for this perticular route then it will be rendered or else error will be bubbledup to the parent route. Error will bubble up until the errorElement found. 


        // throw new Response(JSON.stringify({ messgae: 'Could not fetch events..!!' }), { status: 500 })
        throw json({ message: 'Could not fetch events.' }, { status: 500 });
    } else {
        // we do not have to get response data from response by doing response.json() as useLoaderData will automatically extract data from the response.
        // return response;

        const resData = await response.json();
        return resData.events;
    }
}

export function loader(arg) {
    console.log("loader from events called..!!", arg.request);
    return defer({
        events: loadEvents()
    })
}

// This loader code will not execute on a server. This is still all hapenningin the browser here. => Client side code

// We can return anytype of data in loader like number, text, object or Response object.
// In browser we can create new Response object => new Response(any-data, {extra object})

// Now whenever we return such a response in your loaders, react router package will automatically extract the data(first arg) from your response, when using useLoaderData();

// We cannot use React Hooks inside our loader function as they can only be used inside components only and loader is not a component.

// -----------
// If the return statement is written in the laoder function that means that we are giving some value which will be extracted by useLoaderData hook. After that we can check the that data and check the response that is it required response from API only or any other object as fallback object. It will not break the flow of execution of the code.

// And if we have written throw statement in loader then it means we are getting error as throw represents error. So as soon as error encountered, the closest errorComponent from router definition will be executed. The object or data thrown by us will be extracted by useRouteError hook. This will be written in the error component mentioned in router definition.

// ---------------
// json() function is alternative way of writing the Response object manually. It creates the response object that includes data in json format. We simply pass our data that should be included in our response to json(). We do not need to convert the data in JSON manually. As second argument we can mention response metadata.
// Now when using json() for throwing the data, we do not need to parse the data at the time of using that by useRouteError hook.


// The idea behind defer is that we have a value that eventually resolve to another value, which is the definition promises itself. And we wanted to load the component and render the component even though that future value isn't there yet.
// defer is used when we wanted to tell react router that load the page without waiting for the events to fully loaded.
// Bundle up all the async req in to the defer function with object.(Call the method and do not just pass reference, and store the result into some key)



export function thisFunction() {
    console.log('Loader or action function called....');
    return {
        name: 'Ankit',
        age: 30
    }
}