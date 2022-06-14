import React from "react";
import Articles from "./articles";
import Hero from "./hero";
class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      articles: "",
      isDisplay: false,
      tagname: "",
    };
  }

  handleclick = (event) => {
    let tags = event.target.innerText;

    const tagsURL = `https://mighty-oasis-08080.herokuapp.com/api/articles/?tag=${tags}`;
    fetch(tagsURL)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          articles: data.articles,
          isDisplay: true,
          tagname: tags,
        })
      );
  };
  componentDidMount() {
    const tagsURL = "https://mighty-oasis-08080.herokuapp.com/api/tags";
    fetch(tagsURL)
      .then((res) => res.json())
      .then((tags) => this.setState({ tags: tags.tags }));
  }

  handleGlobal = () => {
    // this.setState((prev)  =>{
    //  return {
    //    isDisplay : ! prev.isDisplay
    //  }
    // })
    this.setState({
      isDisplay: false,
    });
  };
  render() {
    return (
      <>
        <Hero />
        
        <div className="home-articles">
        <div className="articles flex-70">
          {" "}
          <button onClick={this.handleGlobal} className= "globla-btn">Global Feed</button>
          {/* <button onClick={this.handleGlobal} className= "globla-btn"> {this.state.tagname}</button> */}
          <Articles info={this.state} />
        </div>

        <div className="tags-side-bar flex-25">
        <h4 className="tags-title">Popular Tags</h4>
          {this.state.tags.map((tag) => {
            return (
              <>
              
              <button
                onClick={(event) => {
                  this.handleclick(event);
                }}
              className ="tags-btn">
                {tag}
              </button>
              </>
            );
          })}
        </div>
        </div>
       
      </>
    );
  }
}

export default Tags;
