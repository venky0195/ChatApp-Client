import React, { Component } from "react";
import "../App.css";
import { userLogin } from "../services/userServices";
import Buttons from "../components/button";
import Inputs from "../components/input";
import Snackbar from "@material-ui/core/Snackbar";
import { Button } from "antd";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: ""
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.registrationclick = this.registrationclick.bind(this);
  }

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSnackClose = () => {
    this.setState({
      openSnackBar: false
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.Username) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Username cannot be empty..!"
      });
    } else if (!this.state.Password) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Password cannot be empty..!"
      });
    } else if (
      !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.Username)
    ) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Invalid Username..!"
      });
    } else if (this.state.Password.length < 6) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Password must be of atleast 6 characters long..!"
      });
    } else {
      var data = {
        Username: this.state.Username,
        Password: this.state.Password
      };
      userLogin(data)
        .then(response => {
          console.log(response);
          this.setState({
            openSnackBar: true,
            snackBarMessage: "Login Successful!!"
          });
          localStorage.setItem("Sender", this.state.Username);
          this.props.history.push("/dashboard");
        })
        .catch(err => {
          console.log(err);
          this.setState({
            openSnackBar: true,
            snackBarMessage: "Login failed!!"
          });
        });
    }
  };
  registrationclick = e => {
    e.preventDefault();
    this.props.history.push("/register");
  };
  forgotPasswordClick = e => {
    e.preventDefault();
    this.props.history.push("/forgotPassword");
  };
  render() {
    return (
      <div class="Login">
        <div id="header">
          <h1>Welcome to ChatApp!</h1>
        </div>

        <center>
          <div id="Email">
            <Inputs
              type={"email"}
              className={"form-control"}
              id={this.state.Username}
              name={"Username"}
              placeholder={"Username"}
              value={this.state.Username}
              onChange={this.onChange}
            />
          </div>
          <div id="Password">
            <Inputs
              type={"password"}
              className={"form-control"}
              id={this.state.Password}
              name={"Password"}
              placeholder={"Password"}
              value={this.state.Password}
              onChange={this.onChange}
            />
          </div>
          <div id="Login_Forgot_Buttons">
            <Buttons
              label={"Login"}
              color={"primary"}
              title={"SignIn"}
              onClick={this.handleSubmit}
            />
            <Buttons
              label={"Forgot Password??"}
              color={"primary"}
              title={"Click to reset your password!"}
              onClick={this.forgotPasswordClick}
            />
          </div>
          <center>
            <Buttons
              label={"Register"}
              color={"secondary"}
              title={"Click to Register!"}
              onClick={this.registrationclick}
            />
          </center>
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
              <Button
                key="undo"
                color="primary"
                size="small"
                onClick={this.handleSnackClose}
              >
                X
              </Button>
            </div>
          ]}
        />
      </div>
    );
  }
}
