import { motion } from 'framer-motion';
import Link from 'next/link';
import  {useState , useEffect} from 'react'
import styled from 'styled-components'
import NavBar from './NavBar'

interface Props {}

const EmmausHero = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const ImagesInfos = {
        images : [
          '/boutique.jpg',
          '/photo1.jpg',
          '/photo2.jpg',
        ],
      }
      useEffect(() => {
        const interval = setInterval(() => {
          setActiveIndex((prevIndex) => (prevIndex + 1) % ImagesInfos.images.length);
        }, 3000);
        return () => clearInterval(interval);
  }, []);

  return <Container>
    <ImagesContainer>
    <motion.img
                initial={{ opacity: 0 , background : "black"}}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, yoyo: Infinity }}
              id='images'
              alt="Emmaus Naintré"
              src={ImagesInfos.images[activeIndex]}
              width={540}
              height={600}
            />
    </ImagesContainer>
    <Text>
        <h1>Bienvenue chez</h1>
        <h1>Emmaüs Châtellerault</h1>
        <small> votre destination pour des découvertes uniques !</small>
        <Link href="/all"><button>Explorer la boutique</button></Link>
    </Text>
  </Container>
}

export default EmmausHero

const Container = styled.div`
    width : 100vw;
    height : 100vh;
    display : flex;
    position : relative;
    flex-direction:column;
    align-items : flex-start;
    justify-content : flex-start;
    
`
const ImagesContainer = styled.div`
    position : absolute;
    width : 100%;
    height : 100%;
    z-index : -1;
    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6); /* Couleur de fond du backdrop avec transparence */
    }
    img {
        width : 100%;
        height : 100%;
        
    }
`

const Text = styled.div`
   display : flex;
   align-items : center;
   justify-content:center;
   flex-direction : column;
   gap : 2rem;
   align-self : center;
   margin-top : 4rem;
   z-index:3;

   h1{
     font-size : 4rem;
     color : white;
     font-weight:bolder;
   }
   small{
    font-size : 1.5rem;
    font-family: "Libre Baskerville", serif;
    font-weight: 400;
    font-style: italic;
    color:white;
   }
   button{
    background : #ecebeb;
    color : black;
    padding : 0.6rem 4rem;
    border-radius : 10px;
    font-weight : bold;
    font-style: italic;
   }
   @media screen and (max-width: 767px) {
    h1{
      font-size : 2.3rem;
    }
    small{
      font-size : 0.9rem;
    }
    button{
      padding : 0.4rem 2rem;
      margin-top : 4rem;
    }
  }
`