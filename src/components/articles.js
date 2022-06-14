import React from "react";
// import Header from "./header";
import Hero from "./hero";
//import Tags from "./tags";
import moment from 'moment'
import { NavLink } from "react-router-dom";
class Articles extends React.Component {
  constructor() {
    super();
    this.state = {
      blogs: [],
      blogcount: "",
    };
  }
  componentDidMount() {
    const articlesURL =
      "https://mighty-oasis-08080.herokuapp.com/api/articles?limit=10";
    fetch(articlesURL)
      .then((res) => res.json())
      .then((articles) =>
        this.setState({
          blogs: articles.articles,
          blogcount: Math.round(articles.articlesCount / 10),
        })
      );
  }
  handlenext = (event) => {
    let val = event.target.innerText;
    //let info = this.props.info;

    const articlesURL = `https://mighty-oasis-08080.herokuapp.com/api/articles?limit=10&&offset=${
      val * 10
    }`;
    fetch(articlesURL)
      .then((res) => res.json())
      .then((articles) =>
        this.setState({
          blogs: articles.articles,
          blogcount: Math.round(articles.articlesCount / 10),
        })
      );
  };
  render() {
    let buttoncount = [];
    for (let i = 1; i <= this.state.blogcount; i++) {
      buttoncount.push(i);
    }
    console.log(buttoncount);
    console.log(this.props.info, "ingo");
    return (
      <>
        {/* <Hero /> */}
        {this.props.info.isDisplay === false ? (
          <div>
            {this.state.blogs.map((article) => {
              return (
                <>
                  <article>
                    <div className="parent-div flex justify-between align-center">
                      <div className="flex align-center padding-top">
                        <figure>
                          <img
                            src={article.author.image}
                            alt="img"
                            className="user-img"
                          />
                        </figure>
                        <div>
                          <NavLink
                            to={`/profile/${article.author.username}`}
                            style={{ textDecoration: "none" }}
                          >
                            <p className="arti-username">
                              {article.author.username}
                            </p>
                          </NavLink>

                          <p>{moment(article.createdAt).format('dd-MM-YYYY')}</p>
                        </div>
                      </div>
                      <button className="fav-count">{article.favoritesCount}</button>
                    </div>
                    <p className="arti-title">{article.title}</p>
                    <p className="arti-des">{article.description}</p>
                    <div className="article-tag flex justify-between">
                      <NavLink
                        to={`/article/${article.slug}`}
                        style={{
                          color: "gray",
                          textDecoration: "none",
                          marginBottom: "20px",
                          display: "inline-block",
                        }}
                      >
                        Read More ...
                      </NavLink>
                      <div>
                        {article.tagList.map((p) => {
                          return <button className="tag">{p}</button>;
                        })}
                      </div>
                    </div>
                  </article>
                </>
              );
            })}
          </div>
        ) : (
          <div className="tag-article">
            <button className= "globla-btn taginfo"># {this.props.info.tagname}</button>
            {this.props.info.articles.map((article) => {
              return (
                <>
                  {/* <img src={article.author.image} alt="img" />
                  <p>{article.author.username}</p>
                  <p className="title">{article.title}</p>
                  <p>{article.description}</p>
                  <NavLink to={`/article/${article.slug}`}>More ...</NavLink> */}

                  <article>
                    <div className="flex align-center padding-top">
                      <figure>
                        <img
                          src={article.author.image}
                          alt="img"
                          className="user-img"
                        />
                      </figure>
                      <div>
                        <NavLink
                          to={`/profile/${article.author.username}`}
                          style={{ textDecoration: "none" }}
                        >
                          <p className="arti-username">
                            {article.author.username}
                          </p>
                        </NavLink>

                        <p>{article.createdAt}</p>
                      </div>
                    </div>

                    <p className="arti-title">{article.title}</p>
                    <p className="arti-des">{article.description}</p>
                    <NavLink
                      to={`/article/${article.slug}`}
                      style={{
                        color: "gray",
                        textDecoration: "none",
                        marginBottom: "20px",
                        display: "inline-block",
                      }}
                    >
                      Read More ...
                    </NavLink>
                  </article>
                </>
              );
            })}
          </div>
        )}

        {buttoncount.map((btn) => {
          return (
            <button
              onClick={(event) => {
                this.handlenext(event);
              }}
              className="tag-btn"
            >
              {btn}
            </button>
          );
        })}
        {/* <Tags/> */}
      </>
    );
  }
}

export default Articles;
