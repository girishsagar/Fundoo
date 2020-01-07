import React, { Component } from "react";
import {
  Tooltip,
  Card,
  InputBase,
  Button,
  IconButton
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import ColorComponent from "./colorNote";
import DrawerNav from "./drawerNavigation";
import { getNote, archiveTheNote } from "../controller/userController";
import colorNote from "./colorNote";
import Dialog from "@material-ui/core/Dialog";
import ArchiveIcon from "@material-ui/icons/Archive";
import UnarchiveIcon from "@material-ui/icons/Unarchive";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
const thm = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paperAnchorDockedLeft: {
        marginTop: "66px"
      }
    }
  }
});

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
      color: "",
      isDeleted: false,
      archieve: false,
      isPinned: false,
      pin_open: false,
      showIcon: false
    };
  }
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
  };
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
      : "getNote-icons";
        return (

          <div className="_notes"  >

            {!this.state.open ? (
              <div className="_notes_"  style={{marginTop:"95px",flexWrap:"wrap",}}>
                {this.state.notes.map(key => {
                  // key.isArchived === false &&
                  //   key.isDeleted === false &&
                  console.log("data", key.data().isPinned);
                  console.log("The archive js ", key.data().archive);
                  if (key.data().archieve === true) {
                  return (
                    <div className="notes_" >

                      <Card
                        style={{ backgroundColor: this.props.color }}
                        className="get_Nottes_card"
                        style={{
                          width: "220px",
                          minHeight: "100px",
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
                            <div>{key.data().description}</div>

                          </div>
                          <div>
                            <img
                              src={require("../assets/unpin.svg")}
                              style={{ width: "20px" }}
                              onClick={() => this.handlePin(key.id)}
                            />
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
                                    key.data().description,
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
                              <ColorComponent paletteProps={this.paletteProps} />
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
                                onClick={() => this.archiveNote(key.id)}
                              >
                                <ArchiveOutlinedIcon />
                              </div>
                            </Tooltip>
                          </div>
                          <div>
                            <Tooltip title="More">
                              <MoreVertOutlinedIcon noteId={key.id} />
                            </Tooltip>
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                }})
              }
              </div>
            ) : (
                <div className="cd">
                  <Dialog
                    // className="dialog"
                    open={this.state.open}
                    onClose={this.handleOpenDialogue}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    {/* <MuiThemeProvider theme={thm}> */}
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
                            {/* <ColorComponent paletteProps={this.paletteProps} /> */}
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
                    {/* </MuiThemeProvider> */}
                  </Dialog>
                </div>
              )}
          </div>
        );
      }
            }

export default withRouter(Archive);