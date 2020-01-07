import React from "react";
import {Divider, Drawer,List, ListItem, ListItemIcon,  ListItemText } from "@material-ui/core";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import ArchiveIcon from "@material-ui/icons/Archive";
import { withRouter } from "react-router-dom";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
const thm = createMuiTheme({
  overrides: {
    MuiDivider: {
      root: {
        width: "250px"
      }
    }
  }
});

class DrawerNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open:false,
    };
  }
  handleArchive =()=>{
   this.props.handleArchive();
  }
 handleNote=()=>{
   this.props.handleNote(); 
 }
 handleTrash=()=>{
  this.props.handleTrash(); 
}

 render() {
    return (
      <div className="draw_dash ">
        <Drawer
          variant="persistent"
          overflow="auto"
          open={this.props.open}
          width={250}
        >
          <div className="dash_note">
            <List>
              <div>
              <MuiThemeProvider theme={thm}>
                <div className="dashNotesNotes" onClick={this.handleNote} >
                  <ListItem button key="Note">
                    <ListItemIcon>
                      <EmojiObjectsOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Note" />
                  </ListItem>
                </div>
                <div className="Reminder" >
                  <ListItem button key="Reminder">
                    <ListItemIcon>
                      <AddAlertIcon   />
                    </ListItemIcon>
                    <ListItemText primary="Reminder" />{" "}
                  </ListItem>
                </div>
                <Divider />
                <div className="labels">
                  <ListItem button key="Labels">
                    <ListItemIcon>
                      <CreateOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Edit labels" />
                  </ListItem>
                </div>
                <Divider />
                <div className="Archive" onClick={this.handleArchive}>
                  <ListItem button key="Archive">
                    <ListItemIcon>  
                      <ArchiveIcon />
                    </ListItemIcon>
                    <ListItemText primary="Archive" />
                  </ListItem>
                </div>
            
                <div className="Trash" onClick={this.handleTrash}>
                  <ListItem button key="Trash">
                    <ListItemIcon>
                      <DeleteOutlineOutlinedIcon  />
                    </ListItemIcon>
                    <ListItemText primary="Trash" />
                  </ListItem>
                </div>
              </MuiThemeProvider>
              </div>
            </List>
            
          </div>
        </Drawer>
      
      </div>
    );
  }
}
export default withRouter(DrawerNav);
