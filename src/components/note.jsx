import React, { Component } from "react";
import {
  Tooltip,
  Card,
  InputBase,
  Button,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Popover
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import CloseIcon from "@material-ui/icons/Close";
import ColorComponent from "./colorNote";
import { withRouter } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";

import UndoTwoToneIcon from "@material-ui/icons/UndoTwoTone";
import RedoTwoToneIcon from "@material-ui/icons/RedoTwoTone";
import { saveNote, getNote, pinNotes, saveLabel } from "../controller/userController";
import Reminder from "./reminder";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/Add";
import SvgPin from "../icons/svgPin"
import SvgPinned from "../icons/svgUnpin"
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
      reminder: null,
      snackbarOpen: false,
      snackbarMsg: "",
      anchorElPooper: false,
      date: "",
      time: "",
      labelAnchorEl: null,
      createLabelAnchorEl: null,
      displayButton: "button-hide",
      label: "",
      openReminderMenu: false,
      labels: [],
    };
  }

  createLabelDialogOpen = e => {
    this.setState({
      createLabelAnchorEl: e.currentTarget,
      labelAnchorEl: null
    });
  };

  createLabel = () => {
    this.setState({ createLabelAnchorEl: null });

    if (this.state.label !== "") {
      const data = {
        label: this.state.label
      };
      saveLabel(data).then(res => {
        console.log("result label", res);
        this.setState({ labels: res, label: "", displayButton: "button-hide" });
        //  this.props.updateLabel();
        this.handleGetNotes()
      });
    }
  };

  handleLabel = async e => {
    await this.setState({
      label: e.target.value,
      displayButton: "button-display"
    });
    this.state.label === ""
      ? this.setState({ displayButton: "button-hide" })
      : this.setState({ displayButton: "button-display" });
  };

  createLabelDialogClose = () => {
    this.setState({ createLabelAnchorEl: null });
  };

  labelMenuOpen = e => {
    this.setState({ labelAnchorEl: e.currentTarget });
  };

  labelMenuClose = () => {
    this.setState({ labelAnchorEl: null });
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
  componentDidMount() {
    this.handleGetNotes();
  }

  handleClose = event => {
    this.setState({ anchorEl: null });
  };
  menuOpen = () => {
    this.setState({ open: !this.state.open });
  };
  menuItem = e => {
    this.setState({ anchorEl: e.currentTarget });
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

  handleOpenPin = noteId => {
    this.setState({ isPinned: true });
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
  };

  handleColorClose = () => {
    this.setState({ color: true });
  };

  colorChange = () => {
    this.setState();
  };

  handleClosePin = () => {
    this.setState({ isPinned: false });
  };

  newNote = () => {
    console.log("yes im in");
    this.props.initiateGetNotes(true);
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
          reminder: this.state.reminder,
          labels: this.state.labels,
          isPinned: true
        };
        console.log("--------------", noteData);

        saveNote(noteData, this.state.labels).then(res => {
          if (res === true) {
            this.setState({
              snackbarMsg: " New Note Saved",
              snackbarOpen: true,
              title: "",
              description: "",
              cardOpen: false,
              color: "",
              archieve: "",
              isDeleted: false,
              reminder: null
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
  };
  paletteProps = e => {
    console.log(e);
    this.setState({
      color: e
    });

    this.props.colorChange(e);
    // console.log(this.state.color)
  };

  handleOpen = () => {
    this.setState({
      cardOpen: true
    });
  };

  createArchieveNote = async () => {
    try {
      await this.setState({ isPinned: false, archieve: true });
      this.newNote();
    } catch (error) {
      console.log(error);
    }
  };

  handleReminderDate = date => {
    this.setState({ reminder: date });
  };

  removeReminder = () => {
    this.setState({ reminder: null });
  };
  handleCheckBoxClick = e => {
    if (e.target.checked) {
      this.setState({
        labels: [
          ...this.state.labels,
          { id: e.target.id, label: e.target.value }
        ]
      });
    }
  };
  removeLabel = e => {
    const labels = this.state.labels.filter(item => item.id !== e.target.id);
    this.setState({ labels: labels });
  };

  render() {
    let labels = "";
    if (this.state.labels.length > 0) {
      labels = this.state.labels.map(item => {
        return (
          <Chip
            label={item.label}
            id={item.id}
            onDelete={event => this.removeLabel(event)}
            deleteIcon={<CancelIcon id={item.id} />}
            variant="outlined"
          />
        );
      });
    }
    // let labelData = "";
    // if (this.props.labelData.length > 0) {
    //   labelData = this.props.labelData.map(item => {
    //     return (
    //       <div>
    //         <FormControlLabel
    //           control={
    //             <Checkbox
    //               color="primary"
    //               id={item.id}
    //               name={item.label}
    //               value={item.label}
    //               onChange={event => this.handleCheckBoxClick(event)}
    //             />
    //           }
    //           label={item.label}
    //           labelPlacement="end"
    //         />
    //       </div>
    //     );
    //   });
    // }
    return !this.state.cardOpen ? (
      <div className="new_card" onClick={this.handleOpen}>
        <Card className="create" style={{ boxShadow: "0px 0px 5px 1px" }}>
          <div className="create1">
            <div>
              <InputBase placeholder="Take a note..." />
            </div>
            <div className="create_icon">
              <div>
                <CheckBoxOutlinedIcon />
              </div>
              <div>
                <ImageOutlinedIcon />
              </div>
              <div>
                <CreateOutlinedIcon />
              </div>
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
        <div>
          <div className="card_open">
            <Card className="card1" style={{ backgroundColor: this.props.color }}>
              {!this.state.isPinned ? (
                <div className="unpin" onClick={this.handleOpenPin}>
                  <SvgPin />
                </div>
              ) : (
                  <div className="pin" alt="pin" onClick={this.handleClosePin}>
                    <SvgPinned />
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
              {labels}
              <div>
                <p>
                  {this.state.reminder !== null ? (
                    <Chip
                      style={{ display: "flex", marginLeft: "-1em" }}
                      icon={<AccessTimeIcon />}
                      label={this.state.reminder}
                      onDelete={this.removeReminder}
                      variant="outlined"
                    />
                  ) : null}
                </p>
              </div>
              <div className="icons2">
                <div>
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
                  <IconButton
                    aria-controls="label-menu"
                    aria-haspopup="true"
                    onClick={this.labelMenuOpen}
                  >
                    <Tooltip title="More">
                      <MoreVertIcon />
                    </Tooltip>
                  </IconButton>
                  <Menu
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left"
                    }}
                    id="label-menu"
                    anchorEl={this.state.labelAnchorEl}
                    keepMounted
                    open={Boolean(this.state.labelAnchorEl)}
                    onClose={this.labelMenuClose}
                  >
                    <MenuItem
                      onClick={this.createLabelDialogOpen}
                      aria-controls="create-label-menu"
                      aria-haspopup="true">
                      Add Label
                  </MenuItem>
                    <MenuItem>Add Darawing</MenuItem>
                  </Menu>
                  <Popover
                    id="create-label-menu"
                    anchorEl={this.state.createLabelAnchorEl}
                    open={Boolean(this.state.createLabelAnchorEl)}
                    onClose={this.createLabelDialogClose}
                    anchorOrigin={{
                      vertical: "center",
                      horizontal: "center"
                    }}
                    transformOrigin={{
                      vertical: "center",
                      horizontal: "center"
                    }}
                  >
                    <div className="label-note">
                      <span>Label Note</span>
                    </div>
                    <div className="label-input">
                      <div>
                        <InputBase
                          name="label"
                          value={this.state.label}
                          onChange={this.handleLabel}
                          placeholder="Enter label Name"
                          id="inputRoot"
                        />
                      </div>
                      <div>
                        <SearchIcon />
                      </div>
                    </div>
                    {/* <div>{labelData}</div> */}
                    <div className={this.state.displayButton}>
                      <Button
                        variant="contained"
                        color="default"
                        startIcon={<AddIcon />}
                        onClick={this.createLabel}
                      >
                        Create
                    </Button>
                      "{this.state.label}"
                  </div>
                  </Popover>

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
        </div>
      );
  }
}

export default withRouter(Notes);