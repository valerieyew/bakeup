import React from "react";
import "./Login.css";
import backendApi from "../../api/backendApi.js";
import loggedInApi from "../../api/loggedInApi.js";
import logo_bakeup from '../../images/logo_bakeup.png';
import { Link } from "react-router-dom"
class Login extends React.Component {
  state = {
    username: "",
    password: "",
    seller: false,
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    console.log("making request");
    console.log(this.state.username);
    await backendApi
      .post("/authenticate", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        // console.log(res.data);
        sessionStorage.setItem("token", res.data.jwt);
        // console.log(sessionStorage.getItem("token"));
        if (this.state.seller) {
          new loggedInApi().get("/shopexist").then((res) => {
            // console.log(localStorage.getItem("token"));
            // console.log(res.data);
            if (res.data == true) {
              this.props.history.push("/seller/shop/");
            } else {
              this.props.history.push("/createshop/");
            }
          }).catch(err => console.log(err))

        } else {
          this.props.history.push("/explore/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onCheckSeller = () => {
    this.setState({
      seller: !this.state.seller,
    });
  };

  render() {
    return (
      <div className="Login">
        <div class="flex items-center justify-center p-24 ">
          <div className="bg-white w-2/5 p-8 rounded-2xl shadow-md">
            <div class="flex w-full justify-center">
            <div class="w-96 mb-8 overflow-hidden border-none items-center justify-center rounded-none">
              <img src={logo_bakeup} alt="logo" />
            </div>
            </div>
            <form className="ui form">
              <div className="mb-6">
                <label class="font-semibold text-gray-600">Username:</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={(e) => {
                    this.setState({ username: e.target.value });
                  }}
                />
              </div>
              <div class="mb-6">
                <label class="font-semibold text-gray-600">Password:</label>
                <input
                  type="text"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => {
                    this.setState({ password: e.target.value });
                  }}
                />
              </div>
              <div className="ui toggle orange checkbox mb-4">
                <input
                  type="checkbox"
                  name="seller"
                  onChange={(event) => {
                    this.onCheckSeller(event);
                  }}
                  checked={this.state.seller}
                />
                <label>Go to my shop!</label>
              </div>
              <div class="flex mb-2 justify-center">
                <button
                  class="bg-yellow-600 text-white px-6 py-3 text-lg hover:text-white hover:bg-yellow-700 font-semibold rounded-md tracking-wider"
                  type="submit"
                  onClick={this.onFormSubmit}
                >
                  Sign in
                </button>
              </div>
              <div class="w-full text-center">
              <span class="text-sm">Not a member yet? Sign up  </span>
              <Link to="/signup/" class="text-sm font-bold text-yellow-500 underline hover:text-yellow-600 hover:underline">here</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
