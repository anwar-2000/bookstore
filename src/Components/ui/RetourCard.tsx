import React from 'react'
import styled from 'styled-components'

interface Props {
    name : string ;
    email : string;
    address  : string;
    numero : string;
    cause : string;
    retour : string
}

const RetourCard:React.FC<Props> = ({name , address , email , numero , retour ,cause}) => {
  return <Container>
            <Header>{name}</Header>
            <a href={`mailto:${email}`} style={{textDecoration : 'underline'}}><small>{email}</small></a>
            <a href={`tel:${numero}`}><small>{numero}</small></a>
            <Description>
               <mark>{retour}</mark> 
            </Description>
            <small>{cause}</small>
            <small>{address}</small>
            <button>DELETE</button>
  </Container>
}

export default RetourCard


const Container = styled.div`
    width : 16rem;
    height : 12rem;
    border-radius : 12px;
    display : flex;
    flex-direction : column;
    align-items  : center;
    justify-content : center;
    margin : 2rem 2rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding : 1rem;
    background : #39bbaa;
    color : #070707;

    button{
        background : #f13b26;
        padding : 0.6rem 2rem;
        margin-top : 0.5rem;
        border-radius : 12px;
    }
`

const Header = styled.h1`
    font-size : 20px;
`


const Description = styled.div`
    font-size : 15px;
    text-align : center;
`