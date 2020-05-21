import React from "react";
import { Form, Icon, Input, Button, Spin } from "antd";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import * as action from "../auth/authenticate";

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.onAuth(values.username, values.password);
      }
    });
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
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ marginRight: 10 }}
              >
                Log in
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
const Login = Form.create({ name: "normal_login" })(NormalLoginForm);

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error
  };
};
const mapDispaatchToProps = dispatch => {
  return {
    onAuth: (username, password) => {
      dispatch(action.login(username, password));
    }
  };
};

export default connect(mapStateToProps, mapDispaatchToProps)(Login);
