import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { AuthProvider } from "./context/auth";
import MenuBar from "./components/MenuBar/MenuBar";
import SinglePost from "./pages/SinglePost/SinglePost";

function App() {
  return (
    <div className='App'>
      <Container>
        <AuthProvider>
          <Router>
            <MenuBar />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route exact path='/posts/:postId' component={SinglePost} />
            </Switch>
          </Router>
        </AuthProvider>
      </Container>
    </div>
  );
}

export default App;
