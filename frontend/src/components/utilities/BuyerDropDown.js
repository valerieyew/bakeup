import React, {useState}from 'react'
import ToggleSwitch from './ToggleSwitch';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import loggedInApi from '../../api/loggedInApi';

function BuyerDropdown({ profileClicked, toggleProfile }){
    const [sellerPath, setSellerPath] = useState("/seller/shop")
    new loggedInApi().get("/shopexist").then(
        (res) => {
            console.log("responding");
            if (!res.data) {
                setSellerPath("/createshop")
            }
        }
    ).catch(err => console.log(err))

    return (
        // <div className="flex justify-end px-10">
        <div className={profileClicked ? 'absolute top-24 right-24 w-52 py-2 mt-2 bg-white rounded-2xl border-none dark:bg-gray-800' : 'hidden'}
            onClick={toggleProfile}>
            <a href="#" className="block px-2 py-2 text-center text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">My Profile</a>
            {/* <form method="POST" action="#" role="none"> */}
                <a href="/"  onClick={e => {window.location.reload(false)}} className="block w-full text-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                    Sign out
                </a>
            {/* </form> */}
            <div className="flex px-2 pt-8 mb-2 justify-center">
                <a href={sellerPath} class="text-gray-600 text-s bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 hover:text-white rounded">Seller Mode</a>
                
                {/* <ToggleSwitch /> */}
            </div>
        </div>
        // </div>
    );
}

export default BuyerDropdown;