import { deleteDonsHelper } from '@/lib/helpers';
import React from 'react'
import styled from 'styled-components'

interface Props {
    id: string;
    name : string ;
    prenom : string;
    email : string;
    numero : string;
    don : string;
}

const DonsCard:React.FC<Props> = ({name , prenom , email , numero , don , id}) => {
  return <Container>
            <Header>{name} {prenom}</Header>
            <a href={`mailto:${email}`} style={{textDecoration : 'underline'}}><small>{email}</small></a>
            <a href={`tel:${numero}`}><small>{numero}</small></a>
            <Description>
               <mark>{don}</mark> 
            </Description>
            <button onClick={()=> deleteDonsHelper(id)}>DELETE</button>
  </Container>
}

export default DonsCard


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