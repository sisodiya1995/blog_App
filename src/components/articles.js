import React from "react";
// import Header from "./header";
import Hero from "./hero";
//import Tags from "./tags";
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
        {/* <Header /> */}
        <Hero />
        
        {this.props.info.isDisplay === false ? <div>
          
        {this.state.blogs.map((article) => {
          return (
            <>
              <img src={article.author.image} alt="img" />
              <p>{article.author.username}</p>
              <p>{article.title}</p>
              <p>{article.description}</p>
              <NavLink to={`/article/${article.slug}`}>More ...</NavLink>
            </>
          );
        })}
        </div> :<div>tag data
        <button>#{this.props.info.tagname}</button>
        {this.props.info.articles.map((article) => {
          return (
            <>
              <img src={article.author.image} alt="img" />
              <p>{article.author.username}</p>
              <p>{article.title}</p>
              <p>{article.description}</p>
              <NavLink to={`/article/${article.slug}`}>More ...</NavLink>
            </>
          );
        })}
          </div>}
       
       

        {buttoncount.map((btn) => {
          return (
            <button
              onClick={(event) => {
                this.handlenext(event);
              }}
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
