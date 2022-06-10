import React from "react";
//import App from "./app";
import {NavLink} from 'react-router-dom'
function Header(props){
    return (
        <>
        <strong>conduit</strong>
        {/* <NavLink to ="/">
           Home
        </NavLink>
        <NavLink to ="/signin">
           Sign in
        </NavLink>
        <NavLink to ="/signup">
           Sign up
        </NavLink> */}

        <div>
        {props.isLoggedIn ? (
              <AuthHeader user={props.user} />
            ) : (
              <NonAuthHeader />
            )}
        </div>
        </>
    )
}

function NonAuthHeader() {
   return (
     <ul className="flex">
       <NavLink
         style={{ textDecoration: 'none' }}
         activeclassname="active"
         to="/"
         exact
       >
         <li>Home</li>
       </NavLink>
 
       <NavLink
         style={{ textDecoration: 'none' }}
         activeclassname="active"
         to="/signup"
       >
         <li>Signup</li>
       </NavLink>
       <NavLink
         style={{ textDecoration: 'none' }}
         activeclassname="active"
         to="/signin"
       >
         <li>sign in</li>
       </NavLink>
     </ul>
   );
 }
 function AuthHeader(props) {
   let { username } = props.user;
   return (
     <ul className="flex">
       <NavLink
         style={{ textDecoration: 'none' }}
         activeclassname="active"
         to="/"
         exact
       >
         <li>Home</li>
       </NavLink>
 
       <NavLink
         style={{ textDecoration: 'none' }}
         activeclassname="active"
         to="/new-post"
       >
         <li>NewArticle</li>
       </NavLink>
       <NavLink
         style={{ textDecoration: 'none' }}
         activeclassname="active"
         to="/setting"
       >
         <li>
           <i className="fa-solid fa-gear"></i>Settings
         </li>
       </NavLink>
       <NavLink
         style={{ textDecoration: 'none' }}
         activeclassname="active"
         to={`/profile/${username}`}
       >
         <li>Profile</li>
       </NavLink>
     </ul>
   );
 }
export default Header;