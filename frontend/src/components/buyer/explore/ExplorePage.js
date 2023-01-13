import React, { Component } from "react";
import loggedInApi from "../../../api/loggedInApi";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import ItemDetails from "./ItemDetails";
import OrderSubmitted from "./OrderSubmitted";

class ExplorePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.exploreSelected,
      search: "",
      showDefault: true,
      itemList: [],
      productDisplay: null,
      displayExplore: true,
    };
    console.log(props.exploreSelected);
  }

  onSearchSubmit = (event) => {
    event.preventDefault();
    this.setState({ showDefault: false });
    var keyword = this.state.search
    if (this.state.search === "") {
      keyword = "all"
    }
    new loggedInApi()
      .get("/search/" + keyword)
      .then((res) => {
        const list = res.data[1];
        console.log(list);
        const temp = [];
        list.map((product) => {
          temp.push(
            <Link
              key={product.product_id}
              to={`/products/${product.product_id}`}
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
                    {product.shopName}
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
          itemList: temp,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    console.log("mounting");
    new loggedInApi()
      .get("/products/all")
      .then((res) => {
        const list = res.data;
        console.log(list);
        const temp = [];
        list.map((product) => {
          temp.push(
            <Link
              key={product.product_id}
              to={`/products/${product.product_id}`}
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
                    {product.shopName}
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
          itemList: temp,
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
      <div className="container px-2 py-4 mx-auto">
        <Router>
          <Switch>
            <Route exact path="/explore">
              <section className="pt-32 w-full text-gray-600 body-font overflow-hidden overscroll-auto">
                <div className="container px-2 py-4 mx-auto">
                  <form onSubmit={(e) => this.onSearchSubmit(e)}>
                    <div className="flex mx-10 py-4 justify-center">
                      <input
                        class="w-1/2 h-12 text-lg border-yellow-500 border-2 rounded-lg p-4 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
                        type="text"
                        placeholder="Search for a product or product type..."
                        onChange={(e) =>
                          this.setState({ search: e.target.value.toLowerCase() })
                        }
                      />
                    </div>
                  </form>
                  {/* <div className="flex flex-wrap -m-4"> */}
                  {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center px-8"> */}
                  <div class="flex flex-row flex-wrap">
                    {this.state.itemList}
                  </div>
                  {/* </div> */}
                </div>
                {/* <section class="text-gray-600 body-font overflow-hidden">
            {this.state.productDisplay}
          </section> */}
              </section>
            </Route>
            <Route exact path="/products/:id">
              <ItemDetails />
            </Route>
            <Route exact path="products/submitted/">
              <OrderSubmitted />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default ExplorePage;
