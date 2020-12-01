import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, Redirect, Route } from "react-router-dom";
import LoadingBar from "react-redux-loading";

import { handleInitialData } from "../actions/shared";

import Nav from "./Nav";
import Dashboard from "./Dashboard";
import NewTweet from "./NewTweet";
import TweetPage from "./TweetPage";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <React.Fragment>
        <LoadingBar />
        <div className={"container"}>
          <Nav />
          {!this.props.loading && (
            <Switch>
              <Route path={"/"} exact component={Dashboard} />
              <Route path={"/tweet/:id"} component={TweetPage} />
              <Route path={"/new"} component={NewTweet} />
              <Redirect to={"/"} />
            </Switch>
          )}
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ authUser }) {
  return {
    loading: authUser === null,
  };
}

export default connect(mapStateToProps)(App);
