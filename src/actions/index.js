import api from "../services/api";
import config from "../services/config";
import ReactS3 from "react-s3";

import {
  SET_CURRENT_USER,
  ASYNC_START,
  LOG_OUT,
  HANDLE_SEARCH,
  SEARCH_VIEW,
  UPDATES_VIEW,
  INDIVIDUAL_CHARITY_VIEW,
  RESET_SEARCH,
  ADD_SUPPORT,
  ADD_PLEDGE,
  ADD_UPDATES,
  CLEAR_SEARCH,
  CHANGE_PLEDGE,
  MODIFY_DONATIONS_VIEW,
  HANDLE_ERROR,
  EDIT_CHARITY_VIEW,
  ADD_UPDATE_VIEW,
  CHARITY_CARD,
  EDIT_CHARITY
} from "./types";

export const fetchUser = () => dispatch => {
  dispatch({ type: ASYNC_START });
  api.auth.getCurrentUser().then(user => {
    dispatch({ type: SET_CURRENT_USER, user });
  });
};

export const login = (username, password, history) => dispatch => {
  dispatch({ type: ASYNC_START });
  api.auth.login(username, password).then(user => {
    if (user.error) {
      const message = user.error;
      dispatch({ type: LOG_OUT, user });
      dispatch({ type: HANDLE_ERROR, message });
    } else {
      localStorage.setItem("token", user.token);
      const message = null;
      dispatch({ type: SET_CURRENT_USER, user });
      dispatch({ type: HANDLE_ERROR, message });
      history.push("/");
    }
  });
};

export const signup = (
  username,
  password,
  email,
  firstName,
  lastName,
  history
) => dispatch => {
  dispatch({ type: ASYNC_START });
  api.auth.signup(username, password, email, firstName, lastName).then(user => {
    localStorage.setItem("token", user.token);
    const message = null;
    dispatch({ type: SET_CURRENT_USER, user });
    dispatch({ type: HANDLE_ERROR, message });
    history.push("/");
  });
};

export const logout = history => dispatch => {
  let user = null;
  localStorage.removeItem("token");
  dispatch({ type: LOG_OUT, user });
  history.push("/login");
};

export const signupCharity = (
  username,
  password,
  charityName,
  tagline,
  URL,
  mission,
  ic,
  pic,
  history
) => dispatch => {
  dispatch({ type: ASYNC_START });
  ReactS3.upload(pic, config).then(picture =>
    ReactS3.upload(ic, config).then(icon =>
      api.auth
        .signupCharity(
          username,
          password,
          charityName,
          tagline,
          URL,
          mission,
          icon.location,
          picture.location,
          history
        )
        .then(user => {
          localStorage.setItem("token", user.token);
          const message = null;
          dispatch({ type: SET_CURRENT_USER, user });
          dispatch({ type: HANDLE_ERROR, message });
          history.push("/");
        })
    )
  );
};

export const handleSearch = searchQuery => dispatch => {
  dispatch({ type: HANDLE_SEARCH, searchQuery });
};

export const resetSearch = supports => dispatch => {
  dispatch({ type: RESET_SEARCH, supports });
};

export const clearSearch = supports => dispatch => {
  dispatch({ type: CLEAR_SEARCH });
};

export const searchView = supports => dispatch => {
  dispatch({ type: SEARCH_VIEW, supports });
};

export const updatesView = () => dispatch => {
  dispatch({ type: UPDATES_VIEW });
};
export const modifyDonationsView = () => dispatch => {
  dispatch({ type: MODIFY_DONATIONS_VIEW });
};

export const individualCharityView = (charity, supports) => dispatch => {
  dispatch({ type: INDIVIDUAL_CHARITY_VIEW, charity, supports });
};

export const addSupport = (user, charity, pledge) => dispatch => {
  dispatch({ type: ASYNC_START });
  api.support.addSupport(user, charity, pledge).then(updates => {
    if (updates.updates) {
      updates.updates.forEach(updateToAdd => {
        dispatch({ type: ADD_UPDATES, updateToAdd });
      });
    }
  });
  dispatch({
    type: ADD_SUPPORT,
    charity
  });
  dispatch({
    type: ADD_PLEDGE,
    charity,
    pledge
  });
  dispatch({ type: UPDATES_VIEW });
};

export const changePledge = (id, donation, charity, user_id) => dispatch => {
  dispatch({ type: ASYNC_START });
  api.support.changeSupport(id, donation, user_id);
  dispatch({
    type: CHANGE_PLEDGE,
    charity,
    donation
  });
};

export const handleError = message => dispatch => {
  dispatch({ type: HANDLE_ERROR, message });
};

export const editCharityView = () => dispatch => {
  dispatch({ type: EDIT_CHARITY_VIEW });
};
export const addUpdate = () => dispatch => {
  dispatch({ type: ADD_UPDATE_VIEW });
};
export const charityCard = () => dispatch => {
  dispatch({ type: CHARITY_CARD });
};

export const createUpdate = (title, content, image, charityId) => dispatch => {
  const message = null;
  dispatch({ type: HANDLE_ERROR, message });
  dispatch({ type: ASYNC_START });
  ReactS3.upload(image, config).then(data =>
    api.manager.addUpdate(title, content, data.location, charityId)
  );
};

export const editCharity = (
  id,
  name,
  tagline,
  URL,
  mission,
  ic,
  pic
) => dispatch => {
  const message = null;
  dispatch({ type: HANDLE_ERROR, message });
  dispatch({ type: ASYNC_START });
  ReactS3.upload(pic, config).then(picture =>
    ReactS3.upload(ic, config).then(icon =>
      api.manager
        .editCharity(
          id,
          name,
          tagline,
          URL,
          mission,
          icon.location,
          picture.location
        )
        .then(charity => dispatch({ type: EDIT_CHARITY, charity }))
    )
  );
};
