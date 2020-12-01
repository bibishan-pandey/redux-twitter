import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { formatDate, formatTweet } from "../utils/helpers";
import {
  TiArrowBackOutline,
  TiHeartFullOutline,
  TiHeartOutline,
} from "react-icons/all";
import { handleToggleTweet } from "../actions/tweets";

class Tweet extends Component {
  toParent = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/tweet/${id}`);
  };

  handleLike = (e) => {
    e.preventDefault();
    const { dispatch, tweet, authUser } = this.props;
    dispatch(
      handleToggleTweet({
        id: tweet.id,
        hasLiked: tweet.hasLiked,
        authUser,
      })
    );
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
      id,
      parent,
    } = tweet;

    return (
      <Link to={`/tweet/${id}`} className={"tweet"}>
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
      </Link>
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

export default withRouter(connect(mapStateToProps)(Tweet));
