import React from "react";
import Header from "./header";
import {Link} from 'react-router-dom'
import { withRouter } from 'react-router-dom';
class SingleArticle extends React.Component {
   constructor(props){
       super(props)
       this.state= ({
         article : ''
       })
   }

   componentDidMount() {
     let slug = this.props.match.params.slug
     console.log(slug ,"slug")
    fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles/${slug}`)
    .then((res) => res.json())
    .then((article) => this.setState({ article :article.article,
         
     }));
   }
render(){
    //console.log(this.state.article,"single article")

    if (!this.state.article) {
      return <h2>Loading ...</h2>;
    }
  return (
    <>
    {/* <Header/> */}
      
<p>{this.state.article.description}</p>
<div>
            {this.props.user === null ? (
              <footer>
                <div>
                  <p>
                    <Link to="/signup">Sign up</Link> or{' '}
                    <Link to="/signin"> Log in</Link>
                    or add to comments on this article
                  </p>
                </div>
              </footer>
            ) : (
              ""
            )}
          </div>
    </>
  );
}

  
   

}

export default withRouter(SingleArticle);
