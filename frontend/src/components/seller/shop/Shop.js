import React, { Component } from "react";
import loggedInApi from "../../../api/loggedInApi";
import AddItemButton from "./AddItemButton";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import ShopItem from "./ShopItem";
export class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shop: [],
    };
  }

  componentDidMount() {
    console.log("mounting");
    this.loadItems();
  }

  loadItems() {
    console.log("loading items");
    new loggedInApi()
      .get("/products")
      .then((res) => {
        const list = res.data;
        console.log(list);
        console.log(list.length);
        const temp = [];
        list.map((product) => {
          temp.push(
            <Link
              key={product.product_id}
              to={`/seller/products/${product.product_id}`}
              class="flex-none w-96 my-10 mx-10 shadow-lg rounded-xl">
              <div>
                {/* <div class="bg-white rounded-t-xl"> */}
                <img
                  class="w-full h-56 object-cover object-center rounded-t-xl"
                  src={process.env.PUBLIC_URL + "/images/" + product.image_url}
                />
                {/* </div> */}
                <div class="grid grid-rows-4 p-4 tracking-wide">
                  <h3 className="row-span-1 text-gray-500 text-xs mb-1">
                    {product.product_type}
                  </h3>
                  <h2 className="row-span-2 text-gray-900 font-black text-lg">
                    {product.product_name}
                  </h2>
                  <p className="row-span-1 font-bold text-md">{this.formatter.format(product.price)}</p>
                </div>
              </div>
            </Link>

          );
        });
        this.setState({
          shop: temp,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  render() {
    return (
      <Router>
        <div className="container px-2 py-4 mx-auto">
          <Switch>
            <Route exact path="/seller/shop/">
            <section className="pt-32 w-full text-gray-600 body-font overflow-hidden overscroll-auto">

                <div class="flex flex-row flex-wrap">
                  <AddItemButton />
                  {this.state.shop}
              </div>
              </section>
            </Route>
            <Route exact path="/seller/products/:id">
              <ShopItem />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Shop;
