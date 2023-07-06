import Image from 'next/image';
import React from 'react'
import styled from 'styled-components';

interface Props {
    title : string,
    description : string,
    date : Date ,
    image : string
}

const ActualitesCard = ({title , image , description , date } : Props) => {
    //console.log({title , image , description , date })
  return <Container>
        
        <img src={image}  alt={title} />
        <div className='Infos'>
                <h1>{title}</h1>
                <small>{description}</small>
                <h3> Créé Le : {new Date(date).toISOString()}</h3>
        </div>
  </Container>
}

export default ActualitesCard;

const Container = styled.div`
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
    padding : 0.5rem;
    border-radius : 15px;
    width : 80vw;
    height : 40vh;
    display: flex;
    background-color : #20a3c0;
    gap : 1.25rem;
    align-items : start;
    justify-content : start;
    position : relative;

    @media screen and (max-width : 767px){ 
        width : 70vw;
        height : auto;
        img{
            width : 40% !important;
            margin-top : 3.2rem;
        }
        .Infos{
           color : white;
            h3{
                top : 1rem;
                left :  0.2rem;
                font-size : 10px !important;
            }
            h1{
                text-align : center;
                margin-bottom : 0.5rem;
            }
        }
    }
    @media screen and (max-width : 575px){
       flex-direction : column;
       width : 70vw;
       height : auto;
       img{
        align-self : center;
           width : 70% !important;
           margin-top : 3.2rem;
       }

       .Infos{
          color : white;
           h3{
               top : 1rem;
               left :  0.2rem;
               font-size : 10px !important;
           }
           h1{
               text-align : start;
               margin-bottom : 0.5rem;

           }
       }
   }

   img{
        width : 30%;
        height : 100% !important;
    }

    .Infos{
           
        h1{
            font-weight: 700;
            font-size : 18px;
            font-family: 'Montserrat', sans-serif;
        }
        margin-top : 1rem;
        width : 70%;
        small {
            font-size : 14px;
            color : white;
            width : 20rem;
           
        }
        h3{
            font-size : 13px;
            position : absolute;
            right : 2rem;
            bottom : 1rem;
            color : #413d3d;
            font-family: 'Montserrat';
        }
    }
`