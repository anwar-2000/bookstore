import { addCommentlikes} from '@/lib/helpers';
import { ThumbsUp } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

interface Comment {
    _id :string;
    username: string;
    likes: number;
    createdAt: Date;
    comment: string;
  }
  
  interface Props {
    comment: Comment;
    onLike: () => void;
  }
  
  
const Comments: React.FC<Props> = ({ comment, onLike }) => {
    const { _id, username, likes, createdAt, comment: commentText } = comment;
    const [liked, setLiked] = useState(false);
  
    // Check if the comment is already liked when the component mounts
    useEffect(() => {
      const isCommentLiked = localStorage.getItem(_id);
      setLiked(!!isCommentLiked);
    }, []);
  
    const dateString = createdAt;
    const formattedDate = new Date(dateString);
  
    const day = formattedDate.getDate().toString().padStart(2, '0');
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    const year = formattedDate.getFullYear().toString().slice(-4);
  
    const date = `${day}-${month}-${year}`;
  
    const addLikes = async (commentId: string) => {
        const isCommentLiked = localStorage.getItem(commentId);
        
        if (!!isCommentLiked) {
          // Comment is already liked, so remove the like
          localStorage.removeItem(commentId);
          // Perform the API request to decrement the likes count
          await addCommentlikes(commentId,"del");
          // Update the UI or perform any other actions as needed
          onLike();
        } else {
          // Comment is not liked, so add the like
          localStorage.setItem(commentId, 'liked');
          // Perform the API request to increment the likes count
          await addCommentlikes(commentId,"add");
          // Update the UI or perform any other actions as needed
          onLike();
        }
      };
  
    return (
      <Container>
        <Heads>
          <h3>{username}</h3>
          <em>
            <small>Le: {date}</small>
          </em>
        </Heads>
        <Comment>
          <div className='likes'>
            {/* add click logic to add likes */}
            <ThumbsUp
              size={15}
              color={liked ? 'blue' : 'gray'}
              id='icon'
              onClick={() => {
                addLikes(_id);
              }}
            />
            <small>{likes}</small>
          </div>
          <p>{commentText}</p>
        </Comment>
      </Container>
    );
  };
  
  export default Comments;

const Container= styled.div`
    width : 40%;
    display : flex; 
    flex-direction : row;
    align-items : center;
    justify-content : start;
    flex-wrap : wrap;
    gap : 2rem;
    position : relative;
    background-color: #f3f707;
    padding: 10px;
    border-radius: 5px;
    padding : 1.2rem;
    box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.75);
-webkit-box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 0px 2px rgba(0,0,0,0.75);

/* styles for screens smaller than 768px */
@media screen and (max-width: 767px) {
    
  }

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
   
  }

  @media screen and (min-width: 912px) and (max-width: 1024px) {
    transform : translateY(-7rem);
  }

`
const Heads = styled.div`
    display flex ; 
    align-items : center;
    justify-content : center;
    position : absolute;
    top:0rem;
    left : 0.5rem;
    gap : 0.7rem;
    h3{
        font-size : 15px;
    }

        /* styles for screens smaller than 768px */
@media screen and (max-width: 767px) {
    gap : 0.4rem;
   &  small{
        font-size : 0.6rem;
    }
}
`
const Comment = styled.div`
    margin-top : 0.5rem;
    display flex ;
    flex-direction : column;
    align-items : center;
    gap : 1.5rem;
    
    /* styles for screens smaller than 768px */
@media screen and (max-width: 767px) {
    margin-top : 1.5rem;
    height:3rem;
}

    .likes{
        position:absolute;
        right : 1.5rem;
        top : 0.5rem;
        display : flex;
        gap : 0.3rem;
        #icon{
     cursor:pointer;
    }

        /* styles for screens smaller than 768px */
@media screen and (max-width: 767px) {
    top : 80%;
    right:1rem;
}
    }
`