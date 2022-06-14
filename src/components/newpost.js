import React from 'react';
//import { articleURL } from '../utils/constant';
import {withRouter} from 'react-router-dom'
class NewPost extends React.Component {
  state = {
    title: '',
    description: '',
    body: '',
    tagList: '',
    errors: {
      title: '',
      description: '',
      body: '',
      tagList: '',
    },
  };

  handleChange = (event) => {
    let { name, value } = event.target;
    let errors = { ...this.state.error };
    this.setState({ [name]: value, errors });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, body, tagList } = this.state;
    fetch('https://mighty-oasis-08080.herokuapp.com/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${this.props.user.token}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList: tagList.split(',').map((tag) => tag.trim()),
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Can not create new Article');
        }
        return res.json();
      })
      .then(({ article }) => {
        console.log(article);
        this.setState({
          title: '',
          description: '',
          body: '',
          tagList: '',
        });
        this.props.history.push('/');
      })
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    let { title, description, body, tagList } = this.state;
    return (
      <>
        <div>
          <form action="" className="signup-form-1">
            <h4>Add Your Article</h4>
            <input className='bottom'
              type="text"
              name="title"
              placeholder="Article Title"
              onChange={this.handleChange}
              value={title}
              
            />

            <input
              type="text"
              name="description"
              placeholder="what's  this article is all about "
              onChange={this.handleChange}
              value={description}
            />

            <textarea
              type="text"
              name="body"
              rows="6"
              placeholder="write your article"
              onChange={this.handleChange}
              value={body}
            />

            <input
              type="text"
              name="tagList"
              placeholder="Enter Tags"
              onChange={this.handleChange}
              value={tagList}
            />
            <div className="flex justify-end width">
              <button
                className="btn"
                type="submit"
                onClick={this.handleSubmit}
              >
                Publish Article
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withRouter(NewPost);