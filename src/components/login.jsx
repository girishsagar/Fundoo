/**
 * @file: login.jsx
 * @description: user login page its validating an database user .
 * @module:React js and firebase
 * @author :Girish Sagar <girishsagar51@gmail.com>
 * @version :12.11.1 (node)
 * @since :7-dec-2019
 */

import React, { Component } from "react";
import { Card, TextField, Button, IconButton, Avatar } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { withRouter } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { userlogin } from "../controller/userController";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
const thm = createMuiTheme({
  overrides: {
    MuiAvatar: {
      root: {
        left: "10px",
        width: "60px",
        height: "60px"
      },
      colorDefault: {
        backgroundColor: "red",
        marginLeft: "17px",
        marginTop: "-4px",
        left: "7em"
      }
    },
    MuiSvgIcon: {
      root: {
        color: "white",
        width: "220px",
        height: "40px",
        left: "150px"
      }
    }
  }
});
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      password: "",
      snackbarMsg: "",
      showPassword: false,
      snackbarOpen: false
    };
  }
  snackbarClose = e => {
    this.setState({
      snackbarOpen: false
    });
  };
  onRegister = () => {
    this.props.history.push("/register");
  };
  onforgetpass = () => {
    this.props.history.push("/forget");
  };
  handleEmail = event => {
    let Email = event.target.value;
    this.setState({
      Email: Email
    });
  };
  handlepassword = event => {
    let password = event.target.value;
    this.setState({
      password: password
    });
  };
  handleSubmit = () => {
    if (this.state.Email === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Email cann't be empty..!!"
      });
    } else if (
      !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.Email)
    ) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Invalid Email..!"
      });
    } else if (this.state.password === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Password cann't be empty..!!"
      });
    } else if (this.state.password.length < 6) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "password must be of atleast 6 characters long..!"
      });
    } else {
      //navigation to the firbase controller
      const user = {
        Email: this.state.Email,
        password: this.state.password
      };
      userlogin(user, (err, data) => {
        if (err) {
          this.setState({
            snackbarOpen: true,
            snackbarMsg: "err..!",
            Email: "",
            password: ""
          });
        } else {
          if (data === "success") {
            this.setState({
              snackbarOpen: true,
              snackbarMsg: "Login successfully!!"
            });
          }
          //Setting a time out for responsing an a page 4 sec
          setTimeout(() => {
            // this.props.history.push("/dashBoard");
            this.props.history.push("/dashBoard");
            // this.props.histroy.push("/dashBoard");
          }, 2000);
        }
      });
    }
  };
  render() {
    return (
      <div className="fullcard">
        <div className="allinone">
          <Card className="loginCard">
            <MuiThemeProvider theme={thm}>
              <div
                className="fundoo"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontStyle: "italic"
                }}
              >
                {/* <h1 style={{ display: "flex", justifyContent: "center" }}>
                  <span style={{ color: "#2196f3" }}>f</span>
                  <span style={{ color: "#b71c1c" }}>u</span>
                  <span style={{ color: "#ffc107" }}>n</span>
                  <span style={{ color: "#1976d2" }}>d</span>
                  <span style={{ color: "#43a047" }}>o</span>
                  <span style={{ color: "#b71c1c" }}>o</span>
                </h1> */}
              </div>
              <div className="avatar">
                <Avatar>
                  <LockOutlinedIcon />
                </Avatar>
              </div>
              <div className="login-h2">
                <h1>Sign in</h1>
              </div>
              <div className="loginEmail">
                <TextField
                  required
                  fullWidth
                  // id="outlined-email-input"
                  label="Enter Email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  margin="normal"
                  variant="standard"
                  onChange={event => this.handleEmail(event)}
                />
              </div>
              <div className="loginPassword">
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  margin="normal"
                  variant="standard"
                  onChange={event => this.handlepassword(event)}
                />
              </div>
              <div className="loginButton">
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={this.handleSubmit}
                >
                  Login
                </Button>
              </div>
              <div className="accountbutton">
                <Button color="primary" onClick={this.onRegister}>
                  Create Account
                </Button>
                <Button onClick={this.onforgetpass} color="secondary">
                  Reset Password??
                </Button>
              </div>
            </MuiThemeProvider>
          </Card>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            open={this.state.snackbarOpen}
            autoHideDuration={2000}
            onClose={this.snackbarClose}
            message={<span id="message-id">{this.state.snackbarMsg}</span>}
            action={[
              <IconButton onClick={this.handleClose}>
                <CloseIcon onClick={this.snackbarClose} />
              </IconButton>
            ]}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Login);