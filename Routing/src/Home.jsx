import { Link } from "react-router-dom";

function Home() {
    return <>
        <h3>This is your Home Page</h3>
        <span>
            <Link to='/products'>Goto Products Page</Link>
        </span>
    </>
}

export default Home;