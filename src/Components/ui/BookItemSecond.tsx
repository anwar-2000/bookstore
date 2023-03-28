import { Star } from 'lucide-react'
import React, { FC } from 'react'
import styled from 'styled-components'

interface Props extends React.HTMLAttributes<HTMLElement>{
    title : string 
    image : string
    rating : number
}

const BookItemSecond:FC<Props> = ({title , image , rating,...rest}) => {
  return <Container {...rest}>
        <div className='image__rating'>
                <img src={image} alt={title} id="imgg" />
        </div>
        <div className='rating'> 
               <Star fill="blue" color='blue'  size={15} /><h6>{rating}</h6>
        </div>
        <h2>{title}</h2>
  </Container>
}

export default BookItemSecond;

const Container = styled.div`
    width: 10rem;
    display: grid;
    place-items: center;
    border-radius: 5%;
    h2{
        font-weight: bold;
        transform: translateY(-0.9rem);
    }
    
    #imgg{
        border-radius: 5% ;
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
        }
    }
`