import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Navigation from "./appBar";
import Getnote from "./getNote";
import Notes from "./note";
import Archive from './archive'
import Trash from "./trash"
import ReminderComponent from "./reminderComponent"
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteArray: [],
      color: "",
      note: true,
      archive: false,
      isDeleted: false,
      trash: false,
      getNotesProps: false,
      listView: false,
      reminder: false,

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
    // console.log("aaaaaaaaaaa"+e)
    this.setState({ color: e })
    console.log("AAAAAAAAAAAAAAA" + e)
  }
  initiateGetNotes = (getDataProps) => {
    console.log("getDataProps", getDataProps);
    this.setState({
      getNotesProps: getDataProps
    })
  }
  render() {
    let noteStyle = this.state.listView ? "girdnotes" : "listcss"
    return (
      (!this.state.archive) && (!this.state.trash) && (!this.state.reminder) ?
        <div>
          <Navigation handleArchive={this.handleArchive}
            handleNote={this.handleNote}
            handleTrash={this.handleTrash}
            handleView={this.handleView}
            view={this.state.listView}
            handleReminder={this.handleReminder} />

          <Notes initiateGetNotes={this.initiateGetNotes} colorChange={this.colorChange}
            color={this.state.color} />
          <Getnote getNotes={this.state.getNotesProps} color={this.state.color}
            noteStyle={noteStyle} />
        </div>

        : (this.state.archive) && (!this.state.trash) && (!this.state.reminder) ?

          <div>
            <Navigation handleArchive={this.handleArchive}
              handleNote={this.handleNote}
              handleTrash={this.handleTrash}
              handleView={this.handleView}
              view={this.state.listView}
              noteStyle={noteStyle}
              handleReminder={this.handleReminder} />
            <Archive noteStyle={noteStyle} />
          </div>

          :  (this.state.archive) && (!this.state.trash) && (!this.state.reminder) ?
          <div>
            <Navigation handleView={this.handleView}
              view={this.state.listView}
              handleArchive={this.handleArchive}
              handleNote={this.handleNote}
              handleTrash={this.handleTrash}
              handleReminder={this.handleReminder} />
            <Trash />
          </div>
          : 
          <div>
            <Navigation handleView={this.handleView}
              view={this.state.listView}
              handleArchive={this.handleArchive}
              handleNote={this.handleNote}
              handleTrash={this.handleTrash}
              handleReminder={this.handleReminder} />
            <ReminderComponent />
          </div>
    );
  }
}

export default withRouter(Dashboard);
