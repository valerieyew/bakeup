import React, { Component } from "react";
import backendApi from "../../api/backendApi";
import logo_bakeup from '../../images/logo_bakeup.png';
import {Link} from "react-router-dom"

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    onFormSubmit = async (event) => {
        event.preventDefault();
        console.log("registering");

        await backendApi.post("/users", {
            username: this.state.username,
            password: this.state.password,
            alias: this.state.alias,
            authorities: "USER"
        }).then((res) => {
            console.log(res.data);
            this.props.history.push("/")
        }).catch(err => {console.log(err);})
    }
  
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
                <div class="mb-6">
                  <label class="font-semibold text-gray-600">Confirm password:</label>
                  <input
                    type="text"
                    name="password"
                    placeholder="Confirm password"
                  />
                </div>
                <div class="flex mb-2 justify-center">
                  <button
                    class="bg-yellow-600 text-white px-6 py-3 text-lg hover:text-white hover:bg-yellow-700 font-semibold rounded-md tracking-wider"
                    type="submit"
                    onClick={this.onFormSubmit}
                  >
                    Create account!
                  </button>
                </div>
                <div class="w-full text-center">
              <span class="text-sm">Already have an account? Log in </span>
              <Link to="/" class="text-sm font-bold text-yellow-500 underline hover:text-yellow-600 hover:underline">here</Link>
              </div>
              </form>
            </div>
          </div>
        </div>
    );
  }
}

export default SignUp;
