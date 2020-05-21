import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const CustomLayout = (props) => {
  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">
            <Link to="/">Posts</Link>
          </Menu.Item>
          {props.isAuthenticate ? (
            <Menu.Item key="2">
              {" "}
              <Link to="/article/logout">Logout</Link>
            </Menu.Item>
          ) : (
            <Menu.Item key="2">
              <Link to="/article/registration">Login</Link>
            </Menu.Item>
          )}
          {props.isAuthenticate ? (
            <Menu.Item key="3" style={{ float: "right" }}>
              <Link to="/article/cart"> Cart</Link>
            </Menu.Item>
          ) : (
            ""
          )}
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>
            <Link to="/"> Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/">List</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
          {props.children}
        </div>
      </Content>
    </Layout>
  );
};

export default CustomLayout;
