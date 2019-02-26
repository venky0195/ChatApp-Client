import React, { Component } from "react";
import "../App.css";
import { userRegister } from "../services/userServices";
import Buttons from "../components/button";
import Inputs from "../components/input";
import Snackbar from "@material-ui/core/Snackbar";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      Email: "",
      Password: "",
      confirmPassword: "",
      snackBarMessage: ""
    };
    this.baseState = this.state;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleuserfirstNameChange = this.handleuserfirstNameChange.bind(this);
    this.handleuserlastNameChange = this.handleuserlastNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleconfirmPasswordChange = this.handleconfirmPasswordChange.bind(this);
  }
  
  loginClick = e => {
    e.preventDefault();
    this.props.history.push("/login");
  };
  resetForm = () => {
    this.setState(this.baseState);
  };
  handleuserfirstNameChange = event => {
    const firstName = event.target.value;
    this.setState({ firstName: firstName });
  };

  handleuserlastNameChange = event => {
    const lastName = event.target.value;
    this.setState({ lastName: lastName });
  };

  handleuserEmailChange = event => {
    const Email = event.target.value;
    this.setState({ Email: Email });
  };

  handlePasswordChange = event => {
    const Password = event.target.value;
    this.setState({ Password: Password });
  };

  handleconfirmPasswordChange = event => {
    const confirmPassword = event.target.value;
    this.setState({ confirmPassword: confirmPassword });
  };
  handleSnackClose = () => {
    this.setState({
      openSnackBar: false
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    if (this.state.firstName === "") {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "First Name cannot be empty!"
      });
    } else if (this.state.lastName === "") {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Last Name cannot be empty!"
      });
    } else if (this.state.Email === "") {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Email cannot be empty!"
      });
    } else if (
      !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.Email)
    ) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Please enter a valid Email."
      });
    } else if (this.state.Password === "") {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Password cannot be empty!"
      });
    } else if (this.state.Password.length < 6) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Password must be of atleast 6 characters long!"
      });
    } else if (this.state.confirmPassword === "") {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Confirm Password cannot be empty!"
      });
    } else if (this.state.Password !== this.state.confirmPassword) {
      this.setState({
        openSnackBar: true,
        snackBarMessage: "Passwords doesn't match"
      });
    } else {
      var data = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        Email: this.state.Email,
        Password: this.state.Password
      };
      console.log("register log===>",data);
      
      userRegister(data)
        .then(response => {
          console.log(response);
          this.setState({
            openSnackBar: true,
            snackBarMessage: "Registration Successful!"
          });
          this.props.history.push("/login");
        })
        .catch(err => {
          console.log(err);
          this.setState({
            openSnackBar: true,
            snackBarMessage: "User with email address already exists!!"
          });
        });
    }
  };
  render() {
    return (
      <div class="Register">
        <div calss="bg-img" />
        <div id="header">
          <h1>User Registration</h1>
        </div>
        <center>
          <div id="Name">
            <Inputs
              type={"text"}
              className={"form-control"}
              id={this.state.firstName}
              name={"firstName"}
              placeholder={"First Name"}
              value={this.state.firstName}
              onChange={this.handleuserfirstNameChange}
            />
            {"    "}
            <Inputs
              type={"text"}
              className={"form-control"}
              id={this.state.lastName}
              name={"lastName"}
              placeholder={"Last Name"}
              value={this.state.lastName}
              onChange={this.handleuserlastNameChange}
            />
          </div>
          <div id="Email">
            <Inputs
              type={"email"}
              className={"form-control"}
              id={this.state.Email}
              name={"Email"}
              placeholder={"Email"}
              value={this.state.Email}
              onChange={this.handleuserEmailChange}
            />
          </div>
          <div id="Passwordss">
            <Inputs
              type={"password"}
              className={"form-control"}
              id={this.state.Password}
              name={"Password"}
              placeholder={"Password"}
              value={this.state.Password}
              onChange={this.handlePasswordChange}
            />
            {"-"}
            <Inputs
              type={"password"}
              className={"form-control"}
              id={this.state.confirmPassword}
              name={"confirmPassword"}
              placeholder={"Confirm Password"}
              value={this.state.confirmPassword}
              onChange={this.handleconfirmPasswordChange}
            />
          </div>
          <div id="Login_Forgot_Buttons">
            <Buttons
              label={"Submit"}
              color={"primary"}
              title={"Submit"}
              onClick={this.handleSubmit}
            />
            {"   "}
            <Buttons
              label={"Reset"}
              color={"link"}
              title={"Reset"}
              onClick={this.resetForm}
            />
          </div>
          <div id="headerMem">Already Member? </div>
          <div id="alreadyMember">
            <Buttons
              label={"login"}
              color={"outlined"}
              title={"Sign-in"}
              onClick={this.loginClick}
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
