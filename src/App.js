import React, { Component } from "react";
import Login from "./screens/login";
import Register from "../src/screens/register";
import forgotPassword from "../src/screens/forgotPassword";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import resetPassword from "./screens/resetPassword";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="App">
            {<Route path="/login" component={Login} />}
            <Route path="/forgotPassword" component={forgotPassword} />
            <Route path="/register" component={Register}/>
            <Route path="/resetPassword" component={resetPassword}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
