import React from "react";
import Articles from "./articles";
class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      articles: "",
      isDisplay: false,
      tagname : ""
    };
  }

  handleclick = (event) => {
    let tags = event.target.innerText;

    const tagsURL = `https://mighty-oasis-08080.herokuapp.com/api/articles/?tag=${tags}`;
    fetch(tagsURL)
      .then((res) => res.json())
      .then((data) => this.setState({ articles: data.articles , isDisplay : true 
      , tagname : tags}));
  };
  componentDidMount() {
    const tagsURL = "https://mighty-oasis-08080.herokuapp.com/api/tags";
    fetch(tagsURL)
      .then((res) => res.json())
      .then((tags) => this.setState({ tags: tags.tags }));
  }

  handleGlobal =() => {
    // this.setState((prev)  =>{
    //  return {
    //    isDisplay : ! prev.isDisplay
    //  }
    // })
    this.setState({
      isDisplay : false
    })
  }
  render() {
    return (
      <>
      <button onClick={this.handleGlobal}>global</button>
        <Articles info={this.state} />
        
        {/* {
  !this.props.info? this.setState({articles : this.state.articles}) :this.setState({articles : this.props.info})
} */}

        {this.state.tags.map((tag) => {
          return (
            <button
              onClick={(event) => {
                this.handleclick(event);
              }}
            >
              {tag}
            </button>
          );
        })}
      </>
    );
  }
}

export default Tags;
