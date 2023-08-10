
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

const Infos = {
    
    images : [
      '/boutique.jpg',
      '/photo1.jpg',
      '/photo2.jpg',
    ],
    texts : [
      'Livres Rares',
      'Vêtements',
      'Materiaux Cuir',
      'Divers Livres & ...'
    ]
  }


  
const FinalHero = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const router = useRouter()
    useEffect(() => {
        const interval = setInterval(() => {
          setActiveIndex((prevIndex) => (prevIndex + 1) % Infos.images.length);
        }, 3000);
        return () => clearInterval(interval);
  }, []);

  const handleButtonClick = (text : string) => {
    console.log(text)
    if(text === "Livres Rares") {router.push('/all');}
    else if(text === "Vêtements") {router.push('/articles/categorie/Vetements');}
    else if(text === "Materiaux Cuir") {router.push('/articles/categorie/Cuirs');}
    
};
      
  return <Container>
        <Left>
            <h1>
               Emmaüs Châtellerault-Naintré vous vend <br/>  ses <span style={{color : 'black'}}>{Infos.texts[activeIndex]} </span>
            </h1>
            <button onClick={()=>handleButtonClick(Infos.texts[activeIndex])}>Voir Nos {Infos.texts[activeIndex]}</button>
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
  @media screen and (width: 767px) {
   height : 80vh;
   justify-content :center;
   gap :1rem;
   flex-direction : row;
  }
  @media screen and (max-width: 767px) {
   height : 80vh;
   justify-content :center;
   gap :1rem;
   flex-direction : column;
  }

      /* styles for screens between 768px and 1024px */
      @media screen and (width: 820px) {
           flex-direction: column;
        }
        @media screen and (width: 768px) {
          // flex-direction: column;
           height : 60vh;
        }

        /* styles for screens between 768px and 1024px */
      @media screen and (width: 912px) {
           flex-direction: column;
           height : 50vh;
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
            font-weight: 400;
            font-family: 'Montserrat', sans-serif;
            color : #174d17;
            font-size : 30px;
            width : 450px;
            //text-align : center;
        }

        button {
            background-color : #174d17;
            font-weight: 400;
            font-family: 'Montserrat', sans-serif;
            padding : 1rem;
            color : white;
            border-radius : 30px;
            align-self:start;
            margin-left : 1.5rem;
        }

        /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
      gap : 1rem;
      transform : translate(0.3rem,1.8rem);
      h1{
        text-align : center;
      
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

      @media screen and (width: 412px) {
          transform : translate(0.3rem,-2rem);
        }
        @media screen and (width: 425px) {
          transform : translateY(4.3rem);
        }


  @media screen and (width: 912px) {
    transform : translate(1rem,5rem);
      h1{
        font-weight : bolder;
        font-size :  30px !important;
      }
      button {
           padding : 0.5rem 4rem;   
               } 
        }
    /* styles for screens between 768px and 1024px */
    @media screen and (width: 820px) {
           transform : translateY(3rem);

           button {
            padding : 0.5rem 4rem;
           }
        }

        @media screen and (width: 768px) {
            transform : translateY(2rem);

            button {
            padding : 0.5rem 4rem;
            transform : translateX(2rem);
           }
        }


  /*styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    gap : 0.8rem;
    width : 25rem;
    h1{
      text-align : center;
      transform : translateX(0.5rem);

      font-size : 20px;
    }
      button {
        font-size : 10px;
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
    transform : translateY(4.5rem);
  }

    /* styles for screens between 768px and 1024px */
    @media screen and (width: 820px) {
           transform : translateY(3rem);
        }

        @media screen and (width: 768px) {
            transform : translateY(1rem);
        }

        @media screen and (width: 912px) {
            transform : translateY(5rem);
        }
        @media screen and (width: 412px) {
          transform : translateY(10em);
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