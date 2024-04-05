import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { ACTION_TYPES } from '../reducers/logonReducer';
import { AppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
import '../styles/headerStyles.css';

function Header() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);

  const logout = () => {
    dispatch({ type: ACTION_TYPES.LOGOUT });
    navigate('/');
  };

  return (
    <header>
      <ul className="headerStyle">
        <li>
          <p>Hanaro Album</p>
        </li>
        {state.isLogon && (
          <li>
            <span>
              {state.userId}. {state.userName}
            </span>
            <button type="button" onClick={logout}>
              Sign Out
            </button>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
