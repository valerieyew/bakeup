import React, { Component, useState, useEffect } from "react";
import loggedInApi from "../../../api/loggedInApi";

function BuyerPendingOrderDetails(props) {
    // let { id } = useParams();
    const [state, setState] = useState({});
    const [buyerId, setBuyerId] = useState("");
    const [shopName, setShopName] = useState("");
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [image, setImage] = useState("");
    const [quantity, setQuantity] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    const [remarks, setRemarks] = useState("");
    const [prepared, setPrepared] = useState(false);
    const [dateCreated, setDateCreated] = useState("");
    const [collectionDate, setCollectionDate] = useState("");

    useEffect(() => {
        orderSetUp();
        return () => {
            setState({});
        };
    }, [])

    const orderSetUp = () => {
        new loggedInApi()
            .get("/orders/" + props.orderId)
            .then((res) => {
                const order = res.data;
                setBuyerId(order.buyerId);
                setShopName(order.shopName);
                setProductId(order.productId);
                setProductName(order.productName);
                setImage(process.env.PUBLIC_URL + "/images/" + order.imageURL);
                setQuantity(order.quantity);
                setTotalPrice(priceFormatter.format(order.totalPrice));
                setRemarks(order.remarks);
                setPrepared(order.prepared);
                setDateCreated(creationDateFormatter.format(Date.parse(order.dateTime)));
                setCollectionDate(collectionDateFormatter.format(Date.parse(order.collectionTime)));
                // console.log(order.dateTime)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    var creationDateFormatter = new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    var collectionDateFormatter = new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });


    var priceFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const acceptOrder = (e) => {
      
        new loggedInApi().put("/orders/" + props.orderId, {status: "Completed"}).then(
            res => {
                console.log(res.data)
            }
        ).catch(err => {console.log(err)})
       ; 

       props.closeDetails();
    }

    return (
        <div class="=flex fixed w-7/12 h-3/4 ml-80 mt-32 tracking-wider bg-black">
            <div class="grid grid-rows-5 grid-cols-4 gap-4 h-full p-6 shadow-lg border-2 border-gray-100 bg-white">
                <div class="row-span-2 col-span-4 px-10 grid grid-rows-4 grid-cols-4 items-center">
                    <div class="text-md row-span-1 col-span-1 font-bold text-gray-400">ORDER ID:</div>
                    <div class="text-xl ml-4 row-span-1 col-span-3 text-gray-700">1</div>
                    <div class="text-md row-span-1 col-span-1 font-bold text-gray-400">SHOP:</div>
                    <div class="text-xl ml-4 row-span-1 col-span-3 text-gray-700">{shopName}</div>
                    <div class="text-md row-span-1 col-span-1 font-bold text-gray-400">ORDER DATE:</div>
                    <div class="text-xl ml-4 row-span-1 col-span-3 text-gray-700">{dateCreated}</div>
                    <div class="text-md row-span-1 col-span-1 font-bold text-gray-400">COLLECTION DATE:</div>
                    <div class="text-xl ml-4 row-span-1 col-span-3 text-gray-700">{collectionDate}</div>
                </div>
                <div class="row-span-2 col-span-4 px-10 py-2 grid grid-cols-4 bg-yellow-500 bg-opacity-10 rounded-md ">
                    <div class="col-span-3">
                        <div class="text-md my-2 font-bold text-gray-400">ORDER</div>
                        <div class="grid grid-cols-6 justify-between text-gray-700">
                            <img
                                class="col-span-1 w-full object-cover object-center rounded "
                                src={image}
                            />
                            <div class="col-span-5 flex justify-between pt-4 pl-8 pr-10 text-xl">
                                <div>{productName}</div>
                                <div>x {quantity}</div>
                            </div>
                        </div>
                        <div class="row-span-1 col-span-4 mt-6 grid grid-rows-1 grid-cols-6 items-center">
                            <div class="text-md row-span-1 col-span-1 font-bold text-gray-400">REMARKS:</div>
                            <div class="text-xl row-span-1 col-span-5 pl-4 text-gray-700">{remarks}</div>
                        </div>

                    </div>
                    <div class="col-span-1">
                        <div class="text-md my-2 font-bold text-gray-400">PRICE</div>
                        <div class="text-xl pt-4">{totalPrice}</div>
                    </div>
                </div>

                <div class="row-span-1 col-span-4 pt-4">
                    <div class="flex md:px-16 justify-around">
                        <button 
                        class="row-span-1 w-48 py-4 text-gray-500 font-bold text-2xl bg-red-100 rounded-md hover:bg-red-300 hover:text-black">CANCEL</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuyerPendingOrderDetails;