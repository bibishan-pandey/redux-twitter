import { saveLikeToggle } from "../utils/api";

export const RECEIVE_TWEETS = "RECEIVE_TWEETS";
export const TOGGLE_TWEET = "TOGGLE_TWEET";

export const receiveTweets = (tweets) => {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  };
};

const toggleTweets = ({ id, authUser, hasLiked }) => {
  return {
    type: TOGGLE_TWEET,
    id,
    authUser,
    hasLiked,
  };
};

export const handleToggleTweet = (info) => {
  return (dispatch) => {
    dispatch(toggleTweets(info));
    return saveLikeToggle(info).catch((e) => {
      dispatch(toggleTweets(info));
      console.warn("Handle Toggle Tweet Error: ", e.message);
      alert("There was an error when liking the tweet. Try again.");
    });
  };
};
