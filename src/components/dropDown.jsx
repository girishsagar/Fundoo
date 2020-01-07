import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  MuiThemeProvider,
  createMuiTheme,
  Menu,
  MenuItem
} from "@material-ui/core";
// import { Signout } from "../controller/userController";
const thm = createMuiTheme({
  overrides: {
    MuiDivider: {
      root: {
        width: "150px",
        top: "50px"
      }
    },
    MuiList: {
      padding: {
        right: "-1222px",
        top: "150px"
      }
    }
  }
});

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  Signout = () => {
    this.props.history.push("/Login");
  };
  render() {
    return (
      <Menu
        id="simple-menu"
        anchorEl={this.props.anchorEl}
        open={Boolean(this.props.anchorEl)}
        onClose={this.props.closeMenu}
      >
        <div className="down">
          <MuiThemeProvider theme={thm}>
            <div className="drop">
              <MenuItem onClick={this.handleClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleClose}>My account</MenuItem>
              <MenuItem onClick={this.handleClose}>Settings</MenuItem>
              <MenuItem onClick={this.Signout}>Logout</MenuItem>
            </div>
          </MuiThemeProvider>
        </div>
      </Menu>
    );
  }
}

export default withRouter(Dropdown);
