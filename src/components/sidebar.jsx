import React from "react";
import Sidebar from "react-sidebar";
import "../dashboard.css";
import Button from "@material-ui/core/Button";
import chatServices from "../services/chatServices";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      sidebarOpen: false
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }
  componentDidMount() {
    chatServices()
      .then(result => {
        this.setState({
          users: result.data.result
        });
        console.log("users", result.data.result);
      })
      .catch(error => {
        alert(error);
      });
  }
  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  render() {
    const users = this.state.users.map(users => (
      <div>
        <div id="temporary" key={users._id}>
          <div id="butt">
            <Button variant="contained" onClick={this.loginLink}>
              {users.Email}
            </Button>
          </div>
        </div>
      </div>
    ));
    return (
      <Sidebar
        sidebar={
          <div>
            <Button
              variant="extendedFab"
              onClick={() => this.onSetSidebarOpen(false)}
            >
              <b>X</b>
            </Button>
            {users}
          </div>
        }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{ sidebar: { background: "transperent" } }}
      >
        <div className="openButton">
          <Button variant="raised" onClick={() => this.onSetSidebarOpen(true)}>
            Show Users
          </Button>
        </div>
      </Sidebar>
    );
  }
}

export default App;
