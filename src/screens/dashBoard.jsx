import React, { Component } from "react";
import "../dashboard.css";
import Sidebar from "react-sidebar";
import AppBar from "../components/appBar";
import { Button, MenuItem, TextField } from "@material-ui/core";
import { chatServices, userChatArray } from "../services/chatServices";

import myIcon from "../assets/baseline-face-24px.svg";
import sendIcon from "../assets/send-button.svg";
import userIcon from "../assets/male.svg";

import io from "socket.io-client";
const socket = io.connect("http://localhost:4000");

export default class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onlineUser: [],
      MsgArray: [],
      sidebarOpen: false,
      isUserSelected: false,
      message: "",
      MsgDisplay: "",
      Receiver: "",
      Sender: "",
      msg: []
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
  componentDidMount() {
    chatServices()
      .then(result => {
        this.setState({
          onlineUser: result.data.result
        });
        console.log("onlineUser", result.data.result);
      })
      .catch(error => {
        alert(error);
      });

    userChatArray()
      .then(result => {
        this.setState({
          MsgArray: result.data.result
        });
        console.log("chat history is :", this.state.MsgArray);
      })
      .catch(error => {
        alert(error);
      });

    const Sender = localStorage.getItem("Sender");
    socket.on(Sender, res => {
      console.log("response in dash board========>", res);
      const msg = this.state.msg;
      msg.push(res);
      this.setState({ msg: msg });
      console.log("this set msg====>", this.state.msg);
    });
  }
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  loginLink = e => {
    e.preventDefault();
    this.props.history.push("/login");
  };

  handleClick = (key, event) => {
    this.setState({ anchorEl: null });
    let Receiver = event.target.textContent;
    this.setState({ Receiver: Receiver });
    this.setState({ sidebarOpen: false });
    this.setState({ isUserSelected: true });
    localStorage.setItem("reciever", Receiver);
  };

  handleMessage = e => {
    this.setState({ message: e.target.value });
  };
  handleEnter = event => {
    if (event.which === 13) {
      this.handleSubmit(event);
    }
  };
  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.message) {
      this.props.history.push("/dashBoard");
    } else if (this.state.isUserSelected === false)
      this.props.history.push("/dashboard");
    else {
      const Sender = localStorage.getItem("Sender");
      this.setState({ Sender: Sender });
      console.log("Sender is :", Sender);
      console.log("Selected receiver: ", this.state.Receiver);
      const data = {
        senderId: Sender,
        recieverId: this.state.Receiver,
        message: this.state.message
      };
      socket.emit("new_msg", data);
      this.setState({
        message: "",
        anchorEl: null
      });
    }
  };
  render() {
    const msg = this.state.MsgArray.map(key => {
      return (
        <div>
          {key.senderId === localStorage.getItem("Sender") ? (
            key.recieverId === this.state.Receiver ? (
              <div className="box1 sb1">
                {
                  <label>
                    <i>
                      <u>{key.senderId}</u>
                    </i>
                    :
                  </label>
                }
                <div>{key.message}</div>
              </div>
            ) : null
          ) : null}
          {key.senderId === this.state.Receiver ? (
            <div className="box2 sb2">
              <label>
                {" "}
                <i>
                  <u>{key.senderId}</u>
                </i>
                :
              </label>
              <div>{key.message} </div>
            </div>
          ) : null}
        </div>
      );
    });

    const onlineUser = this.state.onlineUser.map(users => {
      if (users.Email !== localStorage.getItem("Sender")) {
        return (
          <div overflow="auto">
            <MenuItem onClick={event => this.handleClick(users, event)}>
              {users.Email}
            </MenuItem>
          </div>
        );
      } else {
        return true;
      }
    });

    const MsgDisplay = this.state.msg.map(key => {
      return (
        <div>
          {key.recieverId === localStorage.getItem("reciever") ? (
            key.senderId === this.state.Sender ? (
              <div className="box1 sb1">
                <label>
                  <i>
                    <u>{key.senderId}</u>
                  </i>
                  :
                </label>
                <div>{key.message}</div>
              </div>
            ) : null
          ) : null}
          {key.senderId === this.state.Receiver ? (
            <div className="box2 sb2">
              <label>
                <i>
                  <u>{key.senderId}</u>
                </i>
                :
              </label>
              <div>{key.message}</div>
            </div>
          ) : null}
        </div>
      );
    });
    return (
      <div className="dashboard">
        <div className="appbar">
          <AppBar />
        </div>
        <div className="sidebar">
          <Sidebar
            sidebar={
              <div>
                <Button
                  variant="extendedFab"
                  onClick={() => this.onSetSidebarOpen(false)}
                >
                  <b>X</b>
                </Button>
                <div className="onlineUsers">{onlineUser}</div>
              </div>
            }
            open={this.state.sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            styles={{ sidebar: { background: "silver" } }}
          >
            <div className="openButton">
              <Button
                variant="raised"
                onClick={() => this.onSetSidebarOpen(true)}
              >
                Show Users
              </Button>
            </div>
          </Sidebar>
        </div>
        <div id="buttonalter">
          <Button color="inherit" onClick={this.loginLink}>
            Logout
            <img src={myIcon} alt="Logout" />
          </Button>
        </div>
        <div id="loggedInAs">
          <p>
            <h6>Logged in as: {localStorage.getItem("Sender")}</h6>
          </p>
        </div>
        <div className="chatHeader1">
          <center>
            <img src={userIcon} alt="user" /> {this.state.Receiver}
          </center>
        </div>
        <div className="chatboxes" />
        <div id="chatscreen">
          <div className="chatboxes">
            {msg}
            {MsgDisplay}
          </div>
        </div>
        <div className="containerButton">
          <TextField
            type="textfield"
            value={this.state.message}
            placeholder="Write a Message.."
            onChange={this.handleMessage}
            onKeyPress={this.handleEnter}
            variant="filled"
            InputProps={{
              disableUnderline: true
            }}
          />
        </div>
        <div>
          <Button
            id="send"
            type="submit"
            variant="contained"
            color="primary"
            title="click on send"
            onClick={this.handleSubmit}
          >
            <img src={sendIcon} alt="Send" />
          </Button>
        </div>
      </div>
    );
  }
}
