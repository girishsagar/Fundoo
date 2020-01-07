import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Tooltip, Card } from "@material-ui/core";
import { getNote, } from "../controller/userController";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
class Trash extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drawerOpen: false,
            open: false,
            notes: [],
            isDeleted: "",

        }
    }
    componentDidMount() {
        this.handleGetNotes();
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
    render() {
        return (
            <div className="_notes"  >
            <div className="_notes_" style={{marginTop:"95px",flexWrap:"wrap",}}>
                {this.state.notes.map(key => {
                    if( key.data().isDeleted === true) {
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
                                        <div>
                                            <Tooltip title="Delete forever">
                                                <DeleteForeverIcon />
                                            </Tooltip>
                                        </div>
                                        <div>
                                            <Tooltip title="Restore">
                                                <RestoreFromTrashIcon />
                                            </Tooltip>
                                        </div>

                                    </div>
                                </Card>
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