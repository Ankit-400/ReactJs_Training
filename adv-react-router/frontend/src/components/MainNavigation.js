// import classes from './MainNavigation.module.css';
// import { NavLink } from 'react-router-dom';

// function MainNavigation() {
//   return (
//     <header className={classes.header}>
//       <nav>
//         <ul className={classes.list}>
//           <li>
//             <NavLink
//               to='/'
//               className={({ isActive }) => isActive ? classes.active : undefined}
//             >
//               Home
//             </NavLink>
//             {/* <NavLink to="/"> is an exceptional case because every URL matches /. To avoid this matching every single route by default, it effectively ignores the end prop and only matches when you're at the root route. */}
//             {/* Because of this we do not need to write end prop in the navLink to root route. */}
//             {/* end prop checks for the route from end in URL and not from start. */}
//           </li>
//           <li>
//             <NavLink
//               to='/events'
//               className={({ isActive }) => isActive ? classes.active : undefined}
//             >
//               Events
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default MainNavigation;



import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;