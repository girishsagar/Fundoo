import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  MuiThemeProvider,
  createMuiTheme,
  Menu,
  MenuItem,IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Snackbar } from "@material-ui/core";
import {addNoteToTrash,getNote } from "../controller/userController"

class More extends Component {
  constructor(props) { 
    super(props);
    this.state={
      snackbarOpen: false,
      snackbarMsg: ""
    }
    
  }
  snackbarClose = e => {
    this.setState({ snackbarOpen: false });
  };
  handleDelete=  ()=>{
    let data ={
      // noteId:this.props.id,
      noteId:this.props.id,
      isDeleted:true
    }
  console.log("delted using id " ,data);
  addNoteToTrash(data).then(res=>{
    if(res===true){
      this.setState({
        snackbarMsg: " New Note Saved",
        snackbarOpen: true,
      })
      console.log("result of deleted is ", res); 
    this.props.handleGetNotes();
    }
    else {
      this.setState({
        snackbarMsg: res,
        snackbarOpen: true
      })
    }
  })
  
  .catch(err=>{
    console.log("Error occured during deletion ",err);   
  })
  }
  render() {
    return (
      
      <Menu className="abc"
        id="simple-menu"
        anchorEl={this.props.anchorEl}
        open={Boolean(this.props.anchorEl)}
        onClose={this.props.closeMenu}
      >
        <div className="down">
          <div className="drop">
            {/* <MenuItem onClick={this.props.handleDelete(this.props.id)}>Delete</MenuItem> */}
            <MenuItem onClick={this.handleDelete} >Delete</MenuItem>
            <MenuItem onClick={this.handleClose}>Add Label</MenuItem>
            <MenuItem onClick={this.handleClose}>Add Drawing</MenuItem>
          </div>
          <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
            color: "white"
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
       
      </Menu>
    );

  }
}

export default withRouter(More);