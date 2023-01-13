import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { withRouter } from "react-router";
import BuyerOrdersSideNav from "./BuyerOrdersSideNav";
import PendingOrders from "./PendingOrders";
import ConfirmedOrders from "./ConfirmedOrders";
import CompletedOrders from "./CompletedOrders";

const OrdersMain = () => {

  const [showPending, setShowPending] = useState(true);
  const [showConfirmed, setShowConfirmed] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  const togglePending = () => {
    setShowPending(true);
    setShowConfirmed(false);
    setShowCompleted(false);
  };
  const toggleConfirmed = () => {
    setShowPending(false);
    setShowConfirmed(true);
    setShowCompleted(false);
  };
  const toggleCompleted = () => {
    setShowPending(false);
    setShowConfirmed(false);
    setShowCompleted(true);
  };

  return (
    <Router>
      <div>
        <BuyerOrdersSideNav 
          togglePending={togglePending}
          toggleConfirmed={toggleConfirmed}
          toggleCompleted={toggleCompleted}
          showPending={showPending}
          showConfirmed={showConfirmed}
          showCompleted={showCompleted}
          />
        <div className="flex flex-col w-11/12 h-full px-8 pt-32 ml-64 border-none dark:bg-gray-800 dark:border-none">
          <Switch>
            <Route exact path="/orders">
              <PendingOrders />
            </Route>
            <Route exact path="/orders/pending/">
              <PendingOrders />
            </Route>
            <Route exact path="/orders/confirmed/">
              <ConfirmedOrders />
            </Route>
            <Route exact path="/orders/history/">
              <CompletedOrders />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default OrdersMain;
