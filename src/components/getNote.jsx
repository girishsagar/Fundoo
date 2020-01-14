import React, { Component } from "react";
import { Tooltip, Card, InputBase, Button, IconButton, Avatar, Chip } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import { createMuiTheme } from "@material-ui/core";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import ColorComponent from "./colorNote";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { editNote, getNote, pinNotes, archiveTheNote, colorChange } from "../controller/userController";
import Dialog from "@material-ui/core/Dialog";
import Reminder from "./reminder"
import More from "./more";
import SvgPin from "../icons/svgPin"
import SvgPinned from "../icons/svgUnpin"

const thm = createMuiTheme({
  overrides: {
    MuiCard: {
      root: {
        borderRadius: "16px",
        marginTop: "35px",
        width: "20em"
      }
    },
    MuiCard: {
      root: {
        176: {
          marginLeft: "-30em"
        }
      }
    }
  }
});
class Getnote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      open: false,
      noteId: "",
      title: "",
      description: "",
      color: "",
      isDeleted: false,
      archieve: false,
      isPinned: false,
      pin_open: false,
      showIcon: false,
      anchorEl: null,
      reminder: "",
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

  snackbarClose = e => {
    this.setState({ snackbarOpen: false });
  };

  componentDidMount() {
    this.handleGetNotes();
  }

  handleColorClose = () => {
    this.setState({ color: true });
  };

  colorChange = () => {
    this.setState();
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

  handleGetNotes = () => {
    getNote()
      .then(res => {
        this.setState({
          notes: res
        });
        console.log("res in notesData", this.state.notes);
      })
      .catch(err => {
        console.log("err", err);
      });
  };

  handleOpenDialogue = () => {
    this.setState({
      open: !this.state.open
    });
  };

  handleEditNote = async (noteId, title, description, color, reminder) => {
    await this.setState({
      noteId: noteId,
      open: false,
      title: title,
      description: description,
      color: color,
      reminder: reminder
    });

  };
  saveEditNote = () => {
    let data = {
      noteId: this.state.noteId,
      title: this.state.title,
      description: this.state.description,
      reminder: this.state.reminder

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
      this.handleGetNotes();
    })
      .catch(err => {
        console.log('the notearchive is edited ', err);

      })
  }

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
  handleTimeChange = event => {
    let time = event.target.value
    this.setState({
      time: time
    })
  }
  componentWillReceiveProps(nextProps) {
    console.log("nextProps", nextProps);
    if (nextProps.getNotes) {
      this.handleGetNotes();
    }
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

  handleReminderDate = date => {
    this.setState({ reminder: date });
  };
  removeReminder = () => {
    this.setState({ reminder: null });
  };

  render() {
    let archieveIcon = !this.archive ? (
      <IconButton onClick={this.archiveNote}>
        <Tooltip title="Archieve">
          <ArchiveIcon />
        </Tooltip>
      </IconButton>
    ) : (
        <IconButton onClick={this.archiveNote}>
          <Tooltip title="UnArchieve">
            <UnarchiveIcon />
          </Tooltip>
        </IconButton>
      );

    let archieveIconShow = !this.state.showIcon ? (
      <IconButton></IconButton>
    ) : (
        archieveIcon
      );
    let iconDispaly = !this.state.showIcon
      ? "getNote-icons-hide"
      : "getNote-icons"
    return (
      <div className={this.props.noteStyle}>
        <div className="_notes" >
          {!this.state.open ? (
            <div className="_notes_">
              {this.state.notes.map(key => {
                if ((key.data().archieve === false) && (key.data().isDeleted === false)) {
                  console.log("the dele is ", key.data().isDeleted);
                  console.log("data", key.data().isPinned);
                  console.log("The archive js ", key.data().archive);                               
                  return (
                    <div className="notes_">
                      <Card
                        style={{
                          width: "250px",
                          minHeight: "135px",
                          height: "auto",
                          margin: "5px",
                          padding: "10px",
                          boxShadow: "0px 1px 7px 0px",
                          marginTop: "10%",
                          borderRadius: "15px",
                          background: key.data().color
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "5px"
                          }}
                        >
                          <div>
                            <div>
                              {key.data().title}
                            </div>

                            <div style={{ marginTop: "25px" }}>
                              {key.data().description}
                            </div>
                            <div>
                              {key.data().reminder !== null ?
                                <Chip
                                  icon={<AccessTimeIcon />}
                                  id={key.id}
                                  label={key.data().reminder}
                                  onDelete={this.removeReminder}
                                  variant="outlined"
                                />
                                : null}
                            </div>
                          </div>
                          <div>
                          <Avatar  style={{ background: "#d2cece", marginLeft: "-25px"}}
                             onClick={()=>this.handlePin(key.id)}>
                            {key.data().isPinned===true ?< SvgPinned/>:<SvgPin/> } 
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
                                  key.data().description,
                                )
                              }
                            />

                            <div onClick={this.handleOpenDialogue}>
                              <InputBase
                                value={key.description}
                                multiline
                                onClick={() =>
                                  this.handleEditNote(
                                    key.id,
                                    key.data().title,
                                    key.data().description
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>

                        <div className="getnoteicons">
                          <div >
                                <Reminder
                    anchorEl={this.state.anchorEl}
                    closeMenu={this.handleClose}
                    handleGetNotes={this.handleGetNotes}
                    handleReminderDate={this.handleReminderDate}
                  />

                          </div>

                          <div>
                            <Tooltip title="Collbrate">
                              <PersonAddOutlinedIcon />
                            </Tooltip>
                          </div>
                          <div>
                            <ColorComponent paletteProps={this.paletteProps}
                              id={key.id} />
                          </div>
                          <div>
                            <Tooltip title="Add image">
                              <ImageOutlinedIcon />
                            </Tooltip>
                          </div>
                          <div>
                            <Tooltip title="Archive">
                              <div
                                style={{ cursor: "pointer" }}
                                onClick={() => this.archiveNote(key.id)}
                              >
                                {/* {archieveIconShow} */}
                                <ArchiveOutlinedIcon />
                              </div>
                            </Tooltip>
                          </div>

                          <div>
                            <Tooltip title="More">
                              <MoreVertOutlinedIcon
                                onClick={this.menuItem}
                                aria-owns="simple-menu"

                              />
                            </Tooltip>
                            <More
                              anchorEl={this.state.anchorEl}
                              closeMenu={this.handleClose} id={key.id}
                              handleGetNotes={this.handleGetNotes}
                            />
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                }
              })}
            </div>
          ) : (
              <div className="cd">
                <Dialog
                  open={this.state.open}
                  onClose={this.handleOpenDialogue}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <Card className="dialogCard"  >
                    <div className="editcard" >
                      <div>
                        <InputBase
                          multiline
                          placeholder="Title"
                          value={this.state.title}
                          onChange={this.handleTitle}

                        />
                      </div>
                      <div className="inputNote">
                        <InputBase
                          multiline
                          placeholder="Take a note..."
                          value={this.state.description}
                          onChange={this.handleDescription}
                        />
                      </div>
                    </div>
                    <div className="imageAndClose">
                      <div className="dialogIcon">
                        <div>
                          <Reminder
                            anchorEl={this.state.anchorEl}
                            closeMenu={this.handleClose}
                            handleGetNotes={this.handleGetNotes}
                            handleReminderDate={this.handleReminderDate}
                          />
                        </div>
                        <div>
                          <PersonAddOutlinedIcon />
                        </div>
                        <div>
                          <ColorComponent paletteProps={this.paletteProps}
                          />
                        </div>
                        <div>
                          <ImageOutlinedIcon />
                        </div>
                        <div>
                          <ArchiveOutlinedIcon />
                        </div>
                        <div>
                          <MoreVertOutlinedIcon />
                        </div>
                        <Button
                          className="button"
                          color="Primary"
                          onClick={this.saveEditNote}
                          style={{ cursor: "pointer" }}
                        >
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

export default withRouter(Getnote);