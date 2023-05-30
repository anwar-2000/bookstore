import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CartItem from "./CartItem";
import { createPortal } from "react-dom";
import { calculateTotal, toggleCart } from "@/redux/reducers/Cart";
import getStripe from "@/lib/getStripe";

interface ItemShape {
  _id : string,
  titre: string;
  prix: number;
  image: string;
  poids : number;
  quantite: number;
}



const CartModal = () => {
  //const [showForm, setShowForm] = useState(false);
  const {isChecked} = useSelector((state:any)=>state.cart)
  const [formData, setFormData] = useState({
    email: '',
    address: '',
    postalCode: ''
  });


  const [isMounted, setIsMounted] = useState(false);
  const showModal = useSelector((state: any) => state.show);
  const { total } = useSelector((state: any) => state.cart);
  const { cart } = useSelector((state: any) => state.cart);

  // to update the total if user changes the livreur
  const {livreurcolissimo} = useSelector((state:any)=>state.cart)
  const dispatch = useDispatch();



  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto"; // to stop scrolling on the body
    calculateTotal()
  }, [showModal,cart]);


  if (!isMounted) return null;

async function handlePaypalPayment(e:any) {
  e.preventDefault();
  const { email, address, postalCode } = formData;
  let PaypalData = {
    cart ,
    total,email,address,postalCode
  }
    const response = await fetch('/api/paypal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(PaypalData)
    });
  
    if (response.ok) {
      const data = await response.json();
      // Handle successful payment here
    } else {
      // Handle error here
    }
  }
  
  const handleStripe = async () => {
    
    let StripeData = {
      cart ,
      total,
      isChecked 
    }
    //console.log("MODAL",cart,total)

    const stripe = await getStripe();
    //console.log("FOR STRIPE : ",cart)
    const response = await fetch("/api/stripe", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      //total with weight calculated for delivery

      body: JSON.stringify(StripeData)
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
    /** TO DO : ADD REDIRECT STATE && message  */

    stripe?.redirectToCheckout({ sessionId: data.id });
  };


  
  /*const handleFormChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };*/


  return createPortal(
    <>
      <Overlay onClick={() => dispatch(toggleCart())} />
      <Container>
        <h1>MON PANIER</h1>
        <div className="items">
          {cart.map((item: ItemShape, i: number) => (
            <CartItem
              _id={item._id}
              titre={item.titre}
              prix={item.prix}
              image={item.image}
              key={i}
              quantite={item.quantite}
              poids={item.poids}            />
          ))}
        </div>

        {cart.length === 0 && <h4> 0 Livres Dans Votre Panier </h4>}

        <div className="total_pay">
          <h3>Total : {total} €</h3>
          <button onClick={handleStripe}>Payer</button>
          {//<button onClick={()=>setShowForm(!showForm)}><FaCcPaypal /></button>
          }
        </div>
         {/* PayPal Form */}
      { /*showForm && (
        <form onSubmit={handlePaypalPayment}>
          <input type="email" placeholder="Email" 
            onChange={handleFormChange}
 />
          <input type="text" placeholder="Address" 
            onChange={handleFormChange}
 />
          <input type="text" placeholder="Postal Code" 
            onChange={handleFormChange}
 />
          <button type="submit">Payer</button>
        </form>
      ) */}
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
