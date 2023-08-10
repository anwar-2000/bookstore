import { AddToCart, calculateTotal, DeleteFromCart } from '@/redux/reducers/Cart'
import { Minus, Plus } from 'lucide-react'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

interface Props {
    _id : string,
    titre : string ,
    prix : number,
    image : string,
    poids  : number,
    quantite : number
}



const CartItem:FC<Props> = ({ _id ,titre , prix , poids ,image, quantite}) => {

    const { total } = useSelector((state: any) => state.cart);
    const { isChecked } = useSelector((state: any) => state.cart);


    const dispatch = useDispatch();
    const deleteItemHandler = () =>{
      
    let book = {
        _id ,
        titre ,
        prix ,
        image ,
        poids ,
        quantite ,
        isChecked,
        total
       }
       dispatch(DeleteFromCart(book))
       dispatch(calculateTotal())
    }

    let book = {
        _id,
        titre,
        prix,
        image,
        poids
       }
    const addItemHandler = () =>{
        //console.log(book)
        dispatch(AddToCart(book));
        dispatch(calculateTotal());
     }
  return <Container>
        <div className='img'>
        <img src={image} alt={titre} />
        </div>
        <div className='infos'>
        <h2>{titre} - </h2>
        <h4>{prix} € - </h4>
        <h4>Q° : {quantite}</h4>
        </div>

        <div className='cancel'>
                <button onClick={deleteItemHandler}><Minus color='red'/></button>
                <button onClick={addItemHandler}><Plus color='green'/></button>
        </div>
        
  </Container>
}

export default CartItem

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color : #080808;
    .img{
        img{
            width : 40px;
            height: 40px;
        }
        margin-right: 2rem;
    }
    .infos{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        gap: 0.5rem;
        border-bottom: solid 1px gray;
    }
    .cancel{
        button {
           
            margin-left: 2rem;
            border-radius: 5px;
            transition: all ease 400ms;
            &:hover{
                background-color: white;
                padding: 0.2rem 0.4rem;
            }
        }
    }

    @media only screen and (max-width: 768px) {
        .img{
        img{
            width : 20px;
            height: 20px;
        }
        margin-right: 2rem;
    }
    .infos{
        font-size: 9px;
        h2{
            width : 30px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
    .cancel{
        button {
           
            margin-left: 2rem;
            border-radius: 5px;
            transition: all ease 400ms;
            &:hover{
                background-color: white;
                padding: 0.2rem 0.4rem;
            }
        }
    }
   }
`