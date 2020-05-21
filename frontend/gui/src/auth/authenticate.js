import * as action from "./actionType";
import axios from "axios";
 
export const authStart = () => {
  return { type: action.AUTH_START };
};

export const authSucc = token => {
  return { type: action.AUTH_SUCC, token: token };
};

export const authFail = error => {
  console.log("auth fail");
  return { type: action.AUTH_FAIL, error: error };
};

export const logout = () => {
  localStorage.removeItem("carttoken");
  localStorage.removeItem("cartexpiredate");
  return { type: action.AUTH_LOGOUT };
};

const checkAuthTimeOut = expiredate => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expiredate * 1000);
  };
};

export const login = (username, password) => {
  return dispatch => {
    dispatch(authStart);
    console.log("entring auth");
    axios
      .post("http://127.0.0.1:8000/rest-auth/login/", {
        username: username,
        password: password
      })
      .then(res => {
        console.log("send auth");
        const token = res.data.key;
        const expiredate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("carttoken", token);
        localStorage.setItem("cartexpiredate", expiredate);
        dispatch(authSucc(token));
        dispatch(checkAuthTimeOut(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const signin = (username, email, password1, password2) => {
  return dispatch => {
    dispatch(authStart);
    axios
      .post("http://127.0.0.1:8000/rest-auth/registration/", {
        username: username,
        email: email,
        password1: password1,
        password2: password2
      })
      .then(res => {
        const token = res.data.key;
        const expiredate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("carttoken", token);
        localStorage.setItem("cartexpiredate", expiredate);
        dispatch(authSucc(token));
        dispatch(checkAuthTimeOut(3600));
      })
      .catch(error => {
        dispatch(authFail(error));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("carttoken");
    console.log(token);
    if (token == undefined) {
      dispatch(logout());
    } else {
      const expr = new Date(localStorage.getItem("cartexpiredate"));
      if (expr < new Date()) {
        console.log("logout");
        dispatch(logout());
      } else {
        console.log("auth succc");
        dispatch(authSucc(token));
        dispatch(
          checkAuthTimeOut((expr.getTime() - new Date().getTime()) / 1000)
        );
      }
    }
  };
};
