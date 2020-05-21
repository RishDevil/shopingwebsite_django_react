import React, { Component } from "react";
import { Card, Button, Form } from "antd";
import axios from "axios";
import { authAxios } from "../auth/Axiosauth";
import CustomForm from "./Form";
import { withRouter } from "react-router-dom";
class ArticleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    const articleid = this.props.match.params.articleID;
    axios.get(`http://127.0.0.1:8000/api/${articleid}`).then((res) => {
      this.setState({ articles: res.data });
      console.log("detail", localStorage.getItem("carttoken"));
    });
  }

  handleAddToCart = (event) => {
    event.preventDefault();
    console.log("addto cart....");
    const slug = this.props.match.params.articleID;
    console.log("slug:", slug);
    authAxios
      .post("http://127.0.0.1:8000/api/addcart/a", { slug })
      .then((res) => {
        alert(res.data);
      });
  };

  render() {
    return (
      <div>
        <Card title={this.state.articles.title}>
          <p>{this.state.articles.price}</p>
        </Card>
        <br />

        <Form onSubmit={this.handleAddToCart}>
          <Button type="danger" htmlType="submit">
            Add to cart
          </Button>
        </Form>
      </div>
    );
  }
}

export default withRouter(ArticleDetail);
