import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Buyer from './components/buyer/Buyer';
import Seller from './components/seller/Seller';
import OrdersMain from './components/buyer/orders/OrdersMain';
import SignUp from './components/login/SignUp';
import CreateShop from './components/seller/shop/CreateShop';
import SellerOrders from './components/seller/orders/SellerOrders';

function App() {

  return (
    <Router>
      <Switch>
        {/* <Route path="/" exact component={buyer} toggle={toggle} isOpen={isOpen} /> */}
        <Route path="/" exact component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/explore" component={Buyer}/>
        <Route path="/createshop" component={CreateShop} />
        <Route path="/seller/shop" component={Seller} />
        <Route path="/orders" component={OrdersMain}/>
        <Route path="seller/order/" component={SellerOrders} />
      </Switch>
    </Router>
  );
}

export default App;