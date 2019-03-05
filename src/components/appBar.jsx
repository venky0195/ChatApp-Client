import React from "react";
import AppBar from "@material-ui/core/AppBar";
import "../dashboard.css";
export default class SimpleAppBar extends React.Component {
  render() {
    return (
      <div className="root">
        <AppBar position="static">
          <h1 id="heading">ChatApp</h1>
        </AppBar>
      </div>
    );
  }
}
