import React from 'react';
//import Loader from './Loader';
import Post from './post';

function Posts(props) {
  let { articles, error } = props;
  console.log(articles);
  if (!articles) {
    return <h2>loadinf ..</h2>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (articles.length < 1) {
    return <h2>No Articles Found</h2>;
  }

  return (
    <>
      {articles.map((article) => (
        <Post key={article.slug} {...article} />
      ))}
    </>
  );
}

export default Posts;