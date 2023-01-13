import React, { Component } from "react";
import loggedInApi from "../../../api/loggedInApi";
import SellerCompletedOrderPreview from "../../seller/orders/SellerCompletedOrderPreview";
import SellerCompletedOrders from "../../seller/orders/SellerCompletedOrders";
import BuyerConfirmedCompletedOrderPreview from "./BuyerConfirmedCompletedOrderPreview";

export class ConfirmedOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    new loggedInApi()
      .get("/orders/buyer/processing")
      .then((res) => {
        console.log(res.data);
        const list = res.data;
        const temp = [];
        list.map((order) => {
          temp.push(
            <BuyerConfirmedCompletedOrderPreview
                                orderId={order.orderId}
                                shopName={order.shopName}
                                productName={order.productName}
                                quantity={order.quantity}
                                collectionDateTime={this.dateFormatter.format(order.collectionDateTime)}
                                key={order.orderId} />
          );
        });
        this.setState({ orders: temp });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(this.state.orders);
  }
  dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
});

  render() {
    return (
      <div class="grid-cols-1 pb-96 h-5/6 gap-5 overflow-auto">
        {this.state.orders}
      </div>
    );
  }
}

export default ConfirmedOrders;