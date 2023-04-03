import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import CartItem from './CartItem';
import { createPortal } from 'react-dom';
import { toggleCart } from '@/redux/reducers/Cart';



interface ItemShape {
  titre: string;
  prix: number;
  image: string;
}


const modalVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 }
};

const CartModal= () => {
  const [isMounted, setIsMounted] = useState(false);
  const showModal = useSelector((state: any) => state.show);
  const {total} = useSelector((state: any) => state.cart);
  const { cart } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch()

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : 'auto'; // to stop scrolling on the body
  }, [showModal]);

  if (!isMounted) return null;

  return createPortal(
    <>
    <Overlay onClick={()=>dispatch(toggleCart())} />
    <Container>
      <h1>MON PANIER</h1>
      {cart.map((item: ItemShape, i: number) => (
        <CartItem titre={item.titre} prix={item.prix} image={item.image} key={i} />
      ))}
      {cart.length === 0 && <h3> 0 Livres Dans le Panier </h3>}

      <div className='total_pay'>
        <h3>Total : {total} €</h3>
        <button>Acheter maintenant</button>
      </div>
    </Container>
    </>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default CartModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #eedddd;
  font-weight: lighter;
  justify-content: center;
  width: 40rem;
  height: auto;
  border-radius: 10px;
  border: solid 1px white;
  z-index: 99;
  padding: 1.5rem;

  h1 {
    font-size: 2.5rem;
    font-family: 'Courier New', Courier, monospace;
  }
  h3 {
    background-color: green;
    padding: 0.5rem 2rem;
    color: white;
    margin: 1.5rem;
    border-radius: 10px;
  }

  .total_pay{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 1rem;

      button{
        padding: 0.5rem 1rem;
        border: solid white 1.5px;
        border-radius: 17px;
        transition: all ease 400ms;
        background-color: white;
        color: black;
        font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
        &:hover {
          color: black;
         
          padding: 0.5rem 3rem;
        }
      }
  }
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
`


