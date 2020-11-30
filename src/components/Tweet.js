import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTweet } from "../utils/helpers";

class Tweet extends Component {
  render() {
    const { tweet } = this.props;
    if (tweet === null) return <p>This tweet does not exists</p>;
    return <div className={"tweet"}></div>;
  }
}

function mapStateToProps(state, props) {
  const { authUser, users, tweets } = state;
  const { id } = props;
  const tweet = tweets[id];
  const parent = tweet ? tweets[tweet.replyingTo] : null;
  return {
    authUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authUser, parent)
      : null,
  };
}

export default connect(mapStateToProps)(Tweet);
