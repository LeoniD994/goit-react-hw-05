import { NavLink } from 'react-router-dom';
import './NotFoundPage.module.css';

const NotFoundPage = () => (
  <div>
    <h1>Page not found</h1>
    <NavLink to="/">Go to Home</NavLink>
  </div>
);

export default NotFoundPage;
