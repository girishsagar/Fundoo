import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  MuiThemeProvider,
  createMuiTheme,
  Menu,
  MenuItem
} from "@material-ui/core";
import {addNoteToTrash,getNote} from "../controller/userController"

class More extends Component {
  constructor(props) {
    super(props);
    
  }
  handleDelete=  ()=>{
    let data ={
      noteId:this.props.id,
      isDeleted:true
    }
  console.log("delted using id " ,data);
  addNoteToTrash(data).then(res=>{
    console.log("result of deleted is ", res); 
    this.props.handleGetNotes();

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
        </div>
      </Menu>
    );

  }
}

export default withRouter(More);