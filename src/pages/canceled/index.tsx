import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import styled from 'styled-components';

const index = () => {
    const router = useRouter()
    useEffect(() => {
        // Show toast message
        toast.error('Payment Annullé!', {
          autoClose: 5000, // 5 seconds
          position: toast.POSITION.TOP_CENTER
        });
    
        // Redirect after 5 seconds
        const timer = setTimeout(() => {
          router.push('/all'); // Redirect to home page
        }, 5000);
    
        // Clean up timer
        return () => clearTimeout(timer);
      }, []);
  return <Container>
    <img
      src="/cancel.png"
      alt=" Payment Annulé"
    />          
  </Container>
}

export default index

const Container = styled.div`
    display : grid ;
    margin-top : 3rem;
    place-items : center;
    height : 80vh;
`