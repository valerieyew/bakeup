import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function() {
  const [switchValue, setSwitchValue] = useState(false);

    return (
        <Router>
        <div className="flex h-0 pt-8 pb-6 items-center justify-center border-t-2">
            <div className="max-w-xs mx-auto">
                
                <Link to="/explore">
                <Switch.Group as="div" className="flex text-sm text-gray-700 items-center space-x-4">
                    <Switch.Label>Buyer</Switch.Label>
                    <Switch
                        as="button"
                        checked={switchValue}
                        onChange={setSwitchValue}
                        className={`${
                            switchValue ? "bg-yellow-500" : "bg-yellow-200"
                        } relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline`}
                    >
                    {({ checked }) => (
                        <span
                            className={`${
                                checked ? "translate-x-5" : "translate-x-0"
                            } inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full`}
                        />
                    )}
                </Switch>
                <Switch.Label>Seller</Switch.Label>
            </Switch.Group>
            </Link>
            
        </div>
    </div>
    </Router>
  );
}