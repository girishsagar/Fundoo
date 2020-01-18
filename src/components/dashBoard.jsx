/**
 * @file:dashBoard.jsx
 * @description ;all file of notes and chard board
 * @module:React js and firebase
 * @author :Girish Sagar <girishsagar51@gmail.com>
 * @version :16.12.0 (react version)
 * @since :03-jan-2020
 */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Dialog, Card, InputBase, ClickAwayListener, Button, Tooltip, ListItem, ListItemIcon, ListItemText, Avatar } from "@material-ui/core";
import Navigation from "./appBar";
import Getnote from "./getNote";
import LabelIcon from '@material-ui/icons/Label';
import CancelIcon from "@material-ui/icons/Cancel";
import Notes from "./note";
import Archive from './archive'
import Trash from "./trash"
import ReminderComponent from "./reminderComponent"
import { geNoteCount, getAllLabel } from "../controller/userController"
import CloseIcon from '@material-ui/icons/Close';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import EditSharpIcon from '@material-ui/icons/EditSharp';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteArray: [],
      color: "",
      isPinned: false,
      note: true,
      archieve: false,
      isDeleted: false,
      trash: false,
      getNotesProps: false,
      listView: false,
      reminder: false,
      archieveCount: 0,
      pinnedCount: 0,
      trashCount: 0,
      labels: [],
      open: false,
    };
  }

  handleView = () => {
    this.setState({ listView: !this.state.listView })
  }
  handleNote = () => {
    this.setState({ note: true, archive: false, trash: false, reminder: false })
  }

  handleArchive = () => {
    this.setState({ archive: true, note: false, trash: false, reminder: false })
  }

  handleTrash = () => {
    this.setState({ trash: true, note: false, archive: false, reminder: false })
  }
  handleReminder = () => {
    this.setState({ reminder: true, archive: false, note: false, trash: false })
  }
  colorChange = (e) => {
    this.setState({ color: e })
    console.log("AAAAAAAAAAAAAAA" + e)
  }
  handleOpenDialogue = () => {
    console.log("aaaaaaaaaaaaaaaaaxscdsc")
    this.setState({
      open: !this.state.open
    })
  }

  initiateGetNotes = (getDataProps) => {
    console.log("getDataProps", getDataProps);
    this.setState({
      getNotesProps: getDataProps
    })
  }

  componentDidMount() {
    this.getLabels()
  }

  getLabels = () => {
    getAllLabel().then(res => {
      this.setState({ labels: res })
    })
    console.log("the labelled uis ", this.state.labels);

    geNoteCount().then(res => {
      console.log(res)
      this.setState({
        pinnedCount: res.isPinned,
        archieveCount: res.archieve,
        trashCount: res.trash
      })
    })
  }
  handleClose = () => {
    this.setState({
      open: false
    })
  }
  render() {
    
    let labels = this.state.labels.map(item => {
      return (
        <ListItem button key="Label1">
          <ListItemIcon>
            <LabelIcon />
          </ListItemIcon>
          <ListItemText primary={item.label} />
          <div>
          <EditSharpIcon/>
          </div>
        </ListItem>

      );
    });
    let noteStyle = this.state.listView ? "girdnotes" : "listcss"
    return (
      (!this.state.archive) && (!this.state.trash) && (!this.state.reminder) ?
        <div>
          <Navigation handleArchive={this.handleArchive}
            handleNote={this.handleNote}
            handleTrash={this.handleTrash}
            handleView={this.handleView}
            view={this.state.listView}
            handleReminder={this.handleReminder}
            pinnedCount={this.state.pinnedCount}
            archieveCount={this.state.archieveCount}
            trashCount={this.state.trashCount}
            labeldata={this.state.labels}
            handleOpenDialogue={this.handleOpenDialogue} />

          <Notes initiateGetNotes={this.initiateGetNotes} colorChange={this.colorChange}
            labelData={this.state.labels} color={this.state.color} />
          <Getnote getNotes={this.state.getNotesProps} color={this.state.color}
            noteStyle={noteStyle} />
          <ClickAwayListener onClickAway={this.handleClose}>
            
            <Dialog
              open={this.state.open}
              onClose={this.handleOpenDialogue}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <Card className="dialogCard"  >
                <div className="editcard">
                  <div className="close_icon">
                    <Tooltip title="close" style={{ padding: "10px",}}>
                      <CloseIcon onClick={this.handleClose}/>
                    </Tooltip>
                    <InputBase
                      multiline
                      placeholder="Create new label.." />
                    <Tooltip title="close" style={{ padding: "10px", marginLeft: "3em" }}>
                      <CheckOutlinedIcon />
                    </Tooltip>
                  </div>
                  <div className="inputNote" >
                    {labels}
                  </div>
                  <Button style={{ marginLeft: "20em" }}
                    variant="contained"
                    color="primary" onClick={this.handleClose}>
                    Done
                    </Button>
                </div>
              </Card>
            </Dialog>
          </ClickAwayListener>
        </div>
        : (this.state.archive) && (!this.state.trash) && (!this.state.reminder) ?
          <div>
            <Navigation handleArchive={this.handleArchive}
              handleNote={this.handleNote}
              handleTrash={this.handleTrash}
              handleView={this.handleView}
              view={this.state.listView}
              noteStyle={noteStyle}
              handleReminder={this.handleReminder}
              pinnedCount={this.state.pinnedCount}
              archieveCount={this.state.archieveCount}
              trashCount={this.state.trashCount}
              labeldata={this.state.labels} handleOpenDialogue={this.handleOpenDialogue} />

            <Archive noteStyle={noteStyle} />
          </div>
          : (!this.state.archive) && (this.state.trash) && (!this.state.reminder) ?
            <div>
              <Navigation handleView={this.handleView}
                view={this.state.listView}
                handleArchive={this.handleArchive}
                handleNote={this.handleNote}
                handleTrash={this.handleTrash}
                handleReminder={this.handleReminder}
                pinnedCount={this.state.pinnedCount}
                archieveCount={this.state.archieveCount}
                trashCount={this.state.trashCount}
                labeldata={this.state.labels} handleOpenDialogue={this.handleOpenDialogue} />
              <Trash />
            </div>

            :
            <div>
              <Navigation handleView={this.handleView}
                view={this.state.listView}
                handleArchive={this.handleArchive}
                handleNote={this.handleNote}
                handleTrash={this.handleTrash}
                handleReminder={this.handleReminder}
                pinnedCount={this.state.pinnedCount}
                archieveCount={this.state.archieveCount}
                trashCount={this.state.trashCount}
                labeldata={this.state.labels}
                handleOpenDialogue={this.handleOpenDialogue} />
              <ReminderComponent />
            </div>

    );
  }
}
export default withRouter(Dashboard);
