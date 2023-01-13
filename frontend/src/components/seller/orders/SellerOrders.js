import React, { useState, useEffect } from "react";
import SellerCompletedOrders from "./SellerCompletedOrders";
import SellerOrdersSideNav from "./SellerOrdersSideNav";
import SellerPendingOrders from "./SellerPendingOrders";
import SellerUpcomingOrders from "./SellerUpcomingOrders";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SellerPendingOrderPreview from "./SellerPendingOrderPreview";

function SellerOrders() {
  // Toggle for type of orders
  const [showPending, setShowPending] = useState(true);
  const [showUpcoming, setShowUpcoming] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const togglePending = () => {
    setShowPending(true);
    setShowUpcoming(false);
    setShowCompleted(false);
  };
  const toggleUpcoming = () => {
    setShowPending(false);
    setShowUpcoming(true);
    setShowCompleted(false);
  };
  const toggleCompleted = () => {
    setShowPending(false);
    setShowUpcoming(false);
    setShowCompleted(true);
  };

  // const whatToDisplay = () => {
  //   if (showPending) {
  //     return <SellerPendingOrders />;
  //   } else if (showUpcoming) {
  //     return <SellerUpcomingOrders />;
  //   } else if (showCompleted) {
  //     return <SellerCompletedOrders />;
  //   } else {
  //     return <SellerPendingOrders />;
  //   }
  // };

  return (
    <Router>
      {/* <div class="fixed flex flex-col w-11/12 h-screen px-8 mt-32 ml-64 border-none dark:bg-gray-800 dark:border-none">
        {whatToDisplay()}
      </div> */}
      <SellerOrdersSideNav 
        togglePending={togglePending}
        toggleUpcoming={toggleUpcoming}
        toggleCompleted={toggleCompleted}
        showPending={showPending}
        showUpcoming={showUpcoming}
        showCompleted={showCompleted}
      />
      <div className="flex flex-col w-11/12 h-full px-8 pt-32 ml-64 border-none dark:bg-gray-800 dark:border-none">
        <Switch>
        <Route exact path="/seller/order/">
            <SellerPendingOrders />
          </Route>
          <Route exact path="/seller/order/pending">
            <SellerPendingOrders />
          </Route>
          <Route exact path="/seller/order/upcoming">
            <SellerUpcomingOrders />
          </Route>
          <Route exact path="/seller/order/completed">
          <SellerCompletedOrders />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default SellerOrders;
