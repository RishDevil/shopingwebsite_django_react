import React from "react";
import { Form, Icon, Input, Button, Spin } from "antd";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import * as action from "../auth/authenticate";

class NormalLogoutForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.logout();

    this.props.history.push("/");
  };

  render() {
    console.log(this.props.loading);
    let err = null;
    if (this.props.error) {
      err = <p>{this.props.error.message}</p>;
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {err}
        {this.props.loading ? (
          <Spin />
        ) : (
          <Form onSubmit={this.handleSubmit} className="login-form">
            )}
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ marginRight: 10 }}
              >
                Logout
              </Button>
              or
              <NavLink to="/article/signup/" style={{ marginLeft: 10 }}>
                Sign up
              </NavLink>
            </Form.Item>
          </Form>
        )}
      </div>
    );
  }
}
const Logout = Form.create({ name: "normal_login" })(NormalLogoutForm);

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
  };
};
const mapDispaatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(action.logout());
    },
  };
};

export default connect(mapStateToProps, mapDispaatchToProps)(Logout);
