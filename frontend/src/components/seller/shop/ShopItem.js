import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import loggedInApi from "../../../api/loggedInApi";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link,
} from "react-router-dom";

function ShopItem() {
  let { id } = useParams();
  const [state, setState] = useState({});
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [shop, setShop] = useState("");
  const [shopId, setShopId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [variations, setVariations] = useState([]);
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [restrictions, setRestrictions] = useState([]);
  const [count, setCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [chosenVariation, setChosenVariation] = useState(0);

  useEffect(() => {
    itemSetUp();
    return () => {
      setState({}); // This worked for me
    };
  }, []);

  const itemSetUp = () => {
    new loggedInApi()
      .get("/products/" + id)
      .then((res) => {
        const product = res.data;
        setName(product.product_name);
        setType(product.product_type);
        setShop(product.shop_name);
        setShopId(product.shopId);
        setPrice(product.price);
        setDescription(product.product_description);
        setImage(process.env.PUBLIC_URL + "/images/" + product.image_url);
        setVariations(product.variations);
        setDate(product.date_listed);
        setRestrictions(product.dietary_restrictions);
        setIngredients(product.ingredients);
        setChosenVariation(product.variations[0]);
        if (variations == null) {
          setVariations(["No options"]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const displayRestrictions = () => {
    if (restrictions != null) {
      return (
        <div className="ml-10 mt-4">
          <div className="ui horizontal list">
            <div
              className="item"
              style={{ fontStyle: "bold", fontSize: "20px" }}
            >
              Special dietary restrictions:
            </div>
            {restrictions.map((restriction) => {
              return (
                <div
                  style={{ alignContent: "stretch" }}
                  key={restriction}
                  className="item items-center bg-yellow-100 text-gray-500 flex-center rounded mt-2"
                >
                  <div className="content text-center px-5">{restriction}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
      setTotalPrice(price * (count - 1));
    }
  };

  const increment = () => {
    setCount(count + 1);
    setTotalPrice(price * (count + 1));
  };

  const changeVariation = (event) => {
    console.log("change in variation");
    setChosenVariation(event.target.value);
  };

  // const submitOrder = async (event) => {
  //   await new loggedInApi()
  //     .post("/orders", {
  //       productId: id,
  //       sellerId: shopId,
  //       quantity: count,
  //       totalPrice: totalPrice,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <Router>
      <Switch>
        <Route exact path={`/seller/products/${id}`}>
          <div className="container px-5 py-24 mx-auto mt-10">
            <div class="lg:w-4/5 md:w-4/5 mx-auto flex flex-wrap">
              <img
                class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={image}
              />
              <div class="relative lg:w-1/2 w-full lg:py-6 mt-6 lg:mt-0">
                <h2 class="text-sm ml-10 title-font text-gray-500 tracking-widest">
                  {shop}
                </h2>
                <span style={{ display: "flex" }}>
                  <button
                    className="ui button icon"
                    style={{ background: "none", marginLeft: "auto" }}
                  >
                    <i className="edit icon"></i>
                  </button>
                </span>
                <h1 class="text-gray-900 ml-10 text-3xl title-font font-medium mb-1">
                  {name}
                </h1>
                <div class="ml-10 mt-4">{description}</div>
                {displayRestrictions()}
                <p class="mt-8 ml-10 font-semibold text-yellow-600">
                  Ingredients: {ingredients}
                </p>
                <div class="flex mt-4 w-full items-center justify-between">
                  <span class="title-font mx-10 font-medium text-2xl text-gray-600-">
                    {formatter.format(price)} / piece
                  </span>
                </div>
                <div class="ml-10 mb-4 mt-4">
                  <span>Variations:</span>
                  <select
                    value={chosenVariation}
                    onChange={changeVariation}
                    class="flex w-full bottom-8 justify-between"
                  >
                    {variations.map((variation) => {
                      return (
                        <option value={variation} key={variation}>
                          {variation}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default ShopItem;
