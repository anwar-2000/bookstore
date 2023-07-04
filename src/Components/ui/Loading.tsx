import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loading = () => {
  return (
    <Container>
      <img src="./logo.jpg" alt="" className="loading-image" />
    </Container>
  );
};

export default Loading;

const zoomIn = keyframes`
  0% {
    opacity : 0;
    transform: scale(0);
  }
  50% {
    opacity : 1;
    transform: scale(1.3);
  }
  100% {    
    transform: scale(2);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  margin-top : 5rem;
  margin-left : 3rem;
  height: 100vh;

  @media screen and (max-width: 767px) {
    //margin-top : 16rem;
    margin-left : 1rem;
}

  .loading-image {
    animation: ${zoomIn} 400ms ease-in-out;
        width : 250px;
        mix-blend-mode : darken;
  }
`;