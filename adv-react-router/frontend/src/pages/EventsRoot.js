import { Outlet } from "react-router-dom";
import EventsNavigation from '../components/EventsNavigation'

function EventsRoot() {
    return <>
        <h2>This is events root page</h2>
        <hr style={{ width: '80%' }} />
        <EventsNavigation />
        <Outlet />
    </>
}

export default EventsRoot;