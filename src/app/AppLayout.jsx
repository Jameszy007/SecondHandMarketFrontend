import { Link, Outlet } from "react-router-dom";

export default function AppLayout() {
	return (
		<div>
			<nav className="position-absolute top-0 w-100 d-flex justify-content-between">
				<div className="w-auto">
					<Link to="/">Home</Link>
					<Link to="/items">Listing</Link>
					<Link to="/profile">Profile</Link>
				</div>
				<div className="w-auto">
					<Link to="/login">Log in</Link>
				</div>
			</nav>

			<hr />

			<div>
				<Outlet />
			</div>
		</div>
	);
}
