import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

function EditEvent() {

    const data = useRouteLoaderData('event-detail');
    // console.log(data);

    return <>
        {/* <h1>Edit Event Page...!!</h1> */}
        <EventForm method="PATCH" event={data.event} />
    </>
}

export default EditEvent;