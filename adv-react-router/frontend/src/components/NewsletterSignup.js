// import { Form } from 'react-router-dom';
import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {

    const fetcher = useFetcher();

    // useFetcher provides form and related properties like load, submit etc, which is generally used when we do not want to transit to another route.
    // When using Form from react-router-dom , we will be re-directed to the route we have passed.

    // useFetcher is used when wanted to access the loader or action function of any other route, without navigating to that perticuler route. We can call and access the data returned by them by staying on the same route. if trying to do do with normal form, then we will be re-directed to that route.

    // To access action function any other route, <fetcher.Form></fetcher.Form> is used, which will call the action function of route mentioned in action attribute. 
    // To access the loader function of any other route, fetcher.laod('/route') is used, ehich will call the loader function of route mentioned in the argument.

    const { data, state } = fetcher;

    useEffect(() => {
        if (state === 'idle' && data && data.message)
            window.alert(data?.message);
    }, [data, state]);

    return (
        <fetcher.Form method="post" action='/newsletter' className={classes.newsletter}>
            <input
                type="email"
                placeholder="Sign up for newsletter..."
                aria-label="Sign up for newsletter"
            />
            <button>Sign up</button>
        </fetcher.Form>

        // This form is provided by fetcher which doesn't cause re-render.
    );
}

export default NewsletterSignup;