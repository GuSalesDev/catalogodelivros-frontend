import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Sidebar.css';

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Catálogo</h2>

      <nav className="sidebar-nav">
        <NavLink to="/livros" className="sidebar-link">
          Livros
        </NavLink>
        <NavLink to="/autores" className="sidebar-link">
          Autores
        </NavLink>
        <NavLink to="/categorias" className="sidebar-link">
          Categorias
        </NavLink>
      </nav>

      <button className="sidebar-logout" onClick={handleLogout}>
        Sair
      </button>
    </aside>
  );
}

export default Sidebar;