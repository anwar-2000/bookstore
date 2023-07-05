import { Skeleton } from '@mui/material'
import React from 'react'
import styled from 'styled-components'



const LoadingDetails = () => {
    
  return <BigContainer>
  <Container>
    <Skeleton variant="rectangular" width={500} height={800} />
    <Details>
      <div className="infos">
        <h1>
          <Skeleton variant="text" width={200} />
        </h1>
        <small>
          <Skeleton variant="text" width={100} />
        </small>
      </div>
      <div className="prices">
        <h2>
          <Skeleton variant="text" width={80} />
        </h2>
      </div>
      <div className="colors">
        <div className="circle">
          <Skeleton variant="circular" width={20} height={20} />
        </div>
        <div className="circle">
          <Skeleton variant="circular" width={20} height={20} />
        </div>
        <div className="circle">
          <Skeleton variant="circular" width={20} height={20} />
        </div>
      </div>
      <div className="quantite__container">
        <div className="quantite">
          <Skeleton variant="circular" width={24} height={24} />
          <h6>
            <Skeleton variant="text" width={20} />
          </h6>
          <Skeleton variant="circular" width={24} height={24} />
        </div>
        <small>
          <Skeleton variant="text" width={200} />
        </small>
      </div>
      <div className="buttons">
        <Skeleton variant="rectangular" width={120} height={40} />
        <Skeleton variant="rectangular" width={120} height={40} />
      </div>
    </Details>
  </Container>
  </BigContainer>
}

export default LoadingDetails

const BigContainer = styled.div`
        overflow-x : hidden;
        display : flex;
        align-items : center;
        justify-content : center;
        flex-direction : column;
        min-height : 100vh;
`
const Container = styled.div`
    margin-top : 2rem;
    display : flex;
    align-items : center;
    justify-content : center;
    color : black;
    gap : 2rem;

    /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
        flex-direction : column;
        margin-top : 1rem;
  }

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
        margin-top : 5rem;
  }


  @media screen and (min-width: 912px) and (max-width: 1024px) {
    
  }

`

const Images = styled.div`
    
    display : grid;
    place-items : center;
    align-self : center;
`
const Details = styled.div`
    align-self : start;
    flex:1;
    display : flex;
    flex-direction : column;

     /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
        align-self : center;
        
        align-items : center;
        justify-content : center;
  }


    h1{
        font-weight : bold;
        font-size : 15px;
    }
    .infos{
        display : flex;
        flex-direction : column;
        align-items : start;
        justify-content : start;
        h1{
            font-size : 35px;
            font-weight : bold;
        }
        & small{
            font-size : 10px;
            color : black;
            width : 15rem;
        }
    }

    .prices {
        h2{
            font-size : 30px;
            font-weight : bold;
        }
    }
    .colors {
            display : flex;
            gap : 0.6rem;
            width : 12rem;
            .circle{
                width : 20px;
                height : 20px;
                background : black;
                border-radius : 50%;

                &:hover {
                    cursor : pointer;
                }
            }
        }
    .quantite{
        margin-top : 1rem;
        background : #b4afaf;
        border-radius : 10px;
        display : flex;
        align-items : center;
        justify-content : center;
        gap : 0.8rem;
        width : 7rem;
        font-size : 17px;
    }
    .buttons{
        display : flex;
        flex-wrap : wrap;
        align-items : center;
        justify-content : center;
        gap : 0.8rem;
        margin-top : 1.6rem;
        button:nth-child(2){
            background : white;
            color : black;
        }
        button {
            background : #003e29;
            border : solid 1.5px black;
            padding: 0.5rem 1.5rem;
            color : white;
            border-radius : 15px;
            transition : all ease-in 300ms;

            &:hover{
                background : black;
                color : white;
            }

               /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
        padding : 0.5rem 0.6rem;
  }
        }
    }

`