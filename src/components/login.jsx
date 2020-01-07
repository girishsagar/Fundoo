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
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { userlogin } from "../controller/userController";

const thm = createMuiTheme({
  overrides: {
    MuiAvatar: {
      root: {
        width: "60px",
        height: "60px"
      },
      colorDefault: {
        backgroundColor: "black"
      }
    },
    MuiSvgIcon: {
      root: {
        color: "red",
        width: "200px",
        height: "41px"
      }
    }
  }
});
/**
 * @class : Login
 * @description : loging class is extend from parent calss React Component
 */
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      password: "",
      // openSnackBar: false,
      // SnackbarMsg: ""
      snackbarOpen: false,
      snackbarMsg: ""
    };
  }
  // snackbarClose = e => {
  //   this.setState({ snackbarOpen: false });
  // };
  snackbarClose = e => {
    this.setState({snackbarOpen: false});
  };
  onRegister = () => {
    this.props.history.push("/register");
  };
  onforgetpass = () => {
    this.props.history.push("/forget");
  };

  // handleEmail = event => {
  //   let Email = event.target.value;
  //   this.setState({
  //     Email: Email
  //   });
  // };
  handleEmail = event => {
    let Email = event.target.value;
    this.setState({
      Email: Email
    });
    if (
      Email == !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.Email)
    ) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "Give valid Email-id..!"
      });
    }
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
        snackbarMsg: " Email cannot be empty"
      });
    } else if (this.state.password === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: " passoword cannot be empty "
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
            snackbarMsg: err,
            Email: "",
            password: ""
          });
        } else {
          if (data === "success") {
            this.setState({
              snackbarOpen: true,
              snackbarMsg: "Sign In SucessFull "
            });
          }
          //Setting a time out for responsing an a page 4 sec
          // setTimeout(() => {
            this.props.history.push("/dashBoard");
            // this.props.histroy.push(/dashBoard);
          // }, 2000);
        }
      });
    }
  };
  //form field of page
  render() {
    return (
      <div className="loginpage">
        <Card className="login-card">
          <MuiThemeProvider theme={thm}>
            <div className="avatar">
              <Avatar>
                <LockOutlinedIcon />
              </Avatar>
            </div>
            <div className="loge">Sign in</div>

            <div className="input-field">
              <TextField
                // id="Email"
                name="Email"
                label="Email"
                variant="standard"
                autoFocus
                fullWidth
                required
                onChange={event => this.handleEmail(event)}
                //  onChange={event => this.setState.handleEmail(event.target.value)}
              />
              <div>
                <TextField
                  required
                  id="password"
                  name="password"
                  label="Password"
                  variant="standard"
                  type="password"
                  fullWidth
                  onChange={event => this.handlepassword(event)}
                />
              </div>
              <div className="loginbutton">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={this.handleSubmit}
                >
                  Login
                </Button>
              </div>
              <div className="regbutton">
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={this.onRegister}
                >
                  Register?
                </Button>
              </div>
              <div className="lfbutton">
                <Button onClick={this.onforgetpass} color="primary">
                  Forgot Password??
                </Button>
              </div>
            </div>
          </MuiThemeProvider>
        </Card>

        {/* <Snackbar
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
        /> */}

<Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={5000}
          onClose={this.snackbarClose}
          message={<span id="message-id">{this.state.snackbarMsg}</span>}
          action={[
            <IconButton onClick={this.handleClose}>
              <CloseIcon onClick={this.snackbarClose} />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

export default withRouter(Login);
