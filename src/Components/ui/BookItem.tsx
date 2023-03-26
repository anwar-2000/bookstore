import Link from 'next/link'
import { useRouter } from 'next/router'
import React , {FC, useEffect} from 'react'
import styled from 'styled-components'

interface Props {
    titre: string,
    auteur: string,
    prix: number,
    quantite: number,
    imageUrl: string,
    redirect?: (page: string) => void,
    showButtons : boolean
  }
  
  const BookItem: FC<Props> = ({ titre, auteur, prix, quantite, imageUrl, redirect , showButtons }) => {
        console.log("trying this log")
        console.log(showButtons)
 
    
    const handleClickdetails = () => redirect?.('details');
    const handleClickAchat = () => redirect?.('achat');

   
  return <Container>
            <ImageContainer>
                <img src={imageUrl} alt={titre} />
            </ImageContainer>
            <InfoContainer>
                <h3>{titre}</h3>
                <div className='rowContainer'>
                <small>Auteur :</small><span> {auteur}</span>
                </div>

                <div className='rowContainer'>
                <small>Prix :</small> <span> €{prix}</span>
                </div>
                
                <div className='rowContainer'>
                <small> Quantité dans stock :</small><span>  {quantite}</span>
                </div>
                
                { showButtons ? <div className='buttons'>
                    <button onClick={handleClickdetails}>Details</button>
                    <button onClick={handleClickAchat}>Acheter</button>
                </div> : <p>NEW !!</p>}
            </InfoContainer>
  </Container>
}




export default BookItem;


const Container = styled.div`
border: solid 1px black;
width: 15rem;
height: auto;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
position: relative;
border-radius: 5px;
transition: all ease 400ms;

&:hover{
    width: 17rem;
}

  /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
    &:hover{
        width: 15rem;
    }
}
`
const ImageContainer = styled.div`
width: 100%;
height: 100%;
border-bottom: 2px solid white;

img {
    object-fit: cover;
}

`
const InfoContainer = styled.div`
display: flex;
align-items: center;
justify-content: start;
flex-direction: column;

h3{
    font-family: 'Courier New', Courier, monospace;
    font-weight: bold;
}

small {
    font-weight: bold;
    font-size: large;
}

.buttons {
    display: flex;
    gap: 1rem;
    button {
        padding: 0.5rem 1rem ;
        border-radius: 5px;
        border: solid 1px black;
        margin: 0.5rem ;
        font-weight: bold;
        cursor: pointer;

        &:nth-child(1){
            transition: all ease-in 700ms;

            &:hover{
                border: solid 1px black;
                background: black;
                color: white;
            }
        }

        &:nth-child(2){
            background-color: yellow;
            border: none;
            transition: all ease-in 700ms;

            &:hover{
                border: solid 1px black;
                background: black;
                color: white;
            }
        }
    }
    
}

`