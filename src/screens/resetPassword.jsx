import React, { Component } from "react";
import "../App.css";
import { resetPassword } from "../services/userServices";
import Buttons from "../components/button";
import Inputs from "../components/input";
import Snackbar from "@material-ui/core/Snackbar";

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Password: "",
      newPassword: "",
      snackBarMessage: ""
    };
    this.baseState = this.state;
  }
  handlePasswordChange = event => {
    const Password = event.target.value;
    this.setState({ Password: Password });
  };

  handlenewPasswordChange = event => {
    const newPassword = event.target.value;
    this.setState({ newPassword: newPassword });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.Password === "") {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Password cannot be empty"
      });
    } else if (this.state.newPassword === "") {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Confirm Password cannot be empty"
      });
    } else if (this.state.Password.length < 6) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Password must be of atleast 6 characters long"
      });
    } else if (this.state.newPassword.length < 6) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Confirm Password must be of atleast 6 characters long"
      });
    } else if (this.state.Password !== this.state.newPassword) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Passwords doesn't match!"
      });
    } else {      
      event.preventDefault();
      let current_url = window.location.pathname;
      let verify_user_token = current_url.substr(15);
      console.log(verify_user_token);
      console.log("current ", current_url);

      resetPassword(this.state.Password, verify_user_token)
        .then(response => {
          console.log(response);
          this.setState({
            openSnackBar: true,
            snackBarMessage: "Password changed successfully"
          });
          this.props.history.push("/login");
        })
        .catch(err => {
          console.log(err);
      console.log("Errrrrrrrrrrrrrrrrrr");
          
          this.setState({
            openSnackBar: true,
            snackBarMessage: "Please Try Again.."
          });
        });
    }
  };

  handleSnackClose = () => {
    this.setState({
      openSnackBar: false
    });
  };
  render() {
    return (
      <div id="ResetPassword">
        <center>
          <div id="Resetpwd">
            <Inputs
              type={"password"}
              className={"form-control"}
              id={this.state.Password}
              name={"Password"}
              placeholder={"New Password"}
              value={this.state.Password}
              onChange={this.handlePasswordChange}
            />
            {"  "}
            <Inputs
              type={"password"}
              className={"form-control"}
              id={this.state.newPassword}
              name={"confirmPassword"}
              placeholder={"Confirm Password"}
              value={this.state.newPassword}
              onChange={this.handlenewPasswordChange}
            />
          </div>
        </center>
        <div id="Login_Forgot_Buttons">
          <Buttons
            label={"Submit"}
            color={"primary"}
            title={"Submit"}
            onClick={this.handleSubmit}
          />
        </div>

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
