import React, { Component } from "react";

import { Route, NavLink } from "react-router-dom";
import "./App.css";
import SmurfForm from "./components/SmurfForm";
import Smurfs from "./components/Smurfs";
import axios from "axios";
import SingleSmurf from "./components/SingleSmurf";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: []
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  componentDidMount = async () => {
    const res = await axios.get("http://localhost:3333/smurfs");
    // console.log(res);
    this.setState({ smurfs: res.data });
  };

  rerenderApp = arr => {
    this.setState({ smurfs: [...arr] });
  };
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <NavLink
          activeStyle={{
            fontWeight: "bold",
            color: "red",
            marginRight: "20px"
          }}
          to="/smurf-form"
        >
          Add a new Smurf
        </NavLink>
        <NavLink
          activeStyle={{
            fontWeight: "bold",
            color: "red",
            marginLeft: "20px"
          }}
          exact
          to="/"
        >
          Home
        </NavLink>
        <Route
          path="/smurf-form"
          render={props => (
            <SmurfForm rerenderApp={this.rerenderApp} {...props} />
          )}
        />
        {/* <SmurfForm rerenderApp={this.rerenderApp} /> */}
        {/* <Smurfs smurfs={this.state.smurfs} /> */}
        <Route
          path="/"
          exact
          render={props => (
            <Smurfs
              rerenderApp={this.rerenderApp}
              smurfs={this.state.smurfs}
              {...props}
            />
          )}
        />
        <Route
          path="/smurf/:id"
          render={props => (
            <SingleSmurf {...props} rerenderApp={this.rerenderApp} />
          )}
        />
      </div>
    );
  }
}

export default App;
