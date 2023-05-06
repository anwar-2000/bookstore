import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

interface Props {
  imageUrl1: string;
  imageUrl2: string;
  imageUrl3: string;
}

const ImageSlider: React.FC<Props> = ({ imageUrl1, imageUrl2, imageUrl3 }) => {
const [mainUrl,setMainUrl] = useState<string>(imageUrl1)

  return (
    <Container>
      <MainImage src={mainUrl} alt='' id='bigImage' />
      <OtherImages>
          <img src={imageUrl2} alt=''  onClick={()=>{setMainUrl(imageUrl2)}}/>
          <img src={imageUrl1} alt=''  onClick={()=>{setMainUrl(imageUrl1)}}/>
          <img src={imageUrl3} alt=''  onClick={()=>{setMainUrl(imageUrl3)}} />
      </OtherImages>
    </Container>
);
};

export default ImageSlider;

const Container = styled.div`
    width : 30rem;
    height : 30rem;
    position : relative;
    display : flex;
    flex-direction : column;
    align-items : start;
    gap : 2rem;
    justify-content : center;

    img {
      height : 80%;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); /* Add a box shadow */
  
    

    }
`

const MainImage = styled.img`
    align-self : center;
    width : 100%;

    #bigImage {
      padding-top : 10rem;
    }
`

const OtherImages = styled.div`
align-self : center;
    height : 30% !important;
    width : 50% !important;
    display : flex;
    align-items : center;
    justify-content : center;
    gap : 1.2rem;

    img {
      cursor : pointer;
      width : 50% !important;
      height : 50% !important;
      &:hover {
        transform: scale(1.1);
       }

    }

`


