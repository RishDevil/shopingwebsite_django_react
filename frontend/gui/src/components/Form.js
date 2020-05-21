import { Form, Input, Button, Radio } from "antd";
import React from "react";
import Axios from "axios";

class CustomForm extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: "horizontal"
    };
  }

  handleFormLayoutChange = e => {
    this.setState({ formLayout: e.target.value });
  };
  ///////////////////////////////////////////
  handleFormSubmit = (e, requestType, articleID) => {
    const title = e.target.elements.Title.value;
    const content = e.target.elements.Content.value;
    console.log(title, content);
    switch (requestType) {
      case "post":
        e.preventDefault();
        Axios.post("http://127.0.0.1:8000/api/create/", {
          title: title,
          content: content
        });
        break;
      case "put":
        Axios.put(`http://127.0.0.1:8000/api/${articleID}/update/`, {
          title: title,
          content: content
        });
    }
  };

  render() {
    const { formLayout } = this.state;
    const formItemLayout =
      formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
          }
        : null;
    const buttonItemLayout =
      formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 }
          }
        : null;
    return (
      <div>
        <Form
          layout={formLayout}
          onSubmit={event =>
            this.handleFormSubmit(
              event,
              this.props.requestType,
              this.props.articleID
            )
          }
        >
          <Form.Item label="Form Layout" {...formItemLayout}>
            <Radio.Group
              defaultValue="horizontal"
              onChange={this.handleFormLayoutChange}
            >
              <Radio.Button value="horizontal">Horizontal</Radio.Button>
              <Radio.Button value="vertical">Vertical</Radio.Button>
              <Radio.Button value="inline">Inline</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Title" {...formItemLayout}>
            <Input name="Title" placeholder="Put title here" />
          </Form.Item>
          <Form.Item label="Content" {...formItemLayout}>
            <Input name="Content" placeholder="Put content here" />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary" htmlType="submit">
              {this.props.btnText}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default CustomForm;
