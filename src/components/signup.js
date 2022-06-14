import React from "react";
// import Header from "./header";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      errors: {
        username: "",
        email: "",
        password: "",
      },
    };
  }

  handlesubmit = (event) => {
    const { username, email, password } = this.state;
    event.preventDefault();
    fetch("https://mighty-oasis-08080.herokuapp.com/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { username, email, password } }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
          // throw new Error('Fatch is not successful');
        }
        return res.json();
      })
      .then(({ user }) => {
        this.props.updateUser(user);
        this.setState({ username: "", email: "", password: "" });
        this.props.history.push("/");
      })
      .catch((errors) => this.setState({ errors }));
  };
  handlechange = ({ target }) => {
    let errors = this.state.errors;
    let { name, value } = target;
    this.setState({ errors, [name]: value });
    var letterNumber = "(?=.*[a-zA-Z])(?=.*[0-9])";
    switch (name) {
      case "username":
        errors.username =
          value.length > 6
            ? ""
            : "usernane should be at least 6 characters long";
        break;

      case "email":
        errors.email = value.includes("@") ? "" : "Email contain should @";
        break;

      case "password":
        errors.password =
          this.state.password.match(letterNumber) && value.length > 6
            ? ""
            : "Password sholuld contains letter and number and not less than 6";
        break;

      default:
        break;
    }
  };
  render() {
    return (
      <>
        <form className="signup-form" onSubmit={this.handlesubmit}>
          <h3>Sign Up</h3>
          <NavLink to="/signin" style={{display : "flex",justifyContent :"center" ,color :"#5CB85C",textDecoration :"none",margin :"10px 0px",fontSize :"18px"}} exact>
            Have an account ?
          </NavLink> 
          <br></br>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={this.handlechange}
          />{" "}
          <p className="error">{this.state.errors.username}</p>
          <br></br>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.handlechange}
          />
          <p className="error">{this.state.errors.email}</p>
          <br></br>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handlechange}
          />
          <p className="error">{this.state.errors.password}</p>
          <br></br>
          <div className="flex justify-end ">
          <button className="btn" type="submit">Sign up</button>
          </div>
          
        </form>
      </>
    );
  }
}

export default withRouter(Signup);
