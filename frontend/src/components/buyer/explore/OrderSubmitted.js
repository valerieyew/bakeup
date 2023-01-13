import React from "react";
import { Link } from "react-router-dom";

function OrderSubmitted(props) {
  
  return (
    // <Router>
    //   <Switch>
    //     <Route path="products/submitted/">
          <div>
            <div class="max-w-md px-8 mt-72 mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800">
              <div class="animate-pulse flex justify-center -mt-16">
                <svg
                  className="w-28 h-28"
                  fill="none"
                  stroke="orange"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <p class="mt-4 text-2xl text-center font-semibold text-yellow-600 dark:text-white md:text-3xl">
                Order Submitted
              </p>

              <p class="mt-4 text-yellow-900 text-center dark:text-gray-200">
                You have successfully submitted your order.
              </p>
              <p class="mt-2 text-yellow-900 text-center dark:text-gray-200">
                {props.name +  " has been notified and will confirm your order shortly."}
              </p>
              <div class="flex justify-center">
                <Link 
                class="flex mx-10 mt-4 mb-4 text-gray-600 text-xl bg-yellow-400 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 hover:text-white rounded"
                to="/explore/"
                >Go back to explore page
                </Link>
              </div>
            </div>
          </div>
  );
};

export default OrderSubmitted;
