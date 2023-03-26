import React , {FC} from 'react'
import styled from 'styled-components'

interface Props {
    titre  : string ,
    auteur : string,
    prix : number,
    quantite : number,
    imageUrl : string
}

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
flex-direction: column;
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
const BookItem:FC<Props> = ({titre , auteur , prix , quantite , imageUrl}) => {

   
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
                
                <div className='buttons'>
                <button>Details</button>
                <button>Acheter</button>    
                </div>
            </InfoContainer>
  </Container>
}




export default BookItem