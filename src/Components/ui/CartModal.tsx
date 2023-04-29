import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CartItem from "./CartItem";
import { createPortal } from "react-dom";
import { toggleCart } from "@/redux/reducers/Cart";
import getStripe from "@/lib/getStripe";
import Stripe from "stripe";

interface ItemShape {
  titre: string;
  prix: number;
  image: string;
  quantite: number;
}

const modalVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
};

const CartModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const showModal = useSelector((state: any) => state.show);
  const { total } = useSelector((state: any) => state.cart);
  const { cart } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto"; // to stop scrolling on the body
  }, [showModal]);

  if (!isMounted) return null;

  const handleStripe = async () => {
    const stripe = await getStripe();
    //console.log("FOR STRIPE : ",cart)
    const response = await fetch("/api/stripe", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart)
    });
    if (!response.ok) {
      const error = await response.text();
      console.error(error);
      return;
    }
    // if error just exit function
    if ((response as any).statusCode === 500) {
      console.error((response as any).message);
      return;
    }

    const data = await response.json();
    /** TO DO : ADD RESIRECT STATE && message  */

    stripe?.redirectToCheckout({ sessionId: data.id });
  };

  return createPortal(
    <>
      <Overlay onClick={() => dispatch(toggleCart())} />
      <Container>
        <h1>MON PANIER</h1>
        <div className="items">
          {cart.map((item: ItemShape, i: number) => (
            <CartItem
              titre={item.titre}
              prix={item.prix}
              image={item.image}
              key={i}
              quantite={item.quantite}
            />
          ))}
        </div>

        {cart.length === 0 && <h4> 0 Livres Dans Votre Panier </h4>}

        <div className="total_pay">
          <h3>Total : {total} €</h3>
          <button onClick={handleStripe}>Acheter maintenant</button>
        </div>
      </Container>
    </>,
    document.getElementById("modal-root") as HTMLElement
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
  color: #292424;
  font-weight: lighter;
  justify-content: center;
  width: 40rem;
  height: auto;
  border-radius: 10px;
  border: solid 1px white;
  z-index: 99;
  padding: 1.5rem;
  background-color: #f3f3f3;

  .items {
    gap: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
  h1 {
    font-size: 2.5rem;
    color: gray;
    font-family: "Courier New", Courier, monospace;
  }
  h3 {
    padding: 0.5rem 2rem;
    color: #413d3d;
    margin: 1.5rem;
    border-radius: 10px;
    font-family: "Raleway" !important;
  }

  .total_pay {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;

    button {
      padding: 0.5rem 1rem;
      border-radius: 17px;
      transition: all ease 400ms;
      background-color: #0cc779;
      color: white;
      font-family: "Oswald", sans-serif;
      &:hover {
        padding: 0.5rem 3rem;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    width: 80%;
    height: 40%;
    padding: 1rem;
    font-size: 0.8rem;

    h1 {
      font-size: 2rem;
    }

    h3 {
      padding: 0.5rem 1rem;
      margin: 1rem;
    }

    .total_pay button {
      padding: 0.5rem;
      font-size: 0.8rem;
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
`;
