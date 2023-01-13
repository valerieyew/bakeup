import React, { Component } from 'react'
import loggedInApi from '../../../api/loggedInApi';
import SellerPendingOrderPreview from './SellerPendingOrderPreview';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export class SellerPendingOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        console.log("mounting")
        this.loadOrders()
    }

    componentDidUpdate() {
        this.loadOrders();
    }

    loadOrders() {
        new loggedInApi().get("/orders/seller/pending").then(
            res => {
                const list = res.data;
                const temp = [];
                // if ((list.length) !== this.state.orders.length) {
                    list.map(
                        (order) => {
                            temp.push(
                                <SellerPendingOrderPreview
                                    loadParentMethod={this.loadOrders}
                                    orderId={order.orderId}
                                    productName={order.productName}
                                    quantity={order.quantity}
                                    collectionDateTime={this.dateFormatter.format(Date.parse(order.collectionTime))}
                                    key={order.orderId}
                                    reload={this.loadOrders}
                                />
                            );
                        }
                    )
                    this.setState({
                        orders: temp
                    })
                }
            // }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    dateFormatter = new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    render() {
        return (
            <div class="grid grid-cols-1 pb-96 h-5/6 gap-5 overflow-auto">
                <Router>
                    <Switch>
                        <Route exact path="/seller/order/pending/">
                            <div>{this.state.orders}</div>
                        </Route>
                        <Route exact path="/seller/order/">
                            <div>{this.state.orders}</div>
                        </Route>
                    </Switch>
                    {/* <div className="grid grid-cols-1 pb-48 gap-5 overflow-auto"> */}
                </Router>
            </div>
        )
    }

}

export default SellerPendingOrders;