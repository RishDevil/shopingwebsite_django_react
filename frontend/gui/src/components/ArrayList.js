import React from "react";
import Article from "./Article";
import axios from "axios";
import CustomForm from "./Form";

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: "http://ant.design",
    title: `ant design part ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
  });
}

class ArrayList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/").then(res => {
      this.setState({ articles: res.data });
      console.log("loading....");
      console.log(res.data);
    });
  }

  render() {
    return (
      <div>
        <Article data={this.state.articles} />
        <br />
        <CustomForm articleId="null" requestType="post" btnText="Create" />
      </div>
    );
  }
}

export default ArrayList;
