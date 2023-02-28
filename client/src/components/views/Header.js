import styles from './Header.module.scss';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUser } from '../../redux/usersRedux';
import { TfiNotepad } from 'react-icons/tfi';

const Header = () => {
  const user = useSelector(getUser);

  return (
    <nav>
      <div className={styles.nav_wrapper}>
        <NavLink to='/' className={styles.logo}>
        <h2>Your<span className={styles.span}>Ads</span> <TfiNotepad/></h2>
        </NavLink>
        <ul className={styles.nav_list}>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? styles.linkActive : undefined
              }
              to='/'
            >
              Home
            </NavLink>
          </li>
          <li>
            {!user && (
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.linkActive : undefined
                }
                to='/login'
              >
                Login
              </NavLink>
            )}
          </li>
          <li>
            {!user && (
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.linkActive : undefined
                }
                to='/register'
              >
                Sign up
              </NavLink>
            )}
          </li>
          <li>
            {user && (
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.linkActive : undefined
                }
                to='/profile'
              >
                Profile
              </NavLink>
            )}
          </li>
          <li>
            {user && (
              <NavLink
                className={({ isActive }) =>
                  isActive ? styles.linkActive : undefined
                }
                to='/logout'
              >
                Logout
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
