import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components';

const Index = () => {
    const router = useRouter()
    useEffect(() => {
        // Redirect after 3 seconds
        const timer = setTimeout(() => {
          router.push('/all'); // Redirect to home page
        }, 3000);
    
        // Clean up timer
        return () => clearTimeout(timer);
      }, []);
  return <Container>
    <h1>...Merci D&apos;avoir vu nos livres...</h1>  
    <img
      src="/cancel.png"
      alt="Payment Annulé"
    />          
  </Container>
}

export default Index

const Container = styled.div`
    display : grid ;
    margin-top : 3rem;
    place-items : center;
    height : 80vh;
    img {
      mix-blend-mode : multiply ;
    }

`