
import React, { Component } from 'react'
import { Card, TextField, Tooltip, CardContent, CardActions, IconButton, Button, Menu, Snackbar, Chip, MenuItem, Popover, InputBase, FormControlLabel, Checkbox } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import BrushIcon from '@material-ui/icons/Brush';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import ArchiveIcon from '@material-ui/icons/Archive';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SvgPin from '../../icons/Pin'
import SvgPinned from '../../icons/Pinned'
import { saveNote, saveLabel } from '../../controller/controller'
import Reminder from './reminder';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from "@material-ui/pickers";
class CreateNote extends Component {
    constructor() {
        super()
        this.state = {
            cardOpen: false,
            anchorEl: null,
            cardColor: '',
            reminderAnchorEl: null,
            title: '',
            description: '',
            archieve: false,
            reminder: null,
            time: '',
            date: '',
            snackbarOpen: false,
            snackbarMessage: '',
            pin: false,
            labelAnchorEl: null,
            createLabelAnchorEl: null,
            displayButton: 'button-hide',
            label: '',
            openReminderMenu: false,
            labels: []
        }
    }
    createLabelDialogOpen = (e) => {
        this.setState({ createLabelAnchorEl: e.currentTarget, labelAnchorEl: null })
    }
    createLabel = () => {
        this.setState({ createLabelAnchorEl: null })

        if (this.state.label !== '') {
            const data = {
                label: this.state.label
            }
            saveLabel(data).then(res => {
                console.log('result label', res)
                this.setState({ labels: res, label: '', displayButton: 'button-hide' })
                this.props.updateLabel()
            })
        }
    }
    handleLabel = async (e) => {
        await this.setState({ label: e.target.value, displayButton: 'button-display' })
        this.state.label === '' ?
            this.setState({ displayButton: 'button-hide' }) :
            this.setState({ displayButton: 'button-display' })

    }
    createLabelDialogClose = () => {
        this.setState({ createLabelAnchorEl: null })
    }
    labelMenuOpen = (e) => {
        this.setState({ labelAnchorEl: e.currentTarget })
    }
    labelMenuClose = () => {
        this.setState({ labelAnchorEl: null })
    }
    snackbarClose = (e) => {
        this.setState({ snackbarOpen: false })
    }
    openCard = () => {
        this.setState({ cardOpen: true })
    }
    colorMenuClose = () => {
        this.setState({ anchorEl: null });
    }
    colorMenuOpen = (e) => {
        this.setState({ anchorEl: e.currentTarget });
    }

