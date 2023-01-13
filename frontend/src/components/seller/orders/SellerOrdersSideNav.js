import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

function SellerOrdersSideNav(props) {
  // constructor(props) {
  //     super(props);
  //     this.state = {
  //         showPending: true,
  //         showUpcoming: false,
  //         showCompleted: false
  //     }
  // }
  // render() {
  return (
    <div class="fixed flex flex-col w-64 h-screen px-8 mt-32 border-none dark:bg-gray-800 dark:border-none">
      <div class="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <Link to="/seller/order/pending/"
            class={
              props.showPending
                ? "flex items-center justify-start pl-9 w-full py-4 mt-5 text-gray-600 bg-yellow-400 bg-opacity-70 shadow-inner transition-colors duration-200 transform rounded-md dark:text-gray-400"
                : "flex items-center justify-start pl-9 w-full py-4 mt-5 text-gray-300 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-yellow-400 hover:bg-opacity-30 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
            }
            onClick={props.togglePending}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div class="mx-4 font-medium">Pending</div>
          </Link>

          <Link to="/seller/order/upcoming/"
            class={
              props.showUpcoming
                ? "flex items-center justify-start pl-9 w-full py-4 mt-5 text-gray-600 bg-yellow-400 bg-opacity-70 shadow-inner transition-colors duration-200 transform rounded-md dark:text-gray-400"
                : "flex items-center justify-start pl-9 w-full py-4 mt-5 text-gray-300 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-yellow-400 hover:bg-opacity-30 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
            }
            onClick={props.toggleUpcoming}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <div class="mx-4 font-medium">Upcoming</div>
          </Link>

          <Link to="/seller/order/completed/"
            class={
              props.showCompleted
                ? "flex items-center justify-start pl-9 w-full py-4 mt-5 text-gray-600 bg-yellow-400 bg-opacity-70 shadow-inner transition-colors duration-200 transform rounded-md dark:text-gray-400"
                : "flex items-center justify-start pl-9 w-full py-4 mt-5 text-gray-300 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-yellow-400 hover:bg-opacity-30 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700"
            }
            onClick={props.toggleCompleted}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div class="mx-4 font-medium">Completed</div>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default SellerOrdersSideNav;
