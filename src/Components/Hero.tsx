import Image from 'next/image'
import React from 'react'
import styled from "styled-components"

interface Props {}

const Hero = () => {

 const BgColors = styled.div`
    width: 100vw;
    height: 6rem;
 `
  const Container = styled.div`
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      flex-direction: row;
      margin-top: 2.5rem;
      


      /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    flex-direction: column;
  }
  `
   const Left = styled.div`
   width: 50%;
   display: flex;
   flex-direction: column;
   gap: 1.25rem;
   flex: 2;

   h1{
    font-size: 4.5rem;
    font-weight: 400;
    margin-left: 1.5rem;
   }
   
  small {
      margin-left: 3rem;
      font-size: 1.5rem;
  } 
  
  
   button {
    padding: 0.3rem 1rem;
    border: solid 1px black;
    border-radius: 5px;
    width: 9rem;
    margin-left: 3rem;
    transition: all ease-in-out 400ms;
    font-weight: bold;
   }
   button:hover {
      background-color: black;
      color : white;
      
   }

   /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
    align-items: center;
    justify-content: center;
    & h1 {
      font-size: 1.4rem;
    }

    & small {
      font-size: 1rem;
      width: 100%;
      text-align: center;
      margin-left: 0;
    }

    & button {
      margin-left: 0rem;
    }
  }

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    & h1 {
      font-size: 3rem;
      text-align: center;
    }

    & small {
      font-size: 1.5rem;
      font-weight: 400;
      width: 100%;
      text-align: center;
      margin-left: 0;
    }

    & button {
      margin-left: 7.8rem;
    }
  }

`
   const Right = styled.div`
      width: 50%;
      display: flex;
      gap: 3rem;
      align-items: center;
      justify-content: end;

      small {
        background-color: yellow;
        color: black;
        font-size: 1rem;
        border-radius: 10px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        padding: 0.5rem 0.5rem;
        transform: translateX(7rem);
        transition: all ease-in 400ms;
      }
      small:hover{
          transform: translateX(0);
      }

   #book1{
    width: 25% !important;
    transform: translateY(3rem) rotate(10deg);
    background-color: #615d5d;
    box-shadow: 0px 0px 31px 12px rgba(102,87,87,0.75);
-webkit-box-shadow: 0px 0px 31px 12px rgba(102,87,87,0.75);
-moz-box-shadow: 0px 0px 31px 12px rgba(102,87,87,0.75);
   }
   #book2{
    width: 25% !important;
    background: yellow;
    background-size: cover;
    transform: translateY(10rem) rotate(10deg);
    box-shadow: 0px 0px 31px 12px rgba(239,255,8,0.75);
-webkit-box-shadow: 0px 0px 31px 12px rgba(239,255,8,0.75);
-moz-box-shadow: 0px 0px 31px 12px


rgba(239,255,8,0.75);
   }
    /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
      & small:hover {
        transform: translateX(7rem);
      }
      
      & #book1 , & #book2 {
        width: 50% !important;
      }

      & #book1 {
        transform: translateY(3.5rem) rotate(-25deg) translateX(9rem);
      }

      & #book2 {
        transform: translateY(2.5rem) rotate(25deg) translateX(9rem);
      }
  }

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    & small:hover {
        transform: translateX(7rem);
      }
      
      & #book1 , & #book2 {
        width: 50% !important;
      }

      & #book1 {
        transform: translateY(3.5rem) rotate(-25deg) translateX(9rem);
      }

      & #book2 {
        transform: translateY(2.5rem) rotate(25deg) translateX(9rem);
      }

    }
  
`
  return<>
   <Container>
          <Left>
              <h1>Quelles Livres Vous Cherchez ?</h1>
              <small>Vous êtes pas sûre ! Okay <br /> Explorez nos categories et liste des livres .</small>
              <button>Explorer maintenant !!</button>
          </Left>
          <Right>
                <img src="/book1.jpeg" alt='book1'  id="book1" />
                <img src="/book2.jpg" alt='book2'  id="book2"  />

                <small> + 22 000 Livres vous attends </small>
          </Right>
  </Container>
   <BgColors></BgColors>

  </>
}

export default Hero