    changeColor = (e) => {
        this.setState({ cardColor: e.currentTarget.style.backgroundColor, anchorEl: null });
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    pinTheNote = (e) => {
        this.setState({ pin: !this.state.pin })
    }
    handleClickAway = () => {
        try {
            if (this.state.title === '' && this.state.description === '') {
                this.setState({ cardOpen: false, cardColor: '' })
            }
            else {
                this.setState({ cardOpen: false })
                const noteData = {
                    title: this.state.title,
                    description: this.state.description,
                    color: this.state.cardColor,
                    archieve: this.state.archieve,
                    pin: this.state.pin,
                    reminder: this.state.reminder,
                    labels: this.state.labels
                }
                saveNote(noteData, this.state.labels).then(res => {
                    if (res === true) {
                        this.setState({
                            snackbarMessage: 'Note Saved',
                            snackbarOpen: true,
                            title: '',
                            description: '',
                            cardColor: '',
                            archieve: false,
                            reminder: null,
                            pin: false
                        })
                        this.props.handleRef()
                    }
                    else {
                        this.setState({
                            snackbarMessage: res,
                            snackbarOpen: true,
                        })
                    }

                })
            }

        }
        catch (error) {
            console.log(error)
        }
    }
    createArchieveNote = async () => {
        try {
            await this.setState({ pin: false, archieve: true })
            this.handleClickAway()
        }
        catch (error) {
            console.log(error)
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
        await this.setState({ reminder: reminder })
    }
    handleTomorrowDate = async () => {
        this.reminderMenuClose()
        let tomorrow = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
        let date = tomorrow.toDateString();
        let reminder1 = date + ", 8:00 PM";
        await this.setState({ reminder: reminder1 })
    }
    handleNextWeekDate = async () => {
        this.reminderMenuClose()
        let nextweek = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7);
        let date = nextweek.toDateString();
        let reminder1 = date + ", 8:00 PM";
        await this.setState({ reminder: reminder1 })
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
        this.setState({ openReminderMenu: !this.state.openReminderMenu });
    };
    setDateOpen = e => {
        this.setState({ openReminderMenu: !this.state.openReminderMenu });
    };
    removeReminder = () => {
        this.setState({ reminder: null })
    }
    setDateOpen = e => {
        this.setState({ openReminderMenu: !this.state.openReminderMenu });
      };
    handleCheckBoxClick = (e) => {
        if (e.target.checked) {
            this.setState({
                labels: [...this.state.labels, { id: e.target.id, label: e.target.value }]
            });
        }
    }
    removeLabel = (e) => {
        const labels = this.state.labels.filter(item => item.id !== e.target.id);
        this.setState({ labels: labels });
    }
    render() {
        let labels = '';
        if (this.state.labels.length > 0) {
            labels = this.state.labels.map(item => {
                return (
                    <Chip
                        label={item.label}
                        id={item.id}
                        onDelete={(event) => this.removeLabel(event)}
                        deleteIcon={<CancelIcon id={item.id} />}
                        variant="outlined" />
                )
            })
        }
        let labelData = '';
        if (this.props.labelData.length > 0) {
            labelData = this.props.labelData.map(item => {
                return (
                    <div>
                        <FormControlLabel
                            control={<Checkbox color="primary"
                                id={item.id}
                                name={item.label}
                                value={item.label}
                                onChange={(event) => this.handleCheckBoxClick(event)} />}
                            label={item.label}
                            labelPlacement="end" />
                    </div>
                )
            })
        }
        let svgPin = !this.state.pin ? <SvgPin /> : <SvgPinned />
        let reminderMenuItem = !this.state.openReminderMenu ?
            <div>
                <Menu
                    id="reminder-menu"
                    anchorEl={this.state.reminderAnchorEl}
                    open={Boolean(this.state.reminderAnchorEl)}
                    onClose={this.reminderMenuClose}>
                    <MenuItem onClick={this.handleTodayDate}>Later Today</MenuItem>
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
            !this.state.cardOpen ?
                <div>
                    <div className="create-note-card">
                        <div>
                            <TextField
                                multiline
                                InputProps={{ disableUnderline: true }}
                                placeholder="Take a note ...."
                                readOnly={true}
                                onClick={this.openCard}
                                value="">
                            </TextField>
                        </div>
                        <div className="create-note-icon">
                            <Tooltip title="New List">
                                <CheckBoxIcon
                                    aria-label="New List"
                                    className="create-note-card-icons" />
                            </Tooltip>
                            <Tooltip title="New Note With Image">
                                <ImageIcon
                                    aria-label="Image"
                                    className="create-note-card-icons" />
                            </Tooltip>
                            <Tooltip title="New Note with Draw">
                                <BrushIcon
                                    aria-label="Image"
                                    className="create-note-card-icons" />
                            </Tooltip>
                        </div>
                    </div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        className='snackbar'
                        open={this.state.snackbarOpen}
                        autoHideDuration={3000}
                        onClose={this.snackbarClose}
                        message={<span id="messege-id"> {this.state.snackbarMessage}</span>}>
                    </Snackbar>
                </div>
                :
                <div>
                    <Card className="create-note-card1" style={{ backgroundColor: this.state.cardColor }}>
                        <CardContent disableSpacing>
                            <div className="title-pin">
                                <TextField
                                    multiline
                                    InputProps={{ disableUnderline: true }}
                                    placeholder="Title..."
                                    className="create-note-textarea"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.onChange}>
                                </TextField>
                                <IconButton onClick={this.pinTheNote}>
                                    {svgPin}
                                </IconButton>
                            </div>
                            <TextField
                                multiline
                                InputProps={{ disableUnderline: true }}
                                placeholder="Take a Note"
                                className="create-note-textarea"
                                name="description"
                                value={this.state.description}
                                onChange={this.onChange}>
                            </TextField>
                        </CardContent>
                        <p>{this.state.reminder !== null ?
                            <Chip
                                icon={<AccessTimeIcon />}
                                label={this.state.reminder}
                                onDelete={this.removeReminder}
                                variant="outlined"
                            />
                            : null}</p>
                        <p>{labels !== '' && labels}</p>
                        <CardActions disableSpacing>
                        <IconButton
                    aria-controls="reminder-menu"
                    aria-haspopup="true"
                    onClick={this.reminderMenuOpen}>
                    <Tooltip title="Remind me">
                        <AddAlertIcon />
                    </Tooltip>
                </IconButton>
                            {/* <Reminder
                                anchorEl={this.state.reminderAnchorEl}
                                handleTodayDate={this.handleTodayDate}
                                handleTomorrowDate={this.handleTomorrowDate}
                                handleNextWeekDate={this.handleNextWeekDate}
                                reminderMenuOpen={this.reminderMenuOpen}
                                reminderMenuClose={this.reminderMenuClose} 
                                openReminderMenu={this.state.openReminderMenu}
                                time={this.state.time}
                                date={this.state.date}
                                handleDate={this.handleDate}
                                handleTime={this.handleTime}/> */}
                            {reminderMenuItem}
                            <IconButton>
                                <Tooltip title="Add colaborator">
                                    <PersonAddIcon />
                                </Tooltip>
                            </IconButton>
                            <IconButton
                                aria-controls="color-menu"
                                aria-haspopup="true"
                                onClick={this.colorMenuOpen}>
                                <Tooltip title="Add color">
                                    <ColorLensIcon />
                                </Tooltip>
                            </IconButton>
                            <Menu
                                id="color-menu"
                                anchorEl={this.state.anchorEl}
                                keepMounted
                                open={Boolean(this.state.anchorEl)}
                                onClose={this.colorMenuClose}>
                                <div>
                                    <IconButton>
                                        <RadioButtonUncheckedRoundedIcon
                                            style={{ backgroundColor: "#f28b82" }}
                                            onClick={this.changeColor} />
                                    </IconButton>
                                    <IconButton>
                                        <RadioButtonUncheckedRoundedIcon
                                            style={{ backgroundColor: "#cbf0f8" }}
                                            onClick={this.changeColor} />
                                    </IconButton>
                                </div>
                                <div>
                                    <IconButton>
                                        <RadioButtonUncheckedRoundedIcon
                                            style={{ backgroundColor: "#a7ffeb" }}
                                            onClick={this.changeColor} />
                                    </IconButton>
                                    <IconButton>
                                        <RadioButtonUncheckedRoundedIcon
                                            style={{ backgroundColor: "#fdcfe8" }}
                                            onClick={this.changeColor} />
                                    </IconButton>
                                </div>
                            </Menu>
                            <IconButton>
                                <Tooltip title="Add Image">
                                    <ImageIcon />
                                </Tooltip>
                            </IconButton>
                            <IconButton>
                                <Tooltip title="Archieve">
                                    <ArchiveIcon
                                        onClick={this.createArchieveNote} />
                                </Tooltip>
                            </IconButton>
                            <IconButton
                                aria-controls="label-menu"
                                aria-haspopup="true"
                                onClick={this.labelMenuOpen}>
                                <Tooltip title="More">
                                    <MoreVertIcon />
                                </Tooltip>
                            </IconButton>
                            <Menu
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                id="label-menu"
                                anchorEl={this.state.labelAnchorEl}
                                keepMounted
                                open={Boolean(this.state.labelAnchorEl)}
                                onClose={this.labelMenuClose}>
                                <MenuItem
                                    onClick={this.createLabelDialogOpen}
                                    aria-controls="create-label-menu"
                                    aria-haspopup="true">Add Label</MenuItem>
                                <MenuItem>Add Darawing</MenuItem>
                            </Menu>
                            <Popover
                                id="create-label-menu"
                                anchorEl={this.state.createLabelAnchorEl}
                                open={Boolean(this.state.createLabelAnchorEl)}
                                onClose={this.createLabelDialogClose}
                                anchorOrigin={{
                                    vertical: 'center',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'center',
                                    horizontal: 'center',
                                }} >
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
                                            id="inputRoot" />
                                    </div>
                                    <div><SearchIcon /></div>
                                </div>
                                <div>
                                    {labelData}
                                </div>
                                <div className={this.state.displayButton}>
                                    <Button
                                        variant="contained"
                                        color="default"
                                        startIcon={<AddIcon />}
                                        onClick={this.createLabel}>
                                        Create
                                    </Button>"{this.state.label}"
                                </div>
                            </Popover>
                            <Button
                                onClick={this.handleClickAway}>
                                Close</Button>
                        </CardActions>
                    </Card>
                </div>
        )
    }
}
export default CreateNote