import React from "react";
//import Header from "./header";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import AddComment from "./addcomment";
import { NavLink } from "react-router-dom";
import moment from "moment";
class SingleArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: "",
    };
  }

  componentDidMount() {
    let slug = this.props.match.params.slug;
    console.log(slug, "slug");
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}`)
      .then((res) => res.json())
      .then((article) => this.setState({ article: article.article }));
  }

  handelDelete = (slug) => {
    fetch("https://mighty-oasis-08080.herokuapp.com/api/articles" + '/' + slug, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject('Unable to delete!');
        }
      })
      .then((data) => {
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ error });
      });
  };
  render() {
    //console.log(this.state.article,"single article")
    let slug = this.props.match.params.slug;
    if (!this.state.article) {
      return <h2>Loading ...</h2>;
    }
    return (
      <>
        {/* <Header/> */}
        <div style={{backgroundColor :"black"}}>
          <div className="single-arti">
            <h3 className="single-article-title">{this.state.article.title}</h3>
            <div className="flex align-center padding-top">
              <figure>
                <img
                  src={this.state.article.author.image}
                  alt="img"
                  className="user-img"
                />
              </figure>
              <div>
                <NavLink
                  to={`/profile/${this.state.article.author.username}`}
                  style={{ textDecoration: "none" }}
                >
                  <p className="arti-username white">
                    {this.state.article.author.username}
                  </p>
                </NavLink>

                <p style={{ color: "gray" }}>
                  {moment(this.state.article.createdAt).format("dd-MM-YYYY")}
                </p>
              </div>

              <div>
              {this.props.user &&
              this.props.user.username === this.state.article.author.username ? (
                <div className="edit-delete-btns">
                  <button className=" button-2 edit-btn">
                    <Link
                      style={{
                        textDecoration: 'none',
                        color: 'rgb(190, 190, 190)',
                      }}
                      // to={`/editArticle/${this.props.match.params.slug}`}
                    >
                      Edit Article
                    </Link>
                  </button>
                  <button
                    className="button-2 delete-btn"
                    onClick={() => this.handelDelete(slug)}
                  >
                    Detele Article
                  </button>
                </div>
              ) : (
                ''
              )}
              </div>

            </div>
          </div>
        </div>

        <div style={{width :"40%" ,margin:"0 auto"}}>
          <p style={{ padding: "20px 0px" }}>
            {this.state.article.description}
          </p>
          <div>
            {this.state.article.tagList.map((p) => {
              return <button className="tag">{p}</button>;
            })}
          </div>
        </div>
        <div>
          {this.props.user === null ? (
            <footer>
              <div>
                <p>
                  <Link to="/signup">Sign up</Link> or{" "}
                  <Link to="/signin"> Log in</Link>
                  or add to comments on this article
                </p>
              </div>
            </footer>
          ) : (
            <AddComment
              slug={this.props.match.params.slug}
              user={this.props.user}
            />
          )}
        </div>
      </>
    );
  }
}

export default withRouter(SingleArticle);
