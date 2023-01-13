import React, { Component } from "react";
import loggedInApi from "../../../api/loggedInApi";
import "./CreateShop.css";
class CreateShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shopName: "",
      description: "",
      verified: false,
      location: "",
      profileImage: null,
    };
    this.onUploadImage = this.onUploadImage.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  handleCheck = (e) => {
    this.setState({
      verified: e.target.checked,
    });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    console.log("making post req to make shop");
    const data = {
      shop_name: this.state.shopName,
      description: this.state.description,
      verified: this.state.verified,
      location: this.state.location,
      profile_pic_filename: "this is a photo",
    };

    await new loggedInApi()
      .post("/shop", data)
      .then((res) => {
        console.log(res.data);
        this.props.history.push("/seller/shop");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onUploadImage = async (event) => {
    await this.setState({ profileImage: event.target.files[0] });
  };

  render() {
    return (
      <div className="Create">
        <div className="ui container" style={{ marginTop: "10px" }}>
          <div className="ui segment">
            <div class="text-center">
              <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
                Start your own baking shop today!
              </h1>
              <p class="text-gray-400 dark:text-gray-400">
                Fill up the following details of your shop.
              </p>
            </div>
            <form className="ui form">
              <div className="field">
                <label>Shop name</label>
                <input
                  type="text"
                  name="shopname"
                  placeholder="My baking house"
                  onChange={(e) => {
                    this.setState({ shopName: e.target.value });
                  }}
                />
              </div>
              <div className="field">
                <label>Description</label>
                <textarea
                  type="text"
                  name="description"
                  placeholder="Brief description of your shop"
                  onChange={(e) => {
                    this.setState({ description: e.target.value });
                  }}
                />
              </div>
              <div className="field">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Pick up location for your tasty goods"
                  onChange={(e) => {
                    this.setState({ location: e.target.value });
                  }}
                />
              </div>
              <div className="inline field">
                <div className="ui checkbox">
                  <input
                    type="checkbox"
                    name="verified"
                    checked={this.state.verified}
                    onChange={this.handleCheck}
                  />
                  <label>
                    My home bakery has been verified by the health agency
                  </label>
                </div>
              </div>
              {/* <button onClick={this.checkImage}>show photo</button> */}
              <div className="mt-4">
                <button
                  className="ui orange button"
                  type="submit"
                  onClick={this.onFormSubmit}
                >
                  Create shop
                </button>
              </div>
            </form>
            <div>{this.verified}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateShop;
