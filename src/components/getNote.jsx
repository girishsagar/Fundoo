import React, { Component } from "react";
import { Tooltip, Card, InputBase, Button, Menu, IconButton, Avatar } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import ColorComponent from "./colorNote";
import { editNote, getNote, pinNotes, archiveTheNote, colorChange } from "../controller/userController";
import Dialog from "@material-ui/core/Dialog";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import pin from "../assets/pin.png";
import More from "./more";
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
      anchorEl: null
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

  handleEditNote = (noteId, title, description, color) => {
    this.setState({
      noteId: noteId,
      open: false,
      title: title,
      description: description,
      color: color
    });
    let data = {
      noteId: this.state.noteId,
      title: this.state.title,
      description: this.state.description,
      color: this.state.color
    };
    console.log("result of editData", data);
    editNote(data)
      .then(res => {
        console.log("result of  editNote", res);
        this.handleGetNotes();
      })
      .catch(err => {
        console.log("err in editNote component ", err);
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

  handleColor = event => {
    let color = event.target.value;
    this.setState({
      color: color
    });
  };

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

  render() {
    let view=this.props.iconChoose?"gridview":"listview"
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
      : "getNote-icons";

    return (
      <div className="_notes">
        {!this.state.open ? (
          <div className="_notes_">
            {this.state.notes.map(key => {
              // key.isArchived === false &&
              //   key.isDeleted === false &&
              if((key.data().archieve === false) &&(key.data().isDeleted === false)){
                console.log("the dele is ", key.data().isDeleted);
                console.log("data", key.data().isPinned);
                console.log("The archive js ", key.data().archive);

                return (
                  <div className="notes_">
                    <Card className={view}
                      style={{ backgroundColor: this.props.color }}
                      // className="get_Nottes_card"
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
                      {/* {svg} */}
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
                            {/* <RoomOutlinedIcon onClick={() => this.handlePin(key.id)} /> */}
                          </div>
                          <div style={{ marginTop: "25px" }}>
                            {key.data().description}
                          </div>
                     
                        </div>
                        <div>
                          <Avatar style={{ background: "#d2cece" }}>
                            <img
                              src={require("../assets/unpin.svg")}
                              style={{ width: "20px" }}
                              onClick={() => this.handlePin(key.id)}
                            />
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
                                key.data().description
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
                        <div>
                          <Tooltip title="Reminder">
                            <AddAlertOutlinedIcon />
                          </Tooltip>
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
                              {archieveIconShow}
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
                <Card className="dialogCard">
                  <div className="editcard">
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
                        <AddAlertOutlinedIcon />
                      </div>
                      <div>
                        <PersonAddOutlinedIcon />
                      </div>
                      <div>
                        <ColorComponent onChange={this.paletteProps} />
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
                        onClick={this.handleEditNote}
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
    );
  }
}

export default withRouter(Getnote);