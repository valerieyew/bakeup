import React, { Component, useState, useEffect } from "react";
import loggedInApi from "../../../api/loggedInApi";
// import SellerPendingOrderDetails from "./SellerPendingOrderDetails";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BuyerPendingOrderDetails from "./BuyerPendingOrderDetails";

function BuyerPendingOrderPreview(props) {

    // const date = {
    //     collectionDate: new Date(props.collectionDateTime),
    //     formattedDate: dateFormatter.format(this.collectionDate)
    // }

    // var dateFormatter = new Intl.DateTimeFormat('en-US', {
    //     year: 'numeric',
    //     month: 'long',
    //     day: '2-digit'
    // });

  const [orderId, setOrderId] = useState(props.orderId);
  const method = props.loadParentMethod
  const [viewDetails, setViewDetails] = useState(false);
  const toggleViewDetails = () => {
    setViewDetails(true);
  };
  const setCloseDetails = () => {
    setViewDetails(false);
  };

  const whatToDisplay = () => {
    if (viewDetails) {
      return (
        <div class="bg-gray-700 bg-opacity-40 justify-between flex flex-wrap fixed overflow-x-hidden overflow-y-auto inset-0 outline-none focus:outline-none">
          {/* makeshift clickoutside */}
          <button class="w-2/12 h-screen" onClick={setCloseDetails}></button>
          <BuyerPendingOrderDetails orderId={orderId} closeDetails={setCloseDetails}/>
          <button class="w-2/12 h-screen" onClick={setCloseDetails}></button>
        </div>
      );
    }
  };

  const acceptOrder = (e) => {
      
      new loggedInApi().put("/orders/" + orderId, {status: "Processing"}).then(
          res => {
              console.log(res.data)
          }
      ).catch(err => {console.log(err)})
     ; 
  }

  return (
    <>
      <div class="container flex justify-center w-5/6 pt-8 tracking-wider">
        <div class="grid grid-rows-5 grid-cols-8 gap-4 p-6 w-7/12 h-2/6 shadow-lg border-2 border-gray-100 items-center">
          <div class="row-span-2 col-span-2">
            <div class="mb-2 text-sm md:text-xs text-center font-bold text-gray-400">
              SHOP:
            </div>
            <div class="text-center text-gray-700">{props.shopName}</div>
          </div>
          <div class="row-span-2 col-span-3">
            <div class="mb-2 text-sm md:text-xs text-center font-bold text-gray-400">
              COLLECTION DATE:
            </div>
            <div class="text-center text-gray-700">
              {props.collectionDateTime}
            </div>
          </div>
          <div class="row-span-5 col-span-3">
          <div class="grid grid-rows-5 items-start">
                            <button class="row-span-2 self-start mt-2 p-4 text-gray-500 font-bold text-xl border-2 border-gray-300 rounded-md hover:bg-gray-200 hover:text-black"
                            onClick={toggleViewDetails}>VIEW ORDER</button>
                            <button 
                            onClick={(e) => acceptOrder(e)}
                            class="row-span-3 self-end justify-self-center w-32 mb-4 p-2 text-gray-500 font-bold text-lg bg-red-100 rounded-md hover:bg-red-300 hover:text-black">CANCEL</button>
                        </div>
          </div>
          <div class="row-span-3 col-span-5 p-4 pl-6">
                        <div class="mb-2 text-sm font-bold text-gray-400 text-left">ORDER</div>
                        <div class="flex justify-between pr-12 text-gray-700">
                            <div class="pl-6">{props.productName}</div>
                            <div>x {props.quantity}</div>
                        </div>
                    </div>        </div>
      </div>
      {whatToDisplay()}
    </>
  );
}

export default BuyerPendingOrderPreview;
