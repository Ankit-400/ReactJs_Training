import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";

function RootLayout() {
    return <>
        <MainNavigation />
        <Outlet />
        {/* Marks the place where the child routes shuold be rendered. */}
        {/* Outlet represents the component which we will get according to the matched path from the array of objects from router definition. */}
    </>
}

export default RootLayout;