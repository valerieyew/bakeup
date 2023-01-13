import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo_bakeup from '../../images/logo_bakeup.png';
import buyer_photo from '../../images/buyer_photo.jpg';
import BuyerDropdown from "../utilities/BuyerDropDown";


function BuyerHeader({ toggleExplore, toggleOrders, toggleChat, exploreSelected, ordersSelected, chatSelected }) {

    const [profileClicked, setProfileClicked] = useState(false);

    const toggleProfile = () => {
      setProfileClicked(!profileClicked);
    };

    const showProfileDropdown = () => {
        if (profileClicked) {
            return <BuyerDropdown profileClicked={profileClicked} toggleProfile={toggleProfile}/>
        }
    }

    return (

        <nav class="w-full fixed bg-yellow-50 shadow-sm">
            <div class="container px-2 py-6 mx-auto md:flex justify-between">
                <div class="flex items-center justify-between">
                    <a href="/explore" onClick={toggleExplore} class="flex items-center focus:outline-none" aria-label="bake up logo">
                        <div class="w-48 overflow-hidden border-none items-center rounded-none">
                            <img src={logo_bakeup} alt="logo" />
                        </div>
                    </a>
                </div>

                <div class="w-2/3 flex items-center justify-left">
                    <div class="flex space-x-12 px-3 py-3 mx-4 md:flex-row md:mx-0 md:py-0">
                        <a href="/explore" class={exploreSelected ? "flex-none order-1 px-8 py-3 text-lg font-medium  text-white bg-yellow-500 rounded hover:text-white" :
                            "flex-none order-1 px-8 py-3 text-lg font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-yellow-500 hover:text-white md:mx-2"}
                            onClick={toggleExplore}>Explore</a>
                        <Link to="/orders" class={ordersSelected ? "flex-none order-1 px-8 py-3 text-lg font-medium text-white bg-yellow-500 rounded hover:text-white" :
                            "flex-none order-1 px-8 py-3 text-lg font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-yellow-500 hover:text-white md:mx-2"}
                            onClick={toggleOrders}>My Orders</Link>
                        <Link to="/chat" class={chatSelected ? "flex-none order-1 px-8 py-3 text-lg font-medium text-white bg-yellow-500 rounded hover:text-white" :
                            "flex-none order-1 px-8 py-3 text-lg font-medium text-gray-700 transition-colors duration-200 transform rounded dark:text-gray-200 hover:bg-yellow-500 hover:text-white md:mx-2"}
                            onClick={toggleChat}>Chats</Link>
                    </div>
                    </div>
                    <div class="flex items-center mt-4 md:mt-0"
                    onClick={toggleProfile}>
                    <button class="z-10 block p-2  rounded-md dark:bg-gray-800 focus:outline-none">
                        <div class="w-12 h-12 overflow-hidden border-none rounded-full">
                            <img src={buyer_photo} alt="buyer" />
                        </div>
                    </button>
                        

                    </div>
                </div>
                {showProfileDropdown()}
        </nav>

    )
}

export default BuyerHeader;
