import { Star , Heart } from 'lucide-react'
import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {AddToFavorite} from "@/redux/reducers/Cart";
interface Props extends React.HTMLAttributes<HTMLElement>{
    title : string 
    image : string
    rating : number
    prix : number
}

const BookItemSecond:FC<Props> = ({title , image , rating, prix , ...rest}) => {
    const dispatch = useDispatch();
    const {favoriteList} = useSelector((state:any)=>state.cart);
    const isFavorite = favoriteList.map((item: any) => item.title).includes(title);
    const [favorite, setFavorite] = useState<boolean>(isFavorite);
    
   const favoriteclickHandler = () => {
    let book = {
        title , 
        prix ,
        image , 
    }
    dispatch(AddToFavorite(book));
     setFavorite(true)
    }
  return <Container {...rest}>
        <div className='image__rating'>
                <img src={image} alt={title} id="imgg" />
        </div>
        <div className='rating'> 
               <Star fill="yellow" color='black'  size={15} /><h6>{rating}</h6>
        </div>
       <div className='heart' onClick={favoriteclickHandler}><Heart fill={favorite ? 'red' : 'none'} color='red' size={15} /></div> 
       <h2>{title}</h2>
       <h6 id='prix'> Prix : {prix} €</h6>
       
  </Container>
}

export default BookItemSecond;

const Container = styled.div`
    width: 10rem;
    display: grid;
    place-items: center;
    border-radius: 5%;
    h2{
        text-align: center;
        transform: translateY(-0.9rem);
        width: 8rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        
    }
    
    #imgg{
        border-radius: 5% ;
        width: 300px;
        height: 200px;
    }
    .heart{
        transform: translateY(-1rem);
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
        font-size: 12px;
    }
`