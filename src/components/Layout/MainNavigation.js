import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authctx=useContext(AuthContext)
  const isLoggIn=authctx.isLoggedIn
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
         {!isLoggIn&& <li>
            <Link to='/auth'>Login</Link>
          </li>}
         {isLoggIn && <li>
            <Link to='/profile'>Profile</Link>
          </li> }
          <li>
           {isLoggIn && <button>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
