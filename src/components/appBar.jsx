/**
 * @ fileName: appbar
 * @description: navigation menu
 */
import React, { Component } from "react";
import { IconButton, AppBar, Toolbar, Tooltip, Menu, Button } from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { withRouter } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import DrawerNav from "./drawerNavigation";
import Avatar from "@material-ui/core/Avatar";
import SvgGrid from "../icons/grid";
import ViewStreamOutlinedIcon from '@material-ui/icons/ViewStreamOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import StopIcon from '@material-ui/icons/Stop';
import PieChart from 'react-minimal-pie-chart';
const thm = createMuiTheme({
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "white",
        color: "black"
      }
    },
    MuiTypography: {
      body1: {
        marginTop: "-40px",
        marginLeft: "60px"
      }
    },
    MuiInputBase: {
      input: {
        width: "250px",
        padding: "15px"
      }
    },
    MuiDrawer: {
      paperAnchorDockedLeft: {
        top: "65px"
      }
    },
    MuiAvatar: {
      colorDefault: {
        color: "mediumspringgreen",
        backgroundColor: "black"
      }
    },
    MuiPaper: {
      rounded: {
        marginTop: "50px",
        marginLeft: "-20px"
      }
    }
  }
});

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
      noteArray: []
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

  reload = () => {
    window.location.reload();
  };

  showListView = () => {
    this.props.handleView();
  };

  Signout = () => {
    this.props.history.push("/login");
  };

  render() {
    let viewIcon = !this.props.view ? (
      <Tooltip title="List View">
        <SvgGrid />
      </Tooltip>
    ) : (
        <Tooltip title="Grid View">
          <ViewStreamOutlinedIcon />
        </Tooltip>
      );

    return (
      <div className="nav">
        <MuiThemeProvider theme={thm}>
          <AppBar >
            <Toolbar>
              <div className="Menu_Button">
                <div >
                  <IconButton onClick={this.menuOpen} >
                    <MenuIcon />
                  </IconButton>
                </div>
                <div >
                  <img src={require("../assets/keep.png")} className="keep_image" alt={this.props.alt} />
                </div>
                <div>FUNDOO </div>
              </div>
              <div className="search_main_div">
                <div className="Search_Base">
                  <div className="searchicon">
                    <SearchIcon />
                  </div>
                  <div>
                    <InputBase placeholder="Search…" />
                  </div>
                </div>

                <div className="appicons">
                  <div>
                    <RefreshIcon onClick={this.reload} />
                  </div>
                  <div>
                    <ShoppingCartOutlinedIcon />
                  </div>
                  <div>
                    <IconButton onClick={this.showListView}>
                      {viewIcon}
                    </IconButton>
                    <IconButton>
                    </IconButton>
                  </div>
                </div>
              </div>
              <div>
                <div className="name">
                  <Avatar onClick={this.menuItem} aria-owns="simple-menu">
                    G{" "}
                  </Avatar>
                  <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}>
                    <div>
                      <PieChart
                        data={[
                          { title: 'Pinned Note', value: this.props.pinnedCount, color: '#03fcdf' },
                          { title: 'Archieve Note', value: this.props.archieveCount, color: '#ca03fc' },
                          { title: 'Trash Note', value: this.props.trashCount, color: '#FFC154' },
                        ]} />
                    </div>
                    <div className="piechart-icon">
                      <span className="chart-span"><StopIcon style={{ color: "#03fcdf" }} />Pinned({this.props.pinnedCount})</span>
                      <span className="chart-span"><StopIcon style={{ color: "#ca03fc" }} />Archieve({this.props.archieveCount})</span>
                      <span className="chart-span"><StopIcon style={{ color: "#FFC154" }} />Trash({this.props.trashCount})</span>
                    </div>
                    <div className="signout-button">
                      <Button aria-owns="simple-menu"
                        variant="outlined"
                        color="primary"
                        startIcon={<ExitToAppIcon />}
                        onClick={this.Signout}>
                        SignOut
                        </Button>
                    </div>
                  </Menu>
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <DrawerNav open={this.state.open} handleArchive={this.props.handleArchive}
            handleNote={this.props.handleNote} handleTrash={this.props.handleTrash}
            handleReminder={this.props.handleReminder}
            labeldata={this.props.labeldata} />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withRouter(Navigation);
