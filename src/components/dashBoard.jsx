import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Navigation from "./appBar";
import Getnote from "./getNote";
import Notes from "./note";
import Archive from './archive'
import note from "./note";
import Trash from "./trash"

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
      listView:false,

    };
  }
  handleView=()=>{
    this.setState({listView:!this.state.listView})
  }
  handleNote = () => {
    this.setState({ note: true, archive: false, trash: false })
  }

  handleArchive = () => {
    this.setState({ archive: true, note: false, trash: false })
  }

  handleTrash = () => {
    this.setState({ trash: true, note: false, archive: false })
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
    return (
      (!this.state.archive) && (!this.state.trash) ?
        <div>
          <Navigation handleArchive={this.handleArchive} handleNote={this.handleNote}
            handleTrash={this.handleTrash} 
            handleView={this.handleView}/>
          <Notes initiateGetNotes={this.initiateGetNotes} colorChange={this.colorChange} color={this.state.color} />
          <Getnote getNotes={this.state.getNotesProps} color={this.state.color} />
        </div>
        : (this.state.archive) && (!this.state.trash) ?
          <div>
            <Navigation handleArchive={this.handleArchive} handleNote={this.handleNote} handleTrash={this.handleTrash} />
            <Archive />
          </div>
          :
          <div>
            <Navigation handleArchive={this.handleArchive} handleNote={this.handleNote} handleTrash={this.handleTrash} />
            <Trash />
          </div>
    );
  }
}

export default withRouter(Dashboard);
