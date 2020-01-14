import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tooltip, Button, Menu, MenuItem, IconButton, } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import SvgPin from "../icons/svgPin"
import SvgPinned from "../icons/svgUnpin"
class Reminder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reminder: "",
        }
    }
    reminderMenuOpen = (e) => {
        this.setState({ reminderAnchorEl: e.currentTarget });
    }

    reminderMenuClose = () => {
        this.setState({ reminderAnchorEl: null });
    }

    handleTodayDate = async () => {
        this.reminderMenuClose()
        let date = new Date().toDateString();
        let reminder = date + ", 8:00 PM";
        this.props.handleReminderDate(reminder)
    }

    handleTomorrowDate = async () => {
        this.reminderMenuClose()
        let tomorrow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
        let date = tomorrow.toDateString();
        let reminder1 = date + ", 8:00 PM";
        this.props.handleReminderDate(reminder1)
    }

    handleNextWeekDate = async () => {
        this.reminderMenuClose()
        let nextweek = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7);
        let date = nextweek.toDateString();
        let reminder1 = date + ", 8:00 PM";
        await this.setState({ reminder: reminder1 })
        this.props.handleReminderDate(reminder1)
    }

    handleDate = (v, e) => {
        let date1 = v.toString().slice(3, 15);
        this.setState({ date: date1 });
        console.log(this.state.date);
    };

    handleTime = (v, e) => {
        let time1 = v;
        console.log(time1);
        this.setState({ time: time1 });
        console.log(this.state.time);
    };

    handleSave = () => {
        this.reminderMenuClose()
        let time1 = this.state.time;
        let time = time1.toString().slice(15, 24);
        console.log(time);
        this.setState({ reminder: this.state.date + "," + time });
        this.props.handleReminderDate(this.state.date + "," + time)
        this.setState({ openReminderMenu: !this.state.openReminderMenu });
    };

    setDateOpen = e => {
        this.setState({ openReminderMenu: !this.state.openReminderMenu });
    };

    removeReminder = () => {
        this.setState({ reminder: null })
    }

    render() {
        let reminderMenuItem = !this.state.openReminderMenu ?
            <div>
                <Menu
                    id="reminder-menu"
                    anchorEl={this.state.reminderAnchorEl}
                    open={Boolean(this.state.reminderAnchorEl)}
                    onClose={this.reminderMenuClose}>
                    <MenuItem onClick={this.handleTodayDate}>Today</MenuItem>
                    <MenuItem onClick={this.handleTomorrowDate}>Tomorrow</MenuItem>
                    <MenuItem onClick={this.handleNextWeekDate}>Next Week</MenuItem>
                    <MenuItem onClick={this.setDateOpen}>Date Time</MenuItem>
                </Menu>
            </div>
            :
            <div>
                <Menu
                    id="reminder-menu"
                    anchorEl={this.state.reminderAnchorEl}
                    open={Boolean(this.state.reminderAnchorEl)}
                    onClose={this.reminderMenuClose}>
                    <div className="dateAndReminder">
                        <div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    name="date"
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    value={this.state.date}
                                    onChange={(value, event) => this.handleDate(value, event)}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date"
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    name="time"
                                    margin="normal"
                                    id="time-picker"
                                    value={this.state.time}
                                    onChange={(value, event) => this.handleTime(value, event)}
                                    KeyboardButtonProps={{
                                        "aria-label": "change time"
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                    </div>
                    <div className="saveInReminder">
                        <Button
                            onClick={this.handleSave}
                            style={{ backgroundColor: "silver" }}>
                            Save
            </Button>
                    </div>
                </Menu>
            </div>
        return (

            <div>
                <IconButton
                    aria-haspopup="true"
                    onClick={this.reminderMenuOpen}>
                    <Tooltip title="Remind me">
                        <AddAlertOutlinedIcon />
                    </Tooltip>
                </IconButton>
                {reminderMenuItem}
            </div>
        )
    }
}
export default withRouter(Reminder)
