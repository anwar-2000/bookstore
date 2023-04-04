import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import styled from "styled-components"

interface Props {}

const Hero = () => {
  return<>
   <Container>
          <Left>
              <h1>Souhaitez-vous des recommandations de livres spécifiques ?</h1>
              <small> Si vous n'êtes pas sûr de ce que vous recherchez, nous vous suggérons d'explorer notre sélection de catégories et de listes de livres pour trouver des options qui pourraient vous intéresser.</small>
             <Link href={'/all'} ><button>Découvrir</button></Link> 
          </Left>
          <Right>
                <img src="/book1.jpeg" alt='book1'  id="book1" />
                <img src="/book2.jpg" alt='book2'  id="book2"  />

                <small>+2000 Livres</small>
          </Right>
  </Container>

  </>
}

export default Hero

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  margin-top: 2.5rem;
  margin-bottom: 7.5rem;
  

  


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
align-items: start;
justify-content: center;
gap: 1.25rem;
flex: 2;

h1{
font-size: 2.9rem;
font-weight: 400;
margin-left: 2.8rem;
}

small {
  margin-left: 3rem;
  font-size: 1.5rem;
  font-family: 'Playfair Display SC', serif;
} 


button {
padding: 0.3rem 1rem;
border: solid 1px black;
border-radius: 5px;
font-family: 'Raleway', sans-serif;
z-index: 11 ;
width: 9rem;
margin-left: 3rem;
background-color: black;
transition: all ease-in-out 400ms;
font-weight: bold;
color : white;
 &:hover {
  background-color: white;
  color : black;
}
}
/* styles for screens smaller than 768px */
@media screen and (max-width: 767px) {
align-items: center;
justify-content: center;
& h1 {
  font-size: 1.5rem;
  text-align: center;
  margin-left: 0.5rem;
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
  z-index: 11;
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
    color: yellow;
    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    border-radius: 50%;
    padding: 0.5rem 0.5rem;
    transform: rotate(10deg) translate(-10rem,3rem);
    transition: all ease-in 400ms;
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
-moz-box-shadow: 0px 0px 31px 12px rgba(239,255,8,0.75);

}
/* styles for screens smaller than 768px */
@media screen and (max-width: 767px) {
  & small {
    transform: rotate(25deg) translate(2.4rem,-1.5rem);
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
    transform: translateX(-14rem);
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