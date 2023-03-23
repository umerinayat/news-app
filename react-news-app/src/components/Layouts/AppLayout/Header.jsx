import { Link, NavLink, useNavigate } from 'react-router-dom';
import AuthService from '../../../api-services/authService';
import { useStateContext } from '../../../contexts/ContextProvider';

const Header = () => {

  const {setToken} = useStateContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setToken(null);
    await AuthService.logout();
    navigate('/login');
  }

  return (
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <Link className="navbar-brand font-gh" to="/articles">
          News & Articles
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <NavLink
                className="nav-link"
                to="/articles"
              >
                Search Articles
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink className="nav-link" to="/news">
                News Feed
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto me-3 mb-2 mb-lg-0">
            <button onClick={handleLogout} className="btn btn-sm btn-warning">Logout</button>
          </ul>

        </div>
      </div>
    </nav>
  );
};

export default Header;
