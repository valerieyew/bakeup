import React, { useState } from "react";
import BuyerHeader from "./BuyerHeader";
import ExplorePage from "./explore/ExplorePage";
import OrderSubmitted from "./explore/OrderSubmitted";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import OrdersMain from "./orders/OrdersMain";
import BuyerDropdown from "../utilities/BuyerDropDown";
import Seller from "../seller/Seller";

const Buyer = () => {
  // const [profileClicked, setProfileClicked] = useState(false);

  // const toggleProfile = () => {
  //   setProfileClicked(!profileClicked);
  // };

  const [exploreSelected, setExploreSelected] = useState(true);
  const [ordersSelected, setordersSelected] = useState(false);
  const [chatSelected, setchatSelected] = useState(false);

  const toggleExplore = () => {
    setExploreSelected(true);
    setordersSelected(false);
    setchatSelected(false);
  };

  const toggleOrders = () => {
    setExploreSelected(false);
    setordersSelected(true);
    setchatSelected(false);
  };

  const toggleChat = () => {
    setExploreSelected(false);
    setordersSelected(false);
    setchatSelected(true);
  };

  return (
    <Router>
      <BuyerHeader
        // toggleProfile={toggleProfile}
        toggleExplore={toggleExplore}
        toggleOrders={toggleOrders}
        toggleChat={toggleChat}
        exploreSelected={exploreSelected}
        ordersSelected={ordersSelected}
        chatSelected={chatSelected}
      />
      {/* <ExplorePage exploreSelected={exploreSelected}/>
            <BuyerOrders ordersSelected={ordersSelected} /> */}
      <Switch>
        <Route exact path="/explore">
          <ExplorePage />
        </Route>
        <Route exact path="/orders">
          <OrdersMain />
        </Route>
        <Route exact path="/chat">
          {/* to be completed after we start business :D */}
        </Route>
        <Route exact path="/products/submitted/">
          <OrderSubmitted />
        </Route>
        <Route exact path="/seller/shop">
          <Seller />
        </Route>
      </Switch>
      {/* <BuyerDropdown profileClicked={profileClicked} toggleProfile={toggleProfile} /> */}

    </Router>
  );
};

export default Buyer;
