/**
 * @file: regest.jsx
 * @description: user registeration from having with a fields.
 * @module:React js and firebase
 * @author :Girish Sagar <girishsagar51@gmail.com>
 * @version :12.11.1 (node)
 * @since :7-dec-2019
 */
import React, { Component } from "react";
import { Card, TextField, IconButton, Button, Avatar } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { registeration } from "../controller/userController";

/**
 * @class : registraction extending from parent class React Component
 * @description: having a prop (property)/varible
 */
class registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      Email: "",
      password: "",
      snackbarOpen: false,
      snackbarMsg: ""
    };
  }

  snackbarClose = e => {
    this.setState({
      snackbarOpen: false
    });
  };
  handlefirstName = event => {
    let firstName = event.target.value;
    this.setState({
      firstName: firstName
    });
    if (firstName == !/^[a-zA-Z]+$/.test(this.state.firstName)) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "firstName must be alphabets"
      });
    } else
      this.setState({
        snackbarOpen: false,
        snackbarMsg: ""
      });
  };
  handlelastName = event => {
    let lastName = event.target.value;
    this.setState({
      lastName: lastName
    });
    if (lastName == !/^[a-zA-Z]+$/.test(this.state.lastName)) {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: "LastName must be alphabets"
      });
    }
  };

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

  onLogin = () => {
    this.props.history.push("/Login");
  };
  submit = () => {
    if (this.state.firstName === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: " FirstName cannot be empty..!"
      });
    } else if (this.state.lastName === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: " LastName cannot be empty"
      });
    } else if (this.state.Email === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: " Email cannot be empty"
      });
    } else if (this.state.password === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: " passoword cannot be empty "
      });
    } else {
      const user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        Email: this.state.Email,
        password: this.state.password
      };
      registeration(user).then(res => {
        if (res === "success") {
          this.setState({
            snackbarMsg: "Registration Successs" + res,
            snackbarOpen: true
          });
          this.props.history.push(`/login`);
        } else {
          this.setState({
            snackbarMsg: res,
            snackbarOpen: true
          });
        }
      });
    }
  };

  render() {
    return (
      <div className="allineone">
        <div className="registerPage">
          <Card className="registerCard">
            <div className="register-fundoo">
              <h1 className="register-h1">
                <span style={{ color: "#2196f3" }}>S</span>
                <span style={{ color: "#b71c1c" }}>i</span>
                <span style={{ color: "#ffc107" }}>g</span>
                <span style={{ color: "#1976d2" }}>n</span>
                <span style={{ color: "#43a047" }}>U</span>
                <span style={{ color: "#b71c1c" }}>p</span>
              </h1>
            </div>
            <div className="register-h2">
              <h2>Crete New Account</h2>
            </div>
            {/* <div className="avatar">
                <Avatar>
                  <LockOutlinedIcon />
                </Avatar>
              </div> */}
            <div className="register-names">
              <TextField
                required
                autoComplete="password"
                id="FirstName"
                name="FirstName"
                label="FirstName"
                variant="standard"
                type="text"
                fullWidth
                autoFocus
                onChange={event => this.handlefirstName(event)}
              />
              <TextField
                required
                autoComplete="password"
                id="LastName"
                name="LasttName"
                label="LastName"
                variant="standard"
                type="text"
                fullWidth
                autoFocus
                onChange={event => this.handlelastName(event)}
              />
            </div>
            <div className="register-email">
              <TextField
                required
                name="Email"
                label="Email"
                variant="standard"
                type="text"
                fullWidth
                onChange={event => this.handleEmail(event)}
              />
              <TextField
                required
                variant="outlined"
                id="pass-input"

                label="Password"
                type="Password"
                fullWidth
                onChange={event => this.handlepassword(event)}
              />
            </div>
            <div className="register-submitButton">
              <Button
                fullWidth
                color="primary"
                onClick={this.submit}
                variant="contained"
              >
                submit
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.onLogin}
              >
                Log in
              </Button>
            </div>
          </Card>
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
      </div>
    );
  }
}
export default withRouter(registration);