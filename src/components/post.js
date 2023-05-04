import { Link } from "react-router-dom";
import React from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";

function Post(props) {
  const {
    author,
    createdAt,
    title,
    description,
    slug,
    favoritesCount,
    tagList,
  } = props;

  return (
    <>
      
      <article >
        <div className="parent-div flex justify-between align-center">
          <div className="flex align-center padding-top">
            <figure>
              <img src={author.image} alt="img" className="user-img" />
            </figure>
            <div>
              <NavLink
                to={`/profile/${author.username}`}
                style={{ textDecoration: "none" }}
              >
                <p className="arti-username">{author.username}</p>
              </NavLink>

              <p>{moment(createdAt).format("dd-MM-YYYY")}</p>
            </div>
          </div>
          <button className="fav-count">{favoritesCount}</button>
        </div>
        <p className="arti-title">{title}</p>
        <p className="arti-des">{description}</p>
        <div className="article-tag flex justify-between">
          <NavLink
            to={`/article/${slug}`}
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
            {tagList.map((p) => {
              return <button className="tag">{p}</button>;
            })}
          </div>
        </div>
      </article>
    </>
  );
}

export default Post;
