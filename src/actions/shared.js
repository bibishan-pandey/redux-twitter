import { hideLoading, showLoading } from "react-redux-loading";
import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveTweets } from "./tweets";
import { setAuthUser } from "./authUsers";

const AUTH_ID = "dan_abramov";

export const handleInitialData = () => {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, tweets }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveTweets(tweets));
      dispatch(setAuthUser(AUTH_ID));
      dispatch(hideLoading());
    });
  };
};
