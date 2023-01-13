// import React from 'react';
// import Counter from '../utilities/Counter';

// const ItemDetails = () => {
import React, { Component } from 'react'
import Counter from '../utilities/Counter';
import loggedInApi from '../../api/loggedInApi';


class SellerItemDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: props.key,
            name: "",
            type: "",
            shop: "",
            price: "",
            description: "",
            dates: "",
            location: "",
            variations: [],
            shop: "",
            image: "",
            date: "",
            ingredients: "",
            restrictions: [],
            count: 0,
            totalPrice: 0,
            chosenVariation: "",
            submitted: false
        }
    }

    componentDidMount() {
        console.log("mounting SellerProductDetails")
        const str = "/products/" + this.state.key
        new loggedInApi().get(str).then(
            res => {
                const product = res.data;
                this.setState({
                    name: product.product_name,
                    type: product.product_type,
                    shop: product.shop_name,
                    price: product.price,
                    description: product.product_description,
                    image: process.env.PUBLIC_URL + "/images/" + product.image_url,
                    variations: product.variations,
                    date: product.date_listed,
                    restrictions: product.dietary_restrictions,
                    ingredients: product.ingredients,
                    chosenVariation: product.variations[0],
                });
                if (this.state.variations == null) {
                    this.setState({
                        variations: ["No option"],
                    });
                }
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'SGD'
    });

    render() {
        return (

            <section class="text-gray-600 body-font overflow-hidden">
                <div class="container px-5 py-24 mx-auto">
                    <div class="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="product_image" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={this.state.image} />
                        <div class="relative lg:w-1/2 w-full lg:py-6 mt-6 lg:mt-0">
                            <h2 class="text-sm ml-10 title-font text-gray-500 tracking-widest">{this.state.shop_name}</h2>
                            <h1 class="text-gray-900 ml-10 text-3xl title-font font-medium mb-1">{this.state.name}</h1>
                            <div class="flex mb-4">
                            </div>
                            <p class="ml-10">{this.state.description}</p>
                            <p class="mt-8 ml-10 font-semibold text-yellow-600">{this.state.ingredients} </p>
                            <div class="flex absolute w-full bottom-8 justify-between">
                                <span class="title-font mx-10 font-medium text-2xl text-gray-600-">{this.state.price}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        )
    }
}

export default SellerItemDetails;