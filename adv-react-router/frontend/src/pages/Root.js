import { Outlet, useNavigation } from "react-router-dom"
import MainNavigation from "../components/MainNavigation";

function Root() {
    const navigation = useNavigation();
    // Helps us to findout whether we're currently in an active transition (if we're loading data) or we have no active transaction going on. Mainly it has 3 states -> idle, loading and  submitting 
    // There are other alternatives too.

    return <>
        <MainNavigation />
        <hr />
        <main>
            {navigation.state === 'loading' && <p>Loading...!!!</p>}
            <Outlet />
        </main>
    </>
}

export default Root;