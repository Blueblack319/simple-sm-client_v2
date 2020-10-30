import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Menu, Container } from "semantic-ui-react";

import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Home from "./pages/Home/Home";

function App() {
  const [activeItem, setActiveItem] = useState("home");
  const handleItemClicked = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <div className='App'>
      <Container>
        <Menu pointing secondary size='massive' color='teal'>
          <Menu.Item
            name='home'
            active={activeItem === "home"}
            onClick={handleItemClicked}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name='login'
              active={activeItem === "login"}
              onClick={handleItemClicked}
            />
            <Menu.Item
              name='signup'
              active={activeItem === "signup"}
              onClick={handleItemClicked}
            />
          </Menu.Menu>
        </Menu>
        <Router>
          <Switch>
            <Route exac path='/' component={Home} />
            {/* <Route exac path='/login' component={} */}
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
