import { NavLink } from "react-router";

function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/movies">Movies</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;