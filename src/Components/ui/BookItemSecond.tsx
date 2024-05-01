import { Star , Heart } from 'lucide-react'
import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
interface Props extends React.HTMLAttributes<HTMLElement>{
    title : string 
    image : string
    rating : number
    prix : number
    high_price : number
}

const BookItemSecond:FC<Props> = ({title , image , rating, prix , high_price , ...rest}) => {
    const [favorite, setFavorite] = useState<boolean>(false);

    useEffect(() => {
        // Get the current favoriteList from localStorage
        const favoriteListString = localStorage.getItem('favoriteBooksList');
        const favoriteList = JSON.parse(favoriteListString as string) || [];
    
        // Check if the book is in the favoriteList
        const isFavorite = favoriteList.map((item: any) => item.title).includes(title);
    
        // Update the favorite state
        setFavorite(isFavorite);
    }, []);
    const favoriteclickHandler = () => {
        let book = {
            title,
            prix,
            image,
        };    

        const favoriteListString = localStorage.getItem('favoriteBooksList');

        const favoriteList = JSON.parse(favoriteListString as string) || [];
        // Checking if the book is already in the favoriteList
        const index = favoriteList.findIndex((item: any) => item.title === book.title);
    
        if (index !== -1) {
            // If the book is in the favoriteList, remove it
            favoriteList.splice(index, 1);
        } else {
            // If the book is not in the favoriteList, add it
            favoriteList.push(book);
        }
    
        // Updating localStorage with the new favoriteList
        const newFavoriteListString = JSON.stringify(favoriteList);
        localStorage.setItem('favoriteBooksList', newFavoriteListString);
    
        // Updating the favorite state to reflect whether the book is in the favoriteList or not
        setFavorite(index === -1);
    };
  return <Container {...rest}>
        <div className='image__rating'>
                <img src={image} alt={title} id="imgg" aria-details={title} title={title} />
        </div>
       <div className='heart' onClick={favoriteclickHandler}><Heart fill={favorite ? 'red' : 'none'} color='red' size={18} /></div> 
       <h2>{title}</h2>
       <h6 id='prix'>{high_price !== 0 && <span style={{textDecoration : 'line-through' , color : 'red' , marginRight : '5px'}}>{high_price}€</span>}{prix} € </h6>
       
  </Container>
}

export default BookItemSecond;

const Container = styled.div`
    cursor : pointer;
    width: 12rem;
    display: grid;
    place-items: center;
    border-radius: 5%;
    filter: drop-shadow(0 0 0.3rem grey);
     /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
        width : 8.5rem;
  }
    h2{
        text-align: center;
        transform: translateY(-0.9rem);
        width: 12rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        @media screen and (max-width: 767px) {
        width : 8.5rem;
  }
    }
    
    #imgg{
        border-radius: 5% ;
        width: 300px;
        height: 200px;
    }
    .heart{
        transform: translateY(3.2rem);
    }
    .rating{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.2rem;
        transform: translate(3rem,-3rem);
        background-color: white;
        padding: 0.1rem;
        border-radius: 5px;
        h6{
            font-weight: bold;
            color: black;
        }
    }

    #prix {
        transform: translateY(-1rem);
        font-size: 14px;
        color : green;
    }
`