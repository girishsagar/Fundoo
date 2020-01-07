import React, { Component } from "react";
import {
  Tooltip, Card,
  InputBase,
  Button,
  IconButton
} from "@material-ui/core";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import CloseIcon from "@material-ui/icons/Close";
import ColorComponent from './colorNote'
import { withRouter } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import UndoTwoToneIcon from "@material-ui/icons/UndoTwoTone";
import RedoTwoToneIcon from "@material-ui/icons/RedoTwoTone";
import { saveNote, getNote, pinNotes } from "../controller/userController";

class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardOpen: false,
      anchorEl: null,
      color: "",
      title: "",
      description: "",
      isPinned: false,
      isDeleted: false,
      archieve: false,
      snackbarOpen: false,
      snackbarMsg: ""
    };
  }
  componentDidMount() {
    this.handleGetNotes();
  }

  handleGetNotes = () => {
    getNote()
      .then(res => {
        this.setState({
          // / notes: res.noteData.noteData.noteData
          notes: res
        });
        console.log("res in notesData", this.state.notes);
      })
      .catch(err => {
        console.log("err", err);
      });
  };
  snackbarClose = e => {
    this.setState({ snackbarOpen: false });
  };

  openCard = () => {
    this.setState({ cardOpen: true });
  };
  changeTitle = e => {
    this.setState({ title: e.currentTarget.value });
  };
  changeDescription = e => {
    this.setState({ description: e.currentTarget.value });
  };
  handleOpenPin = (noteId) => {
    this.setState({ isPinned: true })
    let data = {
      noteId: noteId,
      isPinned: this.state.isPinned
    }
    console.log("data in pin notres", data)
    pinNotes(data).then(res => {
      console.log("result of  pinnote", res);
      this.handleGetNotes();
    })
      .catch(err => {
        console.log("err in pinnote component ", err);
      });
  }
  handleColorClose = () => {
    this.setState({ color: true })
  }
  colorChange = () => {
    this.setState()
  }
  handleClosePin = () => {
    this.setState({ isPinned: false })
  }
  newNote = () => {
    console.log("yes im in")
    this.props.initiateGetNotes(true)
    try {
      if (this.state.title === "" && this.state.description === "") {
        this.setState({ cardOpen: false });
      } else {
        const noteData = {
          title: this.state.title,
          description: this.state.description,
          color: this.state.color,
          archieve: this.state.archieve,
          isDeleted: this.state.isDeleted,
          isPinned: true,
        };
        console.log("--------------", noteData);

        saveNote(noteData).then(res => {
          if (res === true) {
            this.setState({
              snackbarMsg: " New Note Saved",
              snackbarOpen: true,
              title: "",
              description: "",
              cardOpen: false,
              color: "",
              archieve: "",
              isDeleted: false 

            });
          } else {
            this.setState({
              snackbarMsg: res,
              snackbarOpen: true
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  paletteProps = (e) => {
    console.log(e)
    this.setState({
      color: e
    })

    this.props.colorChange(e)
    // console.log(this.state.color)
  }

  handleOpen = () => {
    this.setState({
      cardOpen: true
    })
  }
  createArchieveNote = async () => {
    try {
      await this.setState({ isPinned: false, archieve: true })
      this.newNote()
    }
    catch (error) {
      console.log(error)
    }
  }
  render() {
    return !this.state.cardOpen ? (

      <div className="new_card"
        onClick={this.handleOpen}>
        <Card className="create" style={{ boxShadow: "0px 0px 5px 1px" }}>

          <div className="create1">
            <div>
              <InputBase
                placeholder="Take a note..." />
            </div>
            <div className="create_icon">
              <div><CheckBoxOutlinedIcon /></div>
              <div><ImageOutlinedIcon /></div>
              <div><CreateOutlinedIcon /></div>
            </div>
          </div>
        </Card>

        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
            color: "white"
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={2000}
          onClose={this.snackbarClose}
          message={<span id="message-id">{this.state.snackbarMsg}</span>}
          action={[
            <IconButton onClick={this.handleClose}>
              <CloseIcon onClick={this.snackbarClose} />
            </IconButton>
          ]}
        />
      </div>
    ) : (
        <div className="card_open">

          <Card className="card1" style={{ backgroundColor: this.props.color }} >
            {!this.state.isPinned ? (
              <div className="unpin">
                <img src={require('../assets/unpin.svg')} style={{ width: "25px" }} alt="unpin" onClick={this.handleOpenPin} />
              </div>
            ) : (
                <div className="pin" alt="pin" onClick={this.handleClosePin}>
                  <img src={require('../assets/pin.png')} style={{ width: "25px" }} />
                </div>
              )}
            <div>
              <InputBase
                multiline
                placeholder="Ttitle"
                onChange={this.changeTitle}
                value={this.state.title}

              />
            </div>
            <div>
              <InputBase
                multiline
                placeholder="Take a note..."
                onChange={this.changeDescription}
                value={this.state.description}
              />
            </div>

            <div className="icons2">
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
                <Tooltip title="Archive">
                  <ArchiveOutlinedIcon onClick={this.createArchieveNote} />
                </Tooltip>
              </div>
              <div>
                <Tooltip title="More">
                  <MoreVertOutlinedIcon />
                </Tooltip>
              </div>
              <div>
                <Tooltip title="Undo">
                  <UndoTwoToneIcon />
                </Tooltip>
              </div>
              <div>
                <Tooltip title="Redo">
                  <RedoTwoToneIcon />
                </Tooltip>
              </div>
              <div>
                <Button color="primary" onClick={this.newNote}>
                  Close
                </Button>
              </div>
            </div>
          </Card>
        </div>
      );
  }
}

export default withRouter(Notes);
