import React from "react";
//import Header from "./header";
import {NavLink} from 'react-router-dom'
import {withRouter} from 'react-router-dom'
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
      },
    };
  }

  handlechange = ({ target }) => {
    let errors = this.state.errors;
    let { name, value } = target;
    this.setState({ errors, [name]: value });
    var letterNumber = "(?=.*[a-zA-Z])(?=.*[0-9])";
    switch (name) {
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

  handlesubmit =(event) => {
   event.preventDefault()
  //   fetch("https://mighty-oasis-08080.herokuapp.com/api/users/login", {
   
  //     // Adding method type
  //     method: "POST",
       
  //     // Adding body or contents to send
  //     body: JSON.stringify({
  //         user :{
           
  //           email : this.state.email ,
  //           password : this.state.password
  //         }
  //     }),
       
  //     // Adding headers to the request
  //     headers: {
  //         "Content-type": "application/json; charset=UTF-8",
  //         Authorzation : "Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"

  //     }
  // })
   
  // // Converting to JSON
  // .then(response => response.json())
   
  // // Displaying results to console
  // // .then(json => console.log(json));
  //  this.props.history.push('/')

  const { email, password } = this.state;
  fetch("https://mighty-oasis-08080.herokuapp.com/api/users/login", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: { email, password } }),
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then(({ errors }) => {
          return Promise.reject(errors);
        });
      }
      return res.json();
    })
    .then(({ user }) => {
      this.props.updateUser(user);
      this.setState({ email: '', password: '' });
      this.props.history.push('/');
    })
    .catch((errors) =>
      this.setState((prevState) => {
        return {
          ...prevState,
          error: {
            ...prevState.errors,
            email: 'Email or password is not correct',
          },
        };
      })
    );


  }
  render() {
    return (
      <>
        {/* <Header /> */}

        <h3>Sign IN</h3>
        
         <NavLink to ='/signup' style={{display : "flex",justifyContent :"center" ,color :"#5CB85C",textDecoration :"none",margin :"10px 0px",fontSize :"18px"}} exact>
         Need an account ?
         </NavLink>
        <form className="signup-form" onSubmit={this.handlesubmit}>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={this.state.email}
            onChange={this.handlechange}
          />
          <p className="error">{this.state.errors.email}</p>
          <br></br>
          <input
            type="password"
            placeholder="password"
            name="password"
            value={this.state.password}
            onChange={this.handlechange}
          />
          <p className="error">{this.state.errors.password}</p>
          <br></br>
          <div className="flex justify-end">
          <button type="submit" className="btn">Sign in</button>
          </div>
         
        </form>
      </>
    );
  }
}

export default withRouter(Login);
