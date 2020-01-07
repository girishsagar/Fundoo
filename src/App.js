import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import login from "./components/login";
import "./App.css";
import "./navigation.css";
import appBar from "./components/appBar";
import regst from "./components/regst";
import forgetPassword from "./components/forgetPassword";
import drawer from "./components/drawerNavigation";
import dropDown from "./components/dropDown";
import note from "./components/note";
import dashBoard from "./components/dashBoard";
import getnote from "./components/getNote";
import editNote from "./components/editNote"
import color from "./components/colorNote"
import archive from "./components/archive"
import more from "./components/more"
import trash from "./components/trash";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={login}></Route>
          <Route path="/register" component={regst}></Route>
          <Route path="/forget" component={forgetPassword}></Route>
          <Route path="/appBar" component={appBar}></Route>
          <Route path="/drawer" component={drawer}></Route>
          <Route path="/dropDown" component={dropDown}></Route>
          <Route path="/note" component={note}></Route>
          <Route path="/getnote" component={getnote}></Route>
          <Route path="/dashBoard" component={dashBoard}></Route>
          <Route path="/editNote" component={editNote}></Route>
          <Route path="/color" component={color}></Route>
          <Route path="/archive" component={archive}></Route>
          <Route path="/more" component={more}></Route>
          <Route path="/trash" component={trash}></Route>
        </Switch>
      </Router>
    );
  }
}
export default App;
