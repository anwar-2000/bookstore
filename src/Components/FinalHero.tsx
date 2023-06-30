
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion';

const Infos = {
    
    images : [
        'https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/310851962_219997220357495_1335150304860865503_n.jpg?stp=cp6_dst-jpg&_nc_cat=102&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=-kj1B7_oTa4AX-wdJMT&_nc_ht=scontent-cdg4-1.xx&oh=00_AfAqBcqMBuQCPoxeR8Ayhm27BBl7Kx6uivzfx_99gYUVxQ&oe=64A365EF',
      'https://scontent-cdg4-3.xx.fbcdn.net/v/t39.30808-6/312782248_221469720210245_322048792218595200_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=730e14&_nc_ohc=gaB5Rrdw06kAX9TJ_L-&_nc_ht=scontent-cdg4-3.xx&oh=00_AfCIFnsuSB2nOvup6j4Bbtn8oIXg7eFbPymGsNn7vvnF9g&oe=64A362A2',
      'https://scontent-cdg4-2.xx.fbcdn.net/v/t1.6435-9/69293795_2385081864943794_5215617712268509184_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=cdbe9c&_nc_ohc=JEmVEHUm8a0AX-7tx5U&_nc_ht=scontent-cdg4-2.xx&oh=00_AfAxZAv9IOADJtnn2Dq-53R-lpxKSc-anzFacCsBJ4KaZg&oe=64C63977'
    ],
    texts : [
      'Livres',
      'Vêtements',
      'Materieux Cuirs',
      'Divers Livres & ...'
    ]
  }


  
const FinalHero = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
          setActiveIndex((prevIndex) => (prevIndex + 1) % Infos.images.length);
        }, 3000);
        return () => clearInterval(interval);
  }, []);
      
  return <Container>
        <Left>
            <h1>
               La boutique Emmaüs Naintré   vous <br/> vends ses <span style={{color : 'black'}}>{Infos.texts[activeIndex]} </span>
            </h1>
            <button>Acheter Maintenant</button>
        </Left>
        <Right>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 , y: 300 }}
            animate={{ opacity: 1 , y:0 }}
            exit={{ opacity: 0}}
            transition={{ duration: 0.5 }}
          >
            <img
              id='images'
              alt="Emmaus Naintré"
              src={Infos.images[activeIndex]}
              width={540}
              height={600}
            />
          </motion.div>
        </AnimatePresence>        </Right>
  </Container>
}

export default FinalHero

const Container = styled.div`
    width : 90vw;
    height : 50vh;
    background-color : #ecd3c3;
    display : flex;
    align-items : center;
    justify-content : space-between;
    color : black;
    overflow:hidden;

  /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
    height : 60vh;
   justify-content :center;
   gap :2rem;
   flex-direction : column;
  }

  /*styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    text-align : center;
    justify-content :center;
    gap : 0rem;
  }
 

 
`



const Left = styled.div`    
        display : flex;
        align-items : center;
        justify-content : center;
        flex-direction : column;
        gap : 2rem;

        h1 {
            margin-left : 1.5rem;
            font-weight : bold;
            color : #174d17;
            font-size : 30px;
            width : 450px;
            //text-align : center;
        }

        button {
            background-color : #174d17;
            padding : 1rem;
            color : white;
            border-radius : 30px;
            align-self:start;
            margin-left : 1.5rem;
        }

        /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
      gap : 1.5rem;
      transform : translateY(3.8rem);
      h1{
        margin-right : 3rem;
        width : 250px;
        align-self : start;
        font-size : 25px;
      }

      button {
        font-size : 10px;
        padding : 0.6rem;
        align-self : end;
        transform : translate(-1rem ,-1.5rem);
      }
  }

  /*styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    gap : 0.8rem;
    width : 25rem;
    h1{
      text-align : center;
      transform : translateX(0.5rem);
      font-size : 25px;
    }
      button {
        transform : translateX(-6.5rem);
      }
  }

  @media screen and (max-width: 1024px) {
    h1{
      margin-right : 2.5rem;
    }
        button{
          align-self : center;
          transform : translateX(-0.8rem);
        }
  }
  
`

const Right = styled.div`
    display : grid;
    place-items : center;

    img{
        width : 700px;
        
    }
    /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
    margin-top : 1rem;
  }

  /*styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
      margin-top : 4rem;
      flex : 3;
      img{
        width : 1200px;
        height : 400px;
      }

  }


  @media screen and (max-width: 1024px) {
      img{
        margin-bottom : 2.5rem;
      }
  }
    
`