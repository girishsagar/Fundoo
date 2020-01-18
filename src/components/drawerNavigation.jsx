/**
 * @file :drawerNavigation
 * @description :side navigationbar  having a components archive,editLabels,trash and reminder
 * @module:React js and firebase
 * @author :Girish Sagar <girishsagar51@gmail.com>
 * @version :16.12.0 (react version)
 * @since :7-jan-2020
 */
import React from "react";
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Dialog, Card, InputBase, } from "@material-ui/core";
import AddAlertIcon from "@material-ui/icons/AddAlert";
import ArchiveIcon from "@material-ui/icons/Archive";
import { withRouter } from "react-router-dom";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import LabelIcon from '@material-ui/icons/Label';
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
   
    };
  }
  handleArchive = () => {
    //  this.props.history.push('/archive');
    this.props.handleArchive();
  }
  handleNote = () => {
    this.props.handleNote();
  }
  handleTrash = () => {
    this.props.handleTrash();
  }
  handleReminder = () => {
    this.props.handleReminder();
  }
  handleOpenDialogue = () => {
   this.props.handleOpenDialogue();
  };

  render() {
    let labels = this.props.labeldata.map(item => {
      return (
        <ListItem button key="Label1">
          <ListItemIcon>
            <LabelIcon />
          </ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItem>
      );
    });
    return (
      <div className="mainDrawer">
        <Drawer
          variant="persistent"
          overflow="auto"
          open={this.props.open}
          width={500}
          flexShrink={0}
          height="100%"
          >
          <div className="dash_note">
            
            <List style={{height:"720px",}}>
              <div>
                <MuiThemeProvider theme={thm}>
                  <div className="notes" onClick={this.handleNote}>
                    <ListItem button key="Note">
                      <ListItemIcon>
                        <EmojiObjectsOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Note" />
                    </ListItem>
                  </div>
                  <div className="Reminder" onClick={this.handleReminder}>
                    <ListItem button key="Reminder">
                      <ListItemIcon>
                        <AddAlertIcon />
                      </ListItemIcon>
                      <ListItemText primary="Reminder" />
                    </ListItem>
                  </div>
                  <Divider />
                  {labels}
                  <div className="labels" >
                    <ListItem button key="Labels"  onClick={this.handleOpenDialogue}>
                      <ListItemIcon>
                        <CreateOutlinedIcon />
                      </ListItemIcon >
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
                        <DeleteOutlineOutlinedIcon />
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
