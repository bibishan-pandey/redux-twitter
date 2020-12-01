import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";

import { handleInitialData } from "../actions/shared";

import Dashboard from "./Dashboard";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div>
        <LoadingBar />
        {!this.props.loading && <Dashboard />}
      </div>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    loading: authUser === null,
  };
}

export default connect(mapStateToProps)(App);
