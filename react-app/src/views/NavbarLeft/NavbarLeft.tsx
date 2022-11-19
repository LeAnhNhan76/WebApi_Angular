import './index.scss';
import MenuLeft from './MenuLeft/MenuLeft';
import NavbarProfile from './Profile/Profile';
import NavbarTitle from './Title/Title';

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