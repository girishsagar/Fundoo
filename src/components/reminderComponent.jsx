import React, { Component } from "react";
import {
    Tooltip,
    Card, Chip, Avatar
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import ColorComponent from "./colorNote";
import { getNote, archiveTheNote, colorChange, pinNotes } from "../controller/userController";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import More from "./more";
import Reminder from "./reminder"
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SvgPin from "../icons/svgPin"
import SvgPinned from "../icons/svgUnpin"

class ReminderComponent extends Component {
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
    componentDidMount() {
        this.handleGetNotes();
        console.log('reminder4444')
    }
    handleGetNotes = () => {
        getNote()
            .then(res => {
                this.setState({
                    notes: res
                })
            })
            .catch(err => {
                console.log("err", err);
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
    handleReminderDate = date => {
        this.setState({ reminder: date });
    };
    removeReminder = () => {
        this.setState({ reminder: null });
    };
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


    render() {
        return (
            <div className={this.props.noteStyle}>
                <div className="_notes">
                    <div className="_notes_" style={{ marginTop: "95px", flexWrap: "wrap", }}>
                        {this.state.notes.map(key => {
                            if ((key.data().reminder !== null) && (key.data().archieve === false)) {
                                return (

                                    <div className="notes_" >
                                        <Card
                                            className="get_Nottes_card"
                                            style={{
                                                width: "250px",
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
                                                    </div>
                                                    <div>{key.data().description}</div>

                                                </div>
                                                <div>
                                                    {key.data().reminder !== null ?
                                                        <Chip
                                                            style={{ display: "flex", marginLeft: "-6em", marginTop: "5em" }}
                                                            icon={<AccessTimeIcon />}
                                                            label={key.data().reminder}
                                                            onDelete={this.removeReminder}
                                                            variant="outlined" />
                                                        : null}
                                                </div>

                                                <div>
                                                    <Avatar style={{ background: "#d2cece", marginLeft: "-25px" }}
                                                        onClick={() => this.handlePin(key.id)}>
                                                        {key.data().isPinned === true ? < SvgPinned /> : <SvgPin />}
                                                    </Avatar>

                                                </div>
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
                                                    <ColorComponent paletteProps={this.paletteProps} id={key.id} />
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
                                                        <MoreVertOutlinedIcon
                                                            onClick={this.menuItem}
                                                            aria-owns="simple-menu" />
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
                        })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ReminderComponent);