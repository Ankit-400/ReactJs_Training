import { Link, NavLink, useNavigate } from "react-router-dom";
import classes from './MainNavigation.module.css'

function MainNavigation() {

    const navigate = useNavigate();

    function handleNavigate() {
        navigate('/products');
    }

    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        {/* <Link to="/">Home</Link> */}
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? classes.active : undefined}
                            style={({ isActive }) => ({ textAlign: isActive ? 'center' : 'left' })}
                            end
                        // this end prop indicates that this current link must only be active if the current active route sends with this path after the url. It accepts bool value
                        >Home</NavLink>
                        {/* Navlink can be considered as the replacement of Link tag with some new functionalities */}
                        {/* A <NavLink> is a special kind of <Link> that knows whether or not it is "active", "pending", or "transitioning".  */}
                        {/* Obj is a object which you will get in the argument of the callback function. This callback is provided to you in attributes like className and style etc..(may be all the attributes). This is object has the proeprty isActive and according to which we can manage the effect of color of individual nav element. */}

                        <NavLink to="/products" end>
                            {({ isActive, isPending, isTransitioning }) => {
                                console.log(isActive, isPending, isTransitioning);
                                return <span className={isActive ? "active" : ""}>   Tasks</span>
                            }
                            }
                        </NavLink>

                    </li>
                    <li>
                        {/* <Link to='/products'>Products</Link> */}
                        <NavLink to='/products' aria-current>Products</NavLink>
                        <button onClick={handleNavigate}>Click For Products</button>
                    </li>
                </ul>
            </nav>
        </header >
    )
}

export default MainNavigation;
// Different props avilable in navlink element

// end - element will only be marked active if ending URL matches excatly for to link.
// caseSensitive - changes the matching logic to make it case sensitive.