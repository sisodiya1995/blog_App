import React from "react";
// import Header from "./header";
import {NavLink} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
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

  handlesubmit =(event) => {
     // event.preventDefault()
    //   fetch("https://mighty-oasis-08080.herokuapp.com/api/users", {
     
    //     // Adding method type
    //     method: "POST",
         
    //     // Adding body or contents to send
    //     body: JSON.stringify({
    //         user :{
    //           username : this.state.username,
    //           email : this.state.email ,
    //           password : this.state.password
    //         }
    //     }),
         
    //     // Adding headers to the request
    //     headers: {
    //         "Content-type": "application/json; charset=UTF-8"
    //     }
    // })
     
    // // Converting to JSON
    // .then(response => response.json())
     
    // // Displaying results to console
    // .then(json => console.log(json));
    const { username, email, password } = this.state;
    event.preventDefault();
    fetch('https://mighty-oasis-08080.herokuapp.com/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
        this.setState({ username: '', email: '', password: '' });
        this.props.history.push('/');
      })
      .catch((errors) => this.setState({ errors }));


  }
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
            : "Password sholuld contains letter and number and not less than 6"  
        break;

      default:
        break;
    }
  };
  render() {
    return (
      <>
        {/* <Header /> */}
        <h3>Sign Up</h3>
          <NavLink to='/signin' exact>
          Have an account ?
          </NavLink>
        <form onSubmit={this.handlesubmit}>
          <input
            type="text"
            placeholder="username"
            name="username"
            value={this.state.username}
            onChange={this.handlechange}
          />{" "}
          <p>{this.state.errors.username}</p>
          <br></br>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={this.state.email}
            onChange={this.handlechange}
          />
          <p>{this.state.errors.email}</p>
          <br></br>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={this.state.password}
            onChange={this.handlechange}
          />
          <p>{this.state.errors.password}</p>
          <br></br>
          <button type="submit">Sign Up</button>
        </form>
      </>
    );
  }
}

export default withRouter(Signup);
