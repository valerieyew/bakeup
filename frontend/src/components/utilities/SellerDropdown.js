import React from "react";
import ToggleSwitch from "./ToggleSwitch";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const SellerDropdown = ({ profileClicked, toggleProfile }) => {
  return (
    // <div className="flex justify-end px-10">
    <div
      className={
        profileClicked
          ? "absolute top-24 right-24 w-52 py-2 mt-2 bg-white rounded-2xl border-none dark:bg-gray-800"
          : "hidden"
      }
      onClick={toggleProfile}
    >
      <a
        href="#"
        className="block px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        role="menuitem"
      >
        My Profile
      </a>

      <a
        href="/"
        onClick={(e) => {
          window.location.reload(false);
        }}
        className="block w-full text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
        role="menuitem"
      >
        Sign out
      </a>

      <div className="flex px-2 pt-8 mb-2 justify-center">
        <Link
          to="/explore"
          class="text-gray-600 text-s bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 hover:text-white rounded"
        >
          Buyer Mode
        </Link>

        {/* <ToggleSwitch /> */}
      </div>
    </div>
    // </div>
  );
};

export default SellerDropdown;
