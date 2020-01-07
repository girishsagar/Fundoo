import React, { Component } from 'react'
import { Tooltip, IconButton, Popper, Paper, ClickAwayListener, Menu } from '@material-ui/core'
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import { withRouter } from 'react-router-dom';
const colorPalette = [{ name: "default", colorCode: "#FDFEFE" },
{ name: "Red", colorCode: "RGB(102, 204, 255)" },
{ name: "Cyan", colorCode: "RGB(179, 255, 102)" },
{ name: "Blue", colorCode: "#2196f3" },
{ name: "Indigo", colorCode: "#9fa8da" },
{ name: "LightBlue", colorCode: "#90caf9" },
{ name: "Purple", colorCode: "#b39ddb" },
{ name: "Yellow", colorCode: "#c5e1a5" },
{ name: "Lime", colorCode: "#e6ee9c" },
{ name: "Pink", colorCode: "#f48fb1" },
{ name: "gray", colorCode: "#eeeeee" },
{ name: "Brown", colorCode: "#bcaaa4" },
]
class ColorComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // open: false,
            anchorEl: false
        }
    }
    handleClickAway = () => {
        this.setState({
            anchorEl: false
        })
    }

    handleChangeColor = (e) => {
        console.log("hiii" + e);
        this.props.paletteProps(e.target.value,this.props.id)
    }
    handleClose = () => {
        this.setState({
            anchorEl: false
        })
    }

    handleClick(event) {

        this.setState({
            anchorEl: this.state.anchorEl ? false : event.target
        });
    };
    render() {

        const colorChange = colorPalette.map((key) => {
            return (
                <div className="color-map" >
                    <Tooltip title={key.name}>
    
                        <IconButton style={{ backgroundColor: key.colorCode, border: "silver 2px solid" }}
                            value={key.colorCode}
                            onClick={this.handleChangeColor}>
                        </IconButton>
                
                    </Tooltip>
                </div>
            )
        })
        return (
            <div className="colorpalette-div">
                <Tooltip title="change color">
                    <ClickAwayListener onClickAway={this.handleClickAway}>
                        <ColorLensOutlinedIcon onClick={(event) => this.handleClick(event)} cursor="pointer" />
                    </ClickAwayListener>
                </Tooltip>
                <div className="Change">
                    <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} className="paint" 
                        style={{
                            zIndex: "9999", width: "25em", display: "flex", flexDirection: "row", margin: "25px"
                        }}
                    >

                        <Paper className="color-styles">
                            {colorChange}
                        </Paper>

                    </Popper>
                </div>
            </div>
        )
    }
}
export default withRouter(ColorComponent)