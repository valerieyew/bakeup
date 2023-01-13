import React, { Component, useState, useEffect } from 'react';
import loggedInApi from '../../../api/loggedInApi';
import SellerUpcomingOrderDetails from './SellerUpcomingOrderDetails';


function SellerUpcomingOrderPreview(props) {

    const [orderId, setOrderId] = useState(props.orderId)
    const [viewDetails, setViewDetails] = useState(false);
    const toggleViewDetails = () => {
        setViewDetails(true);
    }
    const setCloseDetails = () => {
        setViewDetails(false);
    }

    const acceptOrder = (e) => {
      
        new loggedInApi().put("/orders/" + orderId, {status: "Completed"}).then(
            res => {
                console.log(res.data)
            }
        ).catch(err => {console.log(err)})
       ; 
    //    props.reload();
    }

    const whatToDisplay = () => {
        if (viewDetails) {
            return (
                <div class="bg-gray-700 bg-opacity-40 justify-between flex flex-wrap fixed overflow-x-hidden overflow-y-auto inset-0 outline-none focus:outline-none">
                    {/* makeshift clickoutside */}
                    <button class="w-2/12 h-screen"
                        onClick={setCloseDetails}>
                    </button>
                    <SellerUpcomingOrderDetails orderId={orderId} closeDetails={setCloseDetails}/>
                    <button class="w-2/12 h-screen"
                        onClick={setCloseDetails}>
                    </button>

                </div>

            )
        }
    }

    return (
        <>
            <button class="container flex justify-center w-5/6 pt-8 tracking-wider">
                <div class="grid grid-rows-5 grid-cols-8 gap-4 p-6 w-7/12 h-2/6 shadow-lg border-2 border-gray-100 items-center">
                    <div class="row-span-2 col-span-2">
                        <div class="mb-2 pt-3 text-sm text-center font-bold text-gray-400">ORDER ID:</div>
                        <div class="text-center text-gray-700">{props.orderId}</div>
                    </div>
                    <div class="row-span-2 col-span-3">
                        <div class="mb-2 pt-3 text-sm text-center font-bold text-gray-400">COLLECTION DATE:</div>
                        <div class="text-center text-gray-700">{props.collectionDateTime}</div>
                    </div>
                    <div class="row-span-5 col-span-3">
                        <div class="grid grid-rows-5 items-start">
                            <button class="row-span-2 self-start mt-2 p-4 text-gray-500 font-bold text-xl border-2 border-gray-300 rounded-md hover:bg-gray-200 hover:text-black"
                            onClick={toggleViewDetails}>VIEW ORDER</button>
                            <button 
                            onClick={(e) => acceptOrder(e)}
                            class="row-span-3 self-end justify-self-center w-32 mb-4 p-2 text-gray-500 font-bold text-lg bg-green-100 rounded-md hover:bg-green-300 hover:text-black">COMPLETE</button>
                        </div>
                    </div>
                    <div class="row-span-3 col-span-5 p-4 pl-6">
                        <div class="mb-2 text-sm font-bold text-gray-400 text-left">ORDER</div>
                        <div class="flex justify-between pr-12 text-gray-700">
                            <div class="pl-6">{props.productName}</div>
                            <div>x {props.quantity}</div>
                        </div>
                    </div>
                </div>
            </button>
            {whatToDisplay()}
        </>
    );
}

export default SellerUpcomingOrderPreview;