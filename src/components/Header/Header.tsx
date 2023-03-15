import styles from './Header.module.scss';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.headerNav}>
        <NavLink to='/' className={styles.link}>
          Main
        </NavLink>
        <NavLink to='/about' className={styles.link}>
          About us
        </NavLink>
      </nav>
    </header>
  );
};
