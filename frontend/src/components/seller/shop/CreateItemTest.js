import React, { Component } from "react";
import loggedInApi from "../../../api/loggedInApi";

class CreateItemTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: "",
      productType: "",
      productDescription: "",
      variations: [""],
      dateListed: new Date(),
      price: "",
      diertaryRestrictions: [],
      ingredients: "",
      images: null,
      dietaryList: [
        "Vegan",
        "Lactose-free",
        "Eggs-free",
        "Nuts-free",
        "Halal",
        "Vegetarian",
      ],
    };
  }

  handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = {
      product_name: this.state.productName,
      product_type: this.state.productType,
      product_description: this.state.productDescription,
      variations: this.state.variations,
      price: this.state.price,
      date_listed: this.state.dateListed.getDate(),
      dietary_restrictions: this.state.diertaryRestrictions,
      ingredients: this.state.ingredients,
    };

    await new loggedInApi()
      .post("/products", data)
      .then((res) => {
        if (this.state.images !== null) {
          const product = res.data;
          const productId = product.product_id;
          const formData = new FormData();
          formData.append("image", this.state.images);
        this.uploadImage(productId, formData);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    //   this.props.reloadItems();
    this.props.closeFormMethod();
    this.sleep(5000);
    window.location.reload(false);
  };

  uploadImage = async (productId, formData) => {
    
    new loggedInApi()
    .post("/products/save/" + productId, formData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("image upload error");
      console.log(err);
    });
  };

sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  addVariation = (event) => {
    event.preventDefault();
    console.log("adding variation");
    this.setState({ variations: [...this.state.variations, ""] });
  };

  handleChange = (e, index) => {
    const arr = this.state.variations;
    arr[index] = e.target.value;
    this.setState({ variations: arr });
  };

  handleRemove = (index) => {
    this.state.variations.splice(index, 1);
    this.setState({
      variations: this.state.variations,
    });
  };

  showOption() {
    if (this.state.variations.length === 0) {
      return (
        <button onClick={this.addVariation} class="ui orange basic button">
          Add variation
        </button>
      );
    }
  }

  dietOnChecked = (event, diet) => {
    if (event.target.checked) {
      this.setState({
        diertaryRestrictions: [...this.state.diertaryRestrictions, diet],
      });
    } else {
      const arr = this.state.diertaryRestrictions.filter((e) => e !== diet);
      this.setState({ diertaryRestrictions: arr });
    }
  };

  onUploadImage = async (event) => {
    await this.setState({ images: event.target.files[0] });
  };

  render() {
    return (
      // <div class="justify-center items-center flex flex-wrap fixed overflow-x-hidden overflow-y-auto inset-0 outline-none focus:outline-none">
      <div class="m-8 p-8 w-3/4 bg-white my-6 rounded-xl text-left">
        <div class="text-center">
          <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
            Add a New Product
          </h1>
          <p class="text-gray-400 dark:text-gray-400">
            Fill up the following details of your product.
          </p>
        </div>
        <div class="m-7">
          <form>
            <div class="mb-6">
              <label class="block mb-2 text-sm text-gray-600">
                Product Name
              </label>
              <input
                type="text"
                name="product name"
                class="w-1/2 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:ring-2 focus:outline-none focus:ring-yellow-500 focus:border-transparent"
                placeholder="Awesome Birthday Cake"
                onChange={(e) => {
                  this.setState({ productName: e.target.value });
                }}
              />
            </div>
            <div class="mb-6">
              <label class="block mb-2 text-sm text-gray-600">
                Product Type
              </label>
              <input
                type="text"
                name="product type"
                class="w-1/2 px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:ring-2 focus:outline-none focus:ring-yellow-500 focus:border-transparent"
                placeholder="Cake"
                onChange={(e) => {
                  this.setState({
                    productType: e.target.value.toLowerCase(),
                  });
                }}
              />
            </div>
            <div class="mb-6">
              <label class="block mb-2 text-sm text-gray-600">
                Product Description
              </label>
              <textarea
                type="text"
                name="description"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:ring-2 focus:outline-none focus:ring-yellow-500 focus:border-transparent"
                placeholder="Brief description of product"
                onChange={(e) => {
                  this.setState({ productDescription: e.target.value });
                }}
              />
            </div>
            <div class="mb-6">
              <label class="block mb-2 text-sm text-gray-600">
                Product Variations
              </label>
              {this.showOption()}
              <div>
                {this.state.variations.map((variation, index) => {
                  return (
                    <div key={index}>
                      <div>
                        <input
                          class="mb-1 w-1/3 px-3 py-2 mr-1 placeholder-gray-300 border border-gray-300 rounded-md focus:ring-2 focus:outline-none focus:ring-yellow-500 focus:border-transparent"
                          placeholder="Chocolate flavour"
                          onChange={(e) => {
                            this.handleChange(e, index);
                          }}
                          value={variation}
                        />
                        <button
                          onClick={this.addVariation}
                          class={index == this.state.variations.length-1 ? "ui icon button" : "hidden"}
                        >
                          <i class="plus icon orange"></i>
                        </button>
                        <button
                          class={index == this.state.variations.length-1 ? "ui icon button" : "hidden"}
                          onClick={() => this.handleRemove(index)}
                        >
                          <i class="trash icon orange"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* <div class="mb-6">
                                <label class="block mb-2 text-sm text-gray-600">Date listed</label>
                                <div class="ui calender">
                                    <div class="ui input left icon">
                                        <i class="calendar icon"></i>
                                        <input
                                            type="date"
                                            class="w-1/4 px-3 py-2 mr-1 placeholder-gray-300 border border-gray-300 rounded-md focus:ring-2 focus:outline-none focus:ring-yellow-500 focus:border-transparent"
                                            placeholder="Date/Time"
                                            onChange={(e) => {
                                                this.setState({
                                                    dateListed: e.target.valueAsDate,
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div> */}
            <div class="mb-6">
              <label class="block mb-2 text-sm text-gray-600">Price</label>
              <div class="ui right labeled input">
                <label class="ui label">$</label>
                <input
                  type="text"
                  placeholder="Amount"
                  id="amount"
                  onChange={(e) => {
                    this.setState({ price: e.target.value });
                  }}
                />
                <div class="ui basic label">/ set</div>
              </div>
            </div>
            <div class="mb-8">
              <label class="block mb-2 text-sm text-gray-600">
                Product's Diet Categories
              </label>
              {this.state.dietaryList.map((dietType) => {
                return (
                  <div
                    class="ui checkbox"
                    style={{ width: "200px" }}
                    key={dietType}
                  >
                    <input
                      type="checkbox"
                      id={dietType}
                      onChange={(event) => {
                        this.dietOnChecked(event, dietType);
                      }}
                    />
                    <label class="text-sm text-gray-800">{dietType}</label>
                  </div>
                );
              })}
            </div>
            <div class="mb-6">
              <label class="block mb-2 text-sm text-gray-600">
                Ingredients
              </label>
              <textarea
                type="text"
                name="ingredients"
                class="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:ring-2 focus:outline-none focus:ring-yellow-500 focus:border-transparent"
                placeholder="Ingredients used to make product"
                onChange={(e) => {
                  this.setState({ ingredients: e.target.value });
                }}
              />
            </div>
            <div class="mb-6">
              <label class="block mb-2 text-sm text-gray-600">
                Product Picture
              </label>
              {/* refer to https://www.youtube.com/watch?v=zSt5G3s3OJI&t=623s for handling the state */}
              <input
                type="file"
                name="productImage"
                accept=".jpg, .jpeg, .png, .gif"
                onChange={this.onUploadImage}
              />
            </div>
            <button
              class="w-1/6 px-3 py-3 text-white font-bold bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none"
              onClick={(e) => this.handleFormSubmit(e)}
            >
              Submit
            </button>
          </form>
        </div>
        {/* </div> */}
        {/* </div> */}
      </div>
    );
  }
}

export default CreateItemTest;
