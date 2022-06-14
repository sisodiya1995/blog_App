import React from "react";
//import App from "./app";
import { NavLink } from "react-router-dom";
function Header(props) {
  return (
    <>
      <header className="header flex justify-around">
        <strong className="title">conduit</strong>
        <nav>
          {props.isLoggedIn ? (
            <AuthHeader user={props.user} />
          ) : (
            <NonAuthHeader />
          )}
        </nav>
      </header>
    </>
  );
}

function NonAuthHeader() {
  return (
    <ul className="flex">
      <NavLink activeclassname="active" to="/" style={{textDecoration :"none" ,marginLeft :"10px",color:"#C6C7C6",fontSize:"17px"}} exact>
        <li>Home</li>
      </NavLink>

      <NavLink activeclassname="active" to="/signup" style={{textDecoration :"none",marginLeft :"10px",color:"#C6C7C6",fontSize:"17px"}}>
        <li>Signup</li>
      </NavLink>
      <NavLink activeclassname="active" to="/signin" style={{textDecoration :"none",marginLeft :"10px" ,color:"#C6C7C6",fontSize:"17px"}}> 
        <li>sign in</li>
      </NavLink>
    </ul>
  );
}
function AuthHeader(props) {
  let { username } = props.user;
  return (
    <ul className="flex">
      <NavLink activeclassname="active" to="/" style={{textDecoration :"none" ,marginLeft :"10px",color:"#C6C7C6",fontSize:"17px"}} exact>
        <li>Home</li>
      </NavLink>

      <NavLink activeclassname="active" to="/new-post" style={{textDecoration :"none" ,marginLeft :"10px",color:"#C6C7C6",fontSize:"17px"}}>
        <li>NewArticle</li>
      </NavLink>
      <NavLink activeclassname="active" to="/setting" style={{textDecoration :"none" ,marginLeft :"10px",color:"#C6C7C6",fontSize:"17px"}}>
        <li>
          <i className="fa-solid fa-gear"></i>Settings
        </li>
      </NavLink>
      <NavLink activeclassname="active" to={`/profile/${username}`} style={{textDecoration :"none" ,marginLeft :"10px",color:"#C6C7C6",fontSize:"17px"}}>
        <li>Profile</li>
      </NavLink>
    </ul>
  );
}
export default Header;
