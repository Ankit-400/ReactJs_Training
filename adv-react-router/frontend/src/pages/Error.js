import { useRouteError } from "react-router-dom";
import PageContent from "../components/PageContent";

function ErrorPage() {

    const error = useRouteError();
    console.log(error);
    // This hook is provided by react-router=dom which is used to get the thrown object. 
    // If the response or response using Response constructor is thrown then error will reflect status code as special status field which represents status of the response we throw. 

    // If we have thrown any simple js object or anything else then there will be no special field like status. error will be simply that thrown object.

    // That's why we have Response constructor to throw the error so that we can get the extra special property called status and which will help us to build generic error handling component. 

    let title = 'An error occurred!';
    let message = 'Something went wrong!';
    if (error.status === 500) {
        message = JSON.parse(error.data).messgae;
    }

    if (error.status === 404) {
        title = 'Not found!'
        message = 'Could not find resource or page.'
    }

    return <PageContent title={title}>
        <p>{message}</p>
    </PageContent>
}

export default ErrorPage;