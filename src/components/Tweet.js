import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate, formatTweet } from "../utils/helpers";
import {
  TiArrowBackOutline,
  TiHeartFullOutline,
  TiHeartOutline,
} from "react-icons/all";

class Tweet extends Component {
  toParent = (e, id) => {
    e.preventDefault();
    // TODO: redirect to parent tweet
  };

  handleLike = (e) => {
    e.preventDefault();
    // TODO: add like functionality
  };

  render() {
    const { tweet } = this.props;
    if (tweet === null) return <p>This tweet does not exists</p>;

    const {
      name,
      avatar,
      timestamp,
      text,
      hasLiked,
      likes,
      replies,
      parent,
    } = tweet;

    return (
      <div className={"tweet"}>
        <img src={avatar} alt={name} className={"avatar"} />
        <div className={"tweet-info"}>
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button
                onClick={(e) => this.toParent(e, parent.id)}
                className={"replying-to"}
              >
                Replying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className={"tweet-icons"}>
            <TiArrowBackOutline className={"tweet-icon"} />
            <span>{replies !== 0 && replies}</span>
            <button className={"heart-button"} onClick={this.handleLike}>
              {hasLiked ? (
                <TiHeartFullOutline
                  color={"#e0245e"}
                  className={"tweet-icon"}
                />
              ) : (
                <TiHeartOutline className={"tweet-icon"} />
              )}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </div>
    );
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
