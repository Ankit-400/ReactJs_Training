import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  // const navigation = useNavigation();

  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token == 'EXPIRED') {
      submit(null, { action: '/logout', method: 'POST' });
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'POST' })
    }, tokenDuration);
    // This will not work always as expected. This will be reset after we refresh the page, as will start from first again.
    // Therefore the better approach to handle this token timeout is using expiration token.(in Authentication.js) 

  }, [token, submit])

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
