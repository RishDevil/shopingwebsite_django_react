import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "antd/es/date-picker/style/css";
import CustomLayout from "./components/container";
import BaseRouter from "./components/BaseRouter";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import * as action from "./auth/authenticate";

class App extends React.Component {
  componentDidMount() {
    this.props.autoSign();
    console.log(this.props.isAuthenticate);
    console.log(localStorage.getItem("carttoken"));
  }

  render() {
    return (
      <div className="App">
        <Router>
          <CustomLayout {...this.props}>
            <BaseRouter />
          </CustomLayout>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticate: state.token !== null
  };
  console.log("state token", state.token);
};

const mapDispatchToprops = dispatch => {
  return {
    autoSign: () => dispatch(action.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(App);
