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
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { registeration } from "../controller/userController";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
const thm = createMuiTheme({
  overrides: {
    MuiInputLabel: {
      formControl: {
        marginLeft: "3px",
        fontSize: "20px",
        fontFamily: "Cursive",
        font: "bold"
      }
    },
    MuiInputBase: {
      input: {
        fontFamily: "Cursive",
        fontSize: "20px",
        marginLeft: "1px",
        borderSpacing: "10px"
      }
    },
    MuiAvatar: {
      root: {
        left: "10px",
        width: "60px",
        height: "60px"
      },
      colorDefault: {
        backgroundColor: "black",
        marginLeft: "17px",
        marginTop: "-4px"
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
  /**
   * @function:snackbar
   * @description:displaying the messaga/alertBox
   */
  snackbarClose = e => {
    this.setState({
      snackbarOpen: false
    });
  };
  /**
   * @function: handlefirstName
   * @description: the function will handle the textbox file and regx/validation
   */
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
      Email === !/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.Email)
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
  /**
   * @function :onLogin
   * @description :it will navigate to the login page
   */
  onLogin = () => {
    this.props.history.push("/Login");
  };
  /**
   * @function :submit
   * @description:it will chech for the every textbox should be fill/ empty
   * if it will empty it display the messag
   */
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
      // passing an data to the firebase
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
      <div className="SignUp">
        <MuiThemeProvider theme={thm}>
          <Card className="sign-card">
            <div className="avatar">
              <Avatar>
                <AccountCircleRoundedIcon />
              </Avatar>
            </div>
            <div className="loge">Sign Up</div>
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
              id="lastName"
              name="  lastName"
              label=" LastName"
              variant="standard"
              type="text"
              maxwidth
              fullWidth
              onChange={event => this.handlelastName(event)}
            />

            <TextField
              required="true"
              id="Email"
              name="Email"
              label="Email"
              variant="standard"
              type="text"
              fullWidth
              onChange={event => this.handleEmail(event)}
            />
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Password"
              variant="standard"
              type="Password"
              fullWidth
              onChange={event => this.handlepassword(event)}
            />

            <div className="regbutton1">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.submit}
              >
                Sign Up
              </Button>
            </div>
            <div className="regbutton2">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.onLogin}
              >
                Login
              </Button>
            </div>
          </Card>
        </MuiThemeProvider>

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
export default withRouter(registration);
