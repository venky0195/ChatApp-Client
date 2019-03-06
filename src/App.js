/******************************************************************************
 *  @Purpose        : We import all the pages and components by using specific path and route them
 *  @file           : App.js        
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 05-03-2019
 ******************************************************************************/
import React, { Component } from "react";
import Login from "./screens/login";
import Register from "../src/screens/register";
import forgotPassword from "../src/screens/forgotPassword";
import { BrowserRouter as Router, Route } from "react-router-dom";
import dashBoard from "../src/screens/dashBoard";
import "./App.css";
import resetPassword from "./screens/resetPassword";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <Route path="/login" component={Login} />
            <Route path="/" exact component={Login} />
            <Route path="/forgotPassword" component={forgotPassword} />
            <Route path="/register" component={Register} />
            <Route path="/resetPassword" component={resetPassword} />
            <Route path="/dashBoard" component={dashBoard} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
