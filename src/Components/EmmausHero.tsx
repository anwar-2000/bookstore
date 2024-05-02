import { motion } from 'framer-motion';
import Link from 'next/link';
import  {useState , useEffect} from 'react'
import styled from 'styled-components'

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
        <motion.h1
         initial ={{opacity : 0}}
      whileInView={{opacity : 1}}
      transition={{delay : 0.8 , duration : 0.4}}>Emmaüs Châtellerault</motion.h1>
        <motion.small 
        initial ={{opacity : 0}}
      whileInView={{opacity : 1}}
      transition={{delay : 1 , duration : 0.4}}>Notre boutique en ligne vous permet de dénicher des objets farfelus, rares, ou plus courants mais tout aussi intéressants, comme si vous étiez dans l'un des rayons d'un de nos 4 lieux de vente.

Vous y trouverez des livres anciens mais aussi des plus récents, des objets vintage mais pas que, des vêtements pour toutes et tous, des chaussures, de la maroquinerie, mais aussi de quoi intéresser les plus jeunes avec des jeux et livres jeunesse.</motion.small>
        <Link href="/all"><motion.button
         initial ={{opacity : 0 , y : -10 , background : "none"}}
      whileInView={{opacity : 1 , y :0 , background : "white" }}
      transition={{delay : 1.2 , duration : 0.8}}
      >Explorer la boutique</motion.button></Link>
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
    &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.6),
            rgba(0, 0, 0, 0.8)
        );
    }
    
`
const ImagesContainer = styled.div`
    position : absolute;
    width : 100%;
    height : 100%;
    z-index : -1;
   
    img {
        width : 100%;
        height : 100%;   
    }
`

const Text = styled(motion.div)`
   display : flex;
   align-items : center;
   justify-content:center;
   flex-direction : column;
   gap : 2rem;
   align-self : center;
   margin-top : 4rem;
   z-index:3;

   h1{
     font-size : 7rem;
     color : white;
     font-weight:bolder;
   }
   small{
    font-size : 1.2rem;
    font-family: "Libre Baskerville", serif;
    font-weight: 400;
    width : 50%;
    font-style: italic;
    text-align : center;
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
      width : 80%;
    }
    button{
      padding : 0.4rem 2rem;
      margin-top : 0rem;
    }
  }
`