import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
const Confetti = dynamic(() => import('react-confetti'), {
  ssr: false
})
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { ArrowBigLeft } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface Props {}

const Index = () => {
  const {isChecked} = useSelector((state:any)=> state.cart)
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth ,
          height: containerRef.current.clientHeight + 150,
        })
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  if(isChecked){
    toast.success(`Veuillez venir a La Boutique pour Prendre Votre Commande , Merci`,{
      position: toast.POSITION.TOP_CENTER,
      theme: "colored"
    });
  }
  return <Container ref={containerRef}>
      <h1>On Vous Remerci Pour votre Achat </h1>
      <button onClick={()=> router.push('/all')}>
        <ArrowBigLeft />
      </button>
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        recycle={true}
        numberOfPieces={300}
        run={true}
        gravity={0.2}
        colors={['#f44336', '#2196f3', '#ffeb3b', '#4caf50', '#9c27b0']}
      />
    </Container>
  
};

export default Index;

const Container = styled.div`
  height: 80vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content : center;
  flex-direction : column;
  gap : 3rem;
  overflow-x : hidden;
  

  h1 {
    font-size : 60px;
  }
  button {
    padding : 1rem 6rem;
    border-radius : 5px;
    background-color : #1997d1;
    color : white;
  }

  /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
    
  }

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    
  }

  @media screen and (min-width: 912px) and (max-width: 1024px) {
    
  }
`;