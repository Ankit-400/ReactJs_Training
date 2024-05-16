import { useIsFetching } from '@tanstack/react-query'

export default function Header({ children }) {
  const fetching = useIsFetching();
  // This hook is used to check that whether there is any fetching currently going on right now or not.
  // return 0 for no ongoing fetching, greater value for ongoing fetch.
  return (
    <>
      <div id="main-header-loading">
        {fetching > 0 && <progress />}
      </div>
      <header id="main-header">
        <div id="header-title">
          <h1>React Events</h1>
        </div>
        <nav>{children}</nav>
      </header>
    </>
  );
}
