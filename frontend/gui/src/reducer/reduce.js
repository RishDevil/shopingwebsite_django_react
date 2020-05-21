import * as acton from "../auth/actionType";
import { updateObject } from "./utility";

const isState = {
  error: null,
  token: null,
  loading: false
};

const authStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null
  });
};

const authSucc = (state, action) => {
  return updateObject(state, {
    token: action.token,
    loading: false,
    error: null
  });
};

const authFail = (state, action) => {
  console.log("in reducer");
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};
const authLogout = (state, action) => {
  console.log("outing");
  console.log('authtoken :',localStorage.getItem('carttoken'));

  return  updateObject(state,{
    token: null
  });
};

const reduce = (state = isState, action) => {
  switch (action.type) {
    case acton.AUTH_START:
      return authStart(state, action);
    case acton.AUTH_SUCC:
      return authSucc(state, action);
    case acton.AUTH_FAIL:
      return authFail(state, action);
    case acton.AUTH_LOGOUT:
      return authLogout(state, action);
    default:
      return state;
  }
};
export default reduce;
