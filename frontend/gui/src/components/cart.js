import React, { Component } from "react";
import { authAxios } from "../auth/Axiosauth";
class cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      list: null
    };
  }

  componentDidMount() {
    authAxios.get("http://127.0.0.1:8000/api/odersumary").then(res => {
      this.setState({ data: res.data, list: "true" });

      this.state.data.items.map(res => {
        console.log(res);
      });
    });
  }

  render() {
    return (
      <div>
        <h1>cart</h1>
        {this.state.list === "true"
          ? this.state.data.items.map((orderitem, i) => {
              return (
                <div>
                  <h1>Title : {orderitem.item.title}</h1>
                  <h4>Quantity : {orderitem.quantity}</h4>
                  <h4>Total price : {orderitem.total_price}</h4>
                </div>
              );
            })
          : "hiii"}
      </div>
    );
  }
}

export default cart;
