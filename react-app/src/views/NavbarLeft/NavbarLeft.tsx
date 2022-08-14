import './index.scss';
import NavbarTitle from './Title/Title';
import NavbarProfile from './Profile/Profile';
import MenuLeft from './MenuLeft/MenuLeft';
import { Link } from 'react-router-dom';

const propTypes = {}

const NavbarLeft = () => {
  return (
    <div>
      <NavbarTitle />
      <NavbarProfile />
      <MenuLeft />
    </div>
  );
}

NavbarLeft.propTypes = propTypes;

export default NavbarLeft;