import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { InputBase, Card, Tooltip, Button,Menu,IconButton,Popover,MenuItem,FormControlLabel,Checkbox} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
class EditLabel extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
  
    return (
      <div>
        <Card className="edit_label"  style={{ boxShadow: "0px 0px 5px 1px" }}>
          <div>
            <Tooltip title="close" className="close_icon">
          <CloseIcon/>
          </Tooltip>
            <InputBase
              multiline
              placeholder="Create New Label"
              onChange={this.changeTitle}
              value={this.state.title} />
          </div>
          {/* <div> */}
            {/* <InputBase
              multiline
              placeholder="Take a note..."
              onChange={this.changeDescription}
              value={this.state.description} />
          </div> */}



          
          <div style={{marginLeft:"15em"}}>
            <Button color="primary">
              Done
            </Button>
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
                    onClose={this.labelMenuClose}>
                    <MenuItem
                      onClick={this.createLabelDialogOpen}
                      aria-controls="create-label-menu"
                      aria-haspopup="true">
                      Add Label
                  </MenuItem>
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
                    }}>
                    <div  className="label-input">
                    <div className="label-note">
                      <span>Label Note</span>
                    </div>
                    <div>
                      <div>
                        <InputBase
                          name="label"
                          value={this.state.label}
                          onChange={this.handleLabel}
                          placeholder="Enter label Name"
                          id="inputRoot"/>
                      </div>
                      <div className="search_icon">
                        <SearchIcon />
                      </div>
                    </div>
                  
                    {/* <div>{labelData}</div> */}
                    <div className={this.state.displayButton}>
                      <Button
                        variant="contained"
                        color="default"
                        startIcon={<AddIcon />}
                        onClick={this.createLabel}>
                        Create
                    </Button>
                      "{this.state.label}"
                  </div>
                  </div>
                  </Popover>

                </div>
        </Card>
      </div>
    );
  }
}

export default withRouter(EditLabel)