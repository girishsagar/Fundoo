/**
 * @fileName :archive.js
 * @description :Displaying the archive notes.
 * @module:React js and firebase
 * @author :Girish Sagar <girishsagar51@gmail.com>
 * @version :16.12.0 (react version)
 * @since :17-dec-2019
 */
import React, { Component } from "react";
import {
  Tooltip,
  Card,
  InputBase,
  Button,Avatar, Chip
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import ColorComponent from "./colorNote";
import { getNote, archiveTheNote, editNote, colorChange, pinNotes } from "../controller/userController";
import Dialog from "@material-ui/core/Dialog";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import More from "./more";
import SvgPin from "../icons/svgPin"
import SvgPinned from "../icons/svgUnpin"
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Reminder from "./reminder"
class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      open: false,
      notes: [],
      color: "",
      noteId: "",
      title: "",
      description: "",
      isDeleted: false,
      archieve: false,
      isPinned: false,
      pin_open: false,
      showIcon: false,
      anchorEl: null,
      reminder: null,
    };
  }
  menuOpen = () => {
    this.setState({ open: !this.state.open });
  };
  menuItem = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClose = event => {
    this.setState({ anchorEl: null });
  };
  openDrawer = () => {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  };

  handleOpenDialogue = () => {
    this.setState({
      open: !this.state.open
    });
  };
  componentDidMount() {
    this.handleGetNotes();
  }
  handleEditNote = async (noteId, title, description, color) => {
    await this.setState({
      noteId: noteId,
      open: false,
      title: title,
      description: description,
      color: color
    });

  };
  saveEditNote = () => {
    let data = {
      noteId: this.state.noteId,
      title: this.state.title,
      description: this.state.description
    };
    console.log("result of editData", data);
    editNote(data)
      .then(res => {
        console.log("result of  editNote", res);
        this.setState({ open: false })
        this.handleGetNotes();
      })
      .catch(err => {
        console.log("err in editNote component ", err);
      });
  }
  handleGetNotes = () => {
    getNote()
      .then(res => {
        this.setState({
          notes: res
        });
        console.log("res in notesData archive", this.state.notes);
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  handleTitle = event => {
    let title = event.target.value;
    this.setState({
      title: title
    });
  };

  handleDescription = event => {
    let description = event.target.value;
    this.setState({
      description: description
    });
  };
  paletteProps = async (e, id) => {
    console.log(e);
    await this.setState({
      color: e
    });
    const data = {
      id: id,
      color: this.state.color
    }
    colorChange(data).then(res => {
      this.handleGetNotes();
    })
  };

  archiveNote = async (noteId) => {
    await this.setState({
      archieve: !this.state.archieve
    })
    let data = {
      noteId: noteId,
      archieve: this.state.archieve
    }
    console.log("data is archive is ", data);
    archiveTheNote(data).then(res => {
      console.log("resule of archive note is ", res);
      this.handleGetNotes()
    })
      .catch(err => {
        console.log('the notearchive is edited ', err);
      })
  }
  handlePin(noteId) {
    this.setState({
      isPinned: !this.state.isPinned
    });
    let data = {
      noteId: noteId,
      isPinned: this.state.isPinned
    };
    console.log("data in pin notres", data);
    pinNotes(data)
      .then(res => {
        console.log("result of  pinnote", res);
        this.handleGetNotes();
      })
      .catch(err => {
        console.log("err in pinnote component ", err);
      });
  }

  handleClosePin = () => {
    this.setState({ isPinned: false });
  };
  handleReminderDate = date => {
    this.setState({ reminder: date });
  };
  removeReminder = () => {
    this.setState({ reminder: null });
  };
  render() {
    return (
      <div className={this.props.noteStyle}>
        <div className="_notes">
          {!this.state.open ? (
            <div className="_notes_" style={{ marginTop: "95px", flexWrap: "wrap", }}>
              {this.state.notes.map(key => {
                if ((key.data().archieve === true) && (key.data().isDeleted === false)) {
                  return (
                    <div className="notes_" >
                      <Card
                        className="get_Nottes_card" style={{ backgroundColor: this.props.color }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "5px"}}>
                          <div>
                            <div>
                              {key.data().title}
                            </div>
                            <div>{key.data().description}</div>
                            <div>
                              {key.data().reminder !== null ?
                                <Chip
                                  style={{ display: "flex", marginLeft: "-6em", marginTop: "5em" }}
                                  icon={<AccessTimeIcon />}
                                  id={key.id}
                                  label={key.data().reminder}
                                  onDelete={this.removeReminder}
                                  variant="outlined" />
                                : null}
                            </div>
                          </div>
                          <div>
                            <Avatar style={{ background: "#d2cece", marginLeft: "-25px" }}
                              onClick={() => this.handlePin(key.id)}>
                              {key.data().isPinned === true ? < SvgPinned /> : <SvgPin />}
                            </Avatar>
                          </div>
                        </div>
                        <div onClick={this.handleOpenDialogue}>
                          <div className="base">
                            <InputBase
                              multiline
                              onClick={() =>
                                this.handleEditNote(
                                  key.id,
                                  key.data().title,
                                  key.data().description)}/>
                            <div onClick={this.handleOpenDialogue}>
                              <InputBase
                                value={key.description}
                                multiline
                                onClick={() =>
                                  this.handleEditNote(
                                    key.id,
                                    key.data().title,
                                    key.data().description)}/>
                            </div>
                          </div>
                        </div>
                        <div className="getnoteicons">
                          <div>
                            <Reminder
                              anchorEl={this.state.anchorEl}
                              closeMenu={this.handleClose}
                              handleGetNotes={this.handleGetNotes}
                              handleReminderDate={this.handleReminderDate}/>
                          </div>
                          <div>
                            <Tooltip title="Collbrate">
                              <PersonAddOutlinedIcon />
                            </Tooltip>
                          </div>
                          <div>
                            <ColorComponent paletteProps={this.paletteProps} id={key.id}/>
                          </div>
                          <div>
                            <Tooltip title="Add image">
                              <ImageOutlinedIcon />
                            </Tooltip>
                          </div>
                          <div>
                            <Tooltip title="Un Archive">
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => this.archiveNote(key.id)}>
                                <ArchiveOutlinedIcon />
                              </div>
                            </Tooltip>
                          </div>
                          <div>
                            <Tooltip title="More">
                              <MoreVertOutlinedIcon
                                onClick={this.menuItem}
                                aria-owns="simple-menu"/>
                            </Tooltip>
                            <More
                              anchorEl={this.state.anchorEl}
                              closeMenu={this.handleClose} id={key.id}
                              handleGetNotes={this.handleGetNotes}/>
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                }
              })
              }
            </div>
          ) : (
              <div className="cd">
                <Dialog
                  // className="dialog"
                  open={this.state.open}
                  onClose={this.handleOpenDialogue}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description">
                  <Card className="dialogCard">
                    <div className="editcard">
                      <div>
                        <InputBase
                          multiline
                          placeholder="Title"
                          value={this.state.title}
                          onChange={this.handleTitle}/>
                      </div>
                      <div className="inputNote">
                        <InputBase
                          multiline
                          placeholder="Take a note..."
                          value={this.state.description}
                          onChange={this.handleDescription}/>
                      </div>
                    </div>
                    <div className="imageAndClose">
                      <div className="dialogIcon">
                        <div>
                          <AddAlertOutlinedIcon />
                        </div>
                        <div>
                          <PersonAddOutlinedIcon />
                        </div>
                        <div>
                          <ColorComponent onChange={this.paletteProps}
                            id={this.props.id}/>
                        </div>
                        <div>
                          <ImageOutlinedIcon/>
                        </div>
                        <div>
                          <ArchiveOutlinedIcon/>
                        </div>
                        <div>
                          <MoreVertOutlinedIcon/>
                        </div>
                        <Button
                          className="button"
                          color="Primary"
                          onClick={this.saveEditNote}
                          style={{ cursor: "pointer" }}>
                          Close
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Dialog>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default withRouter(Archive);