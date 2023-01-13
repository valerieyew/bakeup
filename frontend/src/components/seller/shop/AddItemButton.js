import React, { Component, useState, useEffect } from 'react';
import CreateItem from './CreateItem';
import CreateItemTest from './CreateItemTest';


function AddItemButton(props) {
    const [openCreateItem, setOpenCreateItem] = useState(false);

    const toggleCreateItem = () => {
        setOpenCreateItem(true);
    }
    const toggleCreateItemClose = () => {
        setOpenCreateItem(false);
    }

    const whatToDisplay = () => {
        if (openCreateItem) {
            return (
                <div class="bg-gray-700 bg-opacity-40 justify-between flex flex-wrap  fixed overflow-x-hidden overflow-y-auto inset-0 outline-none focus:outline-none">
                    <button class="w-1/12 h-screen"
                        onClick={toggleCreateItemClose}>
                    {/* <svg className="w-10 h-10" fill="none" stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> */}
                    </button>
                    <CreateItemTest closeFormMethod={toggleCreateItemClose} reloadItems={props.reload}/>
                    <button class="w-1/12 h-screen"
                        onClick={toggleCreateItemClose}>
                    {/* <svg className="w-10 h-10" fill="none" stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> */}
                    </button>

                </div>
            )
        }
    };


    return (
        <>
            <button class="flex-none w-96 my-10 mx-10 rounded-xl items-center text-yellow-500 hover:text-yellow-400 border-yellow-500 hover:border-yellow-400"
                onClick={toggleCreateItem}>
                <div class="text-9xl font-semibold pb-2">+</div>
                <div class="text-3xl font-bold">Add Item</div>
            </button>
            {whatToDisplay()}
        </>
    )

}
// }

export default AddItemButton;