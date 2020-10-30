import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";

import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { AuthProvider } from "./context/auth";

function App() {
  console.log();
  const [activeItem, setActiveItem] = useState(
    window.location.pathname.split("/")[1] === ""
      ? "home"
      : window.location.pathname.split("/")[1]
  );

  const handleItemClicked = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <div className='App'>
      <Container>
        <AuthProvider>
          <Router>
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
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
            </Switch>
          </Router>
        </AuthProvider>
      </Container>
    </div>
  );
}

export default App;
