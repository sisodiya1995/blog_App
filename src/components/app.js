import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./header";
//import Hero from './hero';
//import Articles from './articles';
import Tags from "./tags";
import Signup from "./signup";
import Login from "./login";
import SingleArticle from "./singleArticle";
import NewPost from "./newpost";
import Profile from "./profile";
import Setting from "./setting";
//import Tags from './tags';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false, user: null, isVerifying: true };
  }
  componentDidMount() {
    let storageKey = localStorage["app_user"];
    if (storageKey) {
      fetch("https://mighty-oasis-08080.herokuapp.com/api/user", {
        Method: "GET",
        headers: {
          authorization: `Token ${storageKey}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then(({ user }) => this.updateUser(user))
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({ isVerifying: false });
    }
  }
  updateUser = (user) => {
    this.setState({
      isLoggedIn: true,
      user,
      isVerifying: false,
    });
    localStorage.setItem("app_user", user.token);
  };
  render() {
    return (
      <>
        {/* <Switch>
          <Route path="/" exact>
            <Tags />
          </Route>
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/articles/:slug" component={SingleArticle}></Route>
        </Switch> */}

        <Header isLoggedIn={this.state.isLoggedIn} user={this.state.user} />
        {this.state.isLoggedIn ? (
          <AuthenticatedApp
            user={this.state.user}
            updateUser={this.updateUser}
          />
        ) : (
          <UnauthenticatedApp
            updateUser={this.updateUser}
            user={this.state.user}
          />
        )}
      </>
    );
  }
}

function AuthenticatedApp(props) {
  return (
    <Switch>
      <Route exact path="/">
        <Tags user={props.user} />
      </Route>
      <Route exact path="/new-post">
        <NewPost user={props.user} />
      </Route>
      <Route exact path="/setting">
        <Setting user={props.user} updateUser={props.updateUser} />
      </Route>
      <Route exact path="/profile/:username">
        <Profile user={props.user} />
      </Route>
      <Route path="/article/:slug">
        <SingleArticle user={props.user} />
      </Route>
      <Route path="/editArticle/:slug">
        {/* <EditArticle user={props.user} /> */}
      </Route>
      <Route path="*">{/* <NoMatch /> */}</Route>
    </Switch>
  );
}

function UnauthenticatedApp(props) {
  return (
    <Switch>
      <Route exact path="/">
        <Tags />
      </Route>
      <Route path="/signin">
        <Login updateUser={props.updateUser} />
      </Route>
      <Route path="/signup">
        <Signup updateUser={props.updateUser} />
      </Route>

      <Route path="/article/:slug">
        <SingleArticle user={props.user} />
      </Route>
      <Route path="*">{/* <NoMatch /> */}</Route>
    </Switch>
  );
}

export default App;
