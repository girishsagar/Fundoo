import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Tooltip, Card, } from "@material-ui/core";
import { getNote, } from "../controller/userController";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import { deleteNote, restoreNote } from "../controller/userController"
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class Trash extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drawerOpen: false,
            open: false,
            notes: [],
            isDeleted: "",
            snackbarOpen: false,
            snackbarMsg: ""
        }
    }
    snackbarClose = e => {
        this.setState({ snackbarOpen: false });
    };

    componentDidMount() {
        this.handleGetNotes();
    }
    handleGetNotes = () => {
        getNote()
            .then(res => {
                this.setState({
                    notes: res,
                });
                console.log("res in notesData archive", this.state.notes);
            })
            .catch(err => {
                console.log("err", err);
            });
    };
    deleteForever = (id) => {
        console.log("the deleteForever is ", id);
        const data = {
            noteId: id
        }
        console.log("the data is deleted id is ", data);
        deleteNote(data).then(res => {
            console.log(res)
            this.handleGetNotes()
            if (res === true) {
                this.setState({
                    snackbarMsg: "Deleted..!",
                    snackbarOpen: true
                })
            }
            else {
                this.setState({
                    snackbarMsg: res,
                    snackbarOpen: true
                })
            }

        })
            .catch(err => {
                console.log("err", err);
            });
    }

    restoreFromTrash = (id) => {
        const data = {
            //   id: this.props.data.id
            noteId: id
        }
        restoreNote(data).then(res => {
            console.log(res)
            this.handleGetNotes()
        })
            .catch(err => {
                console.log("err", err);
            });
    }
    render() {
        return (
            <div className="_notes"  >
                <div className="_notes_" style={{ marginTop: "95px", flexWrap: "wrap", }}>
                    {this.state.notes.map(key => {
                        if (key.data().isDeleted === true) {
                            console.log("the dele is ", key.data().isDeleted);
                            return (
                                <div className="notes_">
                                    <Card
                                        style={{ backgroundColor: this.props.color }}
                                        className="get_Nottes_card"
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

                                            </div>
                                        </div>
                                        <div className="getnoteicons_trash">
                                            <div >
                                                <Tooltip title="Delete forever">
                                                    <IconButton onClick={() => this.deleteForever(key.id)}>
                                                        <DeleteForeverIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                            <div>
                                                <Tooltip title="Restore">
                                                    <IconButton onClick={() => this.restoreFromTrash(key.id)}>
                                                        <RestoreFromTrashIcon />
                                                    </IconButton>
                                                </Tooltip>

                                            </div>

                                        </div>
                                    </Card>
                                    <Snackbar
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                        }}
                                        open={this.state.snackbarOpen}
                                        autoHideDuration={6000}
                                        onClose={this.snackbarClose}
                                        ContentProps={{
                                            'aria-describedby': 'message-id',
                                        }}
                                        message={<span id="message-id">{this.state.snackbarMsg}</span>}
                                        // message={<span id="message-id">Note archived</span>}
                                        action={[
                                            <Button key="undo" color="secondary" size="small"
                                                onClick={this.handleClose}>UNDO
                                              </Button>,
                                            <IconButton
                                                key="close"
                                                aria-label="Close"
                                                color="inherit"
                                                onClick={this.handleClose}
                                            >
                                                <CloseIcon onClick={this.snackbarClose} />
                                            </IconButton>,
                                        ]}
                                    />
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        )
    }
}
export default withRouter(Trash);