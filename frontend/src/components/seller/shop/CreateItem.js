import React, { Component } from "react";
import loggedInApi from "../../../api/loggedInApi";

class CreateItem extends Component {
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
      date_listed: this.state.dateListed.getDate(),
      dietary_restrictions: this.state.diertaryRestrictions,
      ingredients: this.state.ingredients,
      image_url: "this is still a URL",
    }

    await new loggedInApi().post("/products", data
    ).then(
      res => {
        console.log(res.data);
      }
    ).catch(err => {
      console.log(err);
    })
  };

  addVariation = (event) => {
    event.preventDefault();
    console.log("adding variation");
    this.setState({ variations: [...this.state.variations, ""] });
  };

  handleChange = (e, index) => {
    const arr = this.state.variations
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
        <button onClick={this.addVariation} className="ui orange basic button">
          Add variation
        </button>
      );
    }
  }

  dietOnChecked = (event, diet) => {
    if (event.target.checked) {
      this.setState({
        diertaryRestrictions: [
          ...this.state.diertaryRestrictions,
          diet,
        ]
      });
    } else {
      const arr = this.state.diertaryRestrictions.filter(
        (e) => e !== diet
      );
      this.setState({ diertaryRestrictions: arr });
    }
  };

  onUploadImage = async (event) => {
    await this.setState(
      { images: event.target.files[0] }
    )
  }

  render() {
    return (
      <div class="flex fixed w-full p-5 bg-black bg-opacity-20 h-auto mt-18 top-18 left-0 items-center justify-center">
        <div class="flex w-3/4">
          <div className="container bg-white p-3 rounded-xl">
            <h2>come make your product</h2>
            <form className="ui form overflow-y-auto">
              <div className="field">
                <label>Product name</label>
                <input
                  type="text"
                  name="username"
                  onChange={(e) => {
                    this.setState({ productName: e.target.value });
                  }}
                />
              </div>
              <div className="field">
                <label>Product type</label>
                <input
                  type="text"
                  name="product type"
                  onChange={(e) => {
                    this.setState({
                      productType: e.target.value.toLowerCase(),
                    });
                  }}
                />
              </div>
              <div className="field">
                <label>Product description</label>
                <textarea
                  type="text"
                  name="description"
                  placeholder="Brief description of product"
                  onChange={(e) => {
                    this.setState({ productDescription: e.target.value });
                  }}
                />
              </div>
              <div className="field" style={{ width: "200px" }}>
                <label>Product variations</label>
                {this.showOption()}
                <div>
                  {this.state.variations.map((variation, index) => {
                    return (
                      <div key={index}>
                        <div className="ui input">
                          <input
                            onChange={(e) => {
                              this.handleChange(e, index);
                            }}
                            value={variation}
                          />
                          <button
                            onClick={this.addVariation}
                            className="ui icon button"
                          >
                            <i className="plus icon orange"></i>
                          </button>
                          <button
                            className="ui icon button"
                            onClick={() => this.handleRemove(index)}
                          >
                            <i className="trash icon orange"></i>
                          </button>
                        </div>
                        <span></span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="field" style={{ width: "200px" }}>
                <label>Date listed</label>
                <div className="ui calender">
                  <div className="ui input left icon">
                    <i className="calendar icon"></i>
                    <input
                      type="date"
                      placeholder="Date/Time"
                      onChange={(e) => {
                        this.setState({
                          dateListed: e.target.valueAsDate,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="field" style={{ width: "200px" }}>
                <label>Price</label>
                <div className="ui right labeled input">
                  <label className="ui label">$</label>
                  <input
                    type="text"
                    placeholder="Amount"
                    id="amount"
                    onChange={(e) => {
                      this.setState({ price: e.target.value });
                    }}
                  />
                  <div className="ui basic label">/set</div>
                </div>
              </div>
              <div className="field">
                <label>Product's diet categories</label>
                {this.state.dietaryList.map((dietType) => {
                  return (
                    <div
                      className="ui checkbox"
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
                      <label>{dietType}</label>
                    </div>
                  );
                })}
              </div>
              <div className="field">
                <label>Product ingredients</label>
                <textarea
                  type="text"
                  name="ingredients"
                  placeholder="Ingredients used to make product"
                  onChange={(e) => {
                    this.setState({ ingredients: e.target.value });
                  }}
                />
              </div>
              <div className="field">
                <label>Product Picture</label>
                {/* refer to https://www.youtube.com/watch?v=zSt5G3s3OJI&t=623s for handling the state */}
                <input
                  type="file"
                  name="productImage"
                  accept=".jpg, .jpeg, .png, .gif"
                  onChange={this.onUploadImage}
                />
              </div>
              <button
                className="ui orange button"
                onClick={(e) => this.handleFormSubmit(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateItem;
