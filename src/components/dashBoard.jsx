import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Navigation from "./appBar";
import Getnote from "./getNote";
import Notes from "./note";
import Archive from './archive'
import Trash from "./trash"
import ReminderComponent from "./reminderComponent"
import { geNoteCount, getAllLabel } from "../controller/userController"
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
      labels:[]
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
    console.log("the labelled uis ",this.state.labels);
    
    geNoteCount().then(res => {
      console.log(res)
      this.setState({
        pinnedCount: res.isPinned,
        archieveCount: res.archieve,
        trashCount: res.trash
      })
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
            handleReminder={this.handleReminder}
            pinnedCount={this.state.pinnedCount}
            archieveCount={this.state.archieveCount}
            trashCount={this.state.trashCount}
            labeldata={this.state.labels}
        />

          <Notes initiateGetNotes={this.initiateGetNotes} colorChange={this.colorChange}
            labelData={this.state.labels}  color={this.state.color} />
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
              handleReminder={this.handleReminder}
              pinnedCount={this.state.pinnedCount}
              archieveCount={this.state.archieveCount}
              trashCount={this.state.trashCount} 
              labeldata={this.state.labels}/>
            <Archive noteStyle={noteStyle} />labeldata={this.state.labels}labeldata={this.state.labels}
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
                labeldata={this.state.labels} />
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
                labeldata={this.state.labels} />
              <ReminderComponent />
            </div>

    );
  }
}
export default withRouter(Dashboard);
