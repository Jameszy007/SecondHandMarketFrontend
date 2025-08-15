import { Link, Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/items">Listing</Link>
      </nav>

      <hr />

      <div>
        <Outlet />
      </div>
    </div>
  );
}