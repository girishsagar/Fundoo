import React, { Component } from "react";
import { Card, TextField, IconButton, Button, Avatar } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { forgotPassword } from "../controller/userController";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
const thm = createMuiTheme({
  overrides: {
    MuiAvatar: {
      root: {
        left: "10px",
        width: "80px",
        height: "100px"
      },
      colorDefault: {
        backgroundColor: "white"
      }
    },
    MuiSvgIcon: {
      root: {
        color: "red",
        width: "200px",
        height: "70px"
      }
    }
  }
});
class forget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      snackbarOpen: false,
      snackbarMsg: ""
    };
  }
  snackbarClose = e => {
    this.setState({
      snackbarOpen: false
    });
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
  submit = () => {
    if (this.state.Email === "") {
      this.setState({
        snackbarOpen: true,
        snackbarMsg: " Email cannot be empty"
      });
    } else {
      forgotPassword(this.state.Email)
        .then(data => {
          this.setState({
            snackbarOpen: true,
            snackbarMsg: "rest password link sent to your email"
          });
        })
        .catch(error => {
          this.setState({
            snackbarOpen: true,
            snackbarMsg: error
          });
        });
        setTimeout(() => {
                   this.props.history.push("/login");
                  
                }, 2000);
    }
  };
  render() {
    return (
      <div className="forgotpass-page">
        <Card className="forgotpass-card">
          <div className="forgotpass-h2">
            <h2>Enter Your Email</h2>
          </div>

          <div className="forgotpass-email">
            <TextField
              required
              fullWidth
              variant="outlined"
              id="email-input"
              label="Enter Email"
              type="email"
              name="email"
              margin="normal"
              onChange={event => this.handleEmail(event)}
            />
          </div>
          <div className="forgotpass-button">
            <Button color="primary" variant="contained"   onClick={this.submit}>
              Submit
            </Button>
            {/* <Button color="primary" variant="contained">
              back
            </Button> */}
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
    );
  }
}
export default withRouter(forget);