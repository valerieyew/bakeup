import React, { useState, useEffect } from "react";
import SellerHeader from "./SellerHeader";
import SellerOrders from "./orders/SellerOrders";
import Shop from "./shop/Shop";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Buyer from "../buyer/Buyer";
import SellerDropdown from "../utilities/SellerDropdown";

const Seller = () => {
  // // Toggle for profile icon
  // const [profileClicked, setProfileClicked] = useState(false);

  // const toggleProfile = () => {
  //   setProfileClicked(!profileClicked);
  // };

  // Toggle for header sections
  const [shopSelected, setShopSelected] = useState(true);
  const [ordersSelected, setOrdersSelected] = useState(false);
  const [chatSelected, setChatSelected] = useState(false);

  const toggleShop = () => {
    setShopSelected(true);
    setOrdersSelected(false);
    setChatSelected(false);
  };
  const toggleOrders = () => {
    setShopSelected(false);
    setOrdersSelected(true);
    setChatSelected(false);
  };
  const toggleChat = () => {
    setShopSelected(false);
    setOrdersSelected(false);
    setChatSelected(true);
  };

  return (
    <Router>
      <SellerHeader
        // toggleProfile={toggleProfile}
        toggleShop={toggleShop}
        toggleOrders={toggleOrders}
        toggleChat={toggleChat}
        shopSelected={shopSelected}
        ordersSelected={ordersSelected}
        chatSelected={chatSelected}
      />
      <Switch>
        <Route exact path="/seller/">
          <Shop />
        </Route>
        <Route exact path="/seller/shop/">
          <Shop />
        </Route>
        <Route exact path="/seller/order/">
          <SellerOrders />
        </Route>
        <Route exact path="/seller/chat/"></Route>
        <Route path="/explore/">
          <Buyer />
        </Route>
      </Switch>
      {/* <div class="overflow-hidden">
      <SellerDropdown
        profileClicked={profileClicked}
        toggleProfile={toggleProfile}
      />
      </div> */}
      {/* {whatToDisplay()} */}
    </Router>
  );
};

export default Seller;
