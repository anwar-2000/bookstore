import { calculateTotal, DeleteFromCart } from '@/redux/reducers/Cart'
import { X } from 'lucide-react'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

interface Props {
    titre : string ,
    prix : number,
    image : string,
}

const CartItem:FC<Props> = ({titre , prix , image}) => {
    const dispatch = useDispatch();
    const deleteItemHandler = () =>{
       let book = {
        titre,
        prix,
        image
       }
       dispatch(DeleteFromCart(book))
       dispatch(calculateTotal())
    }
  return <Container>
        <div className='img'>
            <img src={image} alt={titre} />
        </div>
        <div className='infos'>
        <h2>{titre} || </h2>
        <h4>{prix} €</h4>
        </div>

        <div className='cancel'>
                <button onClick={deleteItemHandler}><X color='black'/></button>
        </div>
        
  </Container>
}

export default CartItem

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .img{
        img{
            width : 25px;
            height: 25px;
        }
        margin-right: 2rem;
    }
    .infos{
        display: flex;
        gap: 0.5rem;
    }
    .cancel{
        button {
            padding: 0.1rem 1.4rem;
            margin-left: 2rem;
            border-radius: 5px;
            background-color: #df3232;
            transition: all ease 400ms;
            &:hover{
                background-color: #e62929;
                padding: 0.2rem 1.7rem;
            }
        }
    }
`