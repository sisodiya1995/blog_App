import React from 'react';
import moment from 'moment';

function Comment(props) {
  let { id, author, body, createdAt } = props.comment;

  return (
    <>
      <section>
        <div className="comment-sections ">
          <h2 style={{height :"60px",paddingTop:"20px"}}>{body}</h2>
          <div className=" align-center people-comment comment-div justify-between flex">
            <div className='flex'>
              {' '}
              <div className='flex' >
                <img src={author.image} alt={author.username} className="comment-img " />
              </div>
              <div className="flex  align-center ">
                <p>{author.username}</p>
                <span> {moment(createdAt).format('ddd MMM D YYYY')}</span>
              </div>
            </div>

            {author.username === props.user.username ? (
              <button
                onClick={() => {
                  props.handelDelete(id);
                }}
              className="red">
                delete
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Comment;