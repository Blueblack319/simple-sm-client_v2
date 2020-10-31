import React, { useContext, useEffect, useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth";

const MenuBar = () => {
  const { userData, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substring(1);
  const [activeItem, setActiveItem] = useState(path);
  useEffect(() => {
    setActiveItem(path);
  }, [path]);

  const handleItemClicked = (e, { name }) => {
    setActiveItem(name);
  };

  const menuBar = userData ? (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name={userData.userName}
        active
        onClick={handleItemClicked}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item name='logout' onClick={logout} as={Link} to='/' />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size='massive' color='teal'>
      <Menu.Item
        name='home'
        active={activeItem === "home"}
        onClick={handleItemClicked}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === "login"}
          onClick={handleItemClicked}
          as={Link}
          to='/login'
        />
        <Menu.Item
          name='signup'
          active={activeItem === "signup"}
          onClick={handleItemClicked}
          as={Link}
          to='/signup'
        />
      </Menu.Menu>
    </Menu>
  );

  return menuBar;
};

export default MenuBar;
