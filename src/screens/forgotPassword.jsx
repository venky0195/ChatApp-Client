import React, { Component } from "react";
import "../App.css";
import { forgotPassword } from "../services/userServices";
import Buttons from "../components/button";
import Inputs from "../components/input";
import Snackbar from "@material-ui/core/Snackbar";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      openSnackBar: false,
      snackBarMessage: ""
    };
  }
  handleuserNameChange = event => {
    const userName = event.target.value;
    this.setState({ userName: userName });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.userName === "") {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Please enter your Email"
      });
    } else if (
      !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.userName)
    ) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Enter valid Email"
      });
    } else {
      forgotPassword(this.state.userName);
    }
  };
  handleSnackClose = () => {
    this.setState({
      openSnackBar: false
    });
  };

  render() {
    return (
      <div id="ForgotPassword">
        <center>
          <h3> Forgot Password?</h3>
          <h5>Enter the email address associated with your account.</h5>

          <Inputs
            type={"email"}
            className={"noControl"}
            id={this.state.userName}
            name={"Email"}
            placeholder={"Email"}
            value={this.state.userName}
            onChange={this.handleuserNameChange}
          />
          <div id="Forgot_Button">
            <Buttons
              label={"Next"}
              color={"primary"}
              title={"Submit"}
              onClick={this.handleSubmit}
            />
          </div>
        </center>

        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          open={this.state.openSnackBar}
          autoHideDuration={5000}
          onClose={this.handleSnackClose}
          variant="error"
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id"> {this.state.snackBarMessage} </span>}
          action={[
            <div key="undo">
              <Buttons
                label={"X"}
                color={"primary"}
                title={"close"}
                onClick={this.handleSnackClose}
              />
            </div>
          ]}
        />
      </div>
    );
  }
}
