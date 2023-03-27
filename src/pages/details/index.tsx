import NavBar from '@/Components/NavBar'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

interface Props {}

const Section = styled.section`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    gap : 2rem;

    /* styles for screens smaller than 768px */
@media screen and (max-width: 767px) {
    gap: 1rem;

}

/* styles for screens between 768px and 1024px */
@media screen and (min-width: 768px) and (max-width: 1024px) {
    gap : 2rem;
    .content{
        transform: translateY(-8rem);
    }
}

@media screen and (min-width: 912px) and (max-width: 1024px) {
    gap : 0rem;
    overflow-y: scroll;
    .content{
        transform: translateY(-11rem);
    }

}
    
`

const Container = styled.div`
    margin-top: 4rem;
    height: 80vh;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    gap: 4rem;

    /* styles for screens smaller than 768px */
@media screen and (max-width: 767px) {
    flex-direction: column;

}

/* styles for screens between 768px and 1024px */
@media screen and (min-width: 768px) and (max-width: 1024px) {
    flex-direction: column;

}
    
`
const Left = styled.div`
    width: 30rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    h1{
        font-size: 4rem;
        font-family: Arial, Helvetica, sans-serif;
    }

    span {
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
        font-size: 1.2rem;
    }

    .infos {
        align-items: start;
        justify-content: start;
        display: flex;
        flex-direction: column;
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
 /* styles for screens smaller than 768px */
 @media screen and (max-width: 767px) {
    align-items: center;
    justify-content: center;
    & .infos {
        justify-content: center;
        align-items: center;

        h1 {
            font-size: 30px;
            margin: 0.6rem 0;
        }

        small {
            margin-bottom: 0.5rem;
            font-size: larger;
        }

        p{
            width: 80%;
            text-align: center;
        }

        h6{
            margin-top: 0.9rem;
            font-size: 1.5rem;
        }
    }

}

/* styles for screens between 768px and 1024px */
@media screen and (min-width: 768px) and (max-width: 1024px) {
    gap:1rem;
    align-items: center;
    justify-content: start;

}
`
const Right = styled.div`
    width: 30rem;
    img{
       aspect-ratio: 9/10;
    }

            /* styles for screens smaller than 768px */
@media screen and (max-width: 767px) {
    & img {
        aspect-ratio: 16/10;
    }

}

/* styles for screens between 768px and 1024px */
@media screen and (min-width: 768px) and (max-width: 1024px) {
    & img {
        aspect-ratio: 16/10;
    }

}

`


const index = () => {

    const router = useRouter()

    const handleClickdetails = () => {
        //panier code
    }

    const handleClickAchat = () => router.push('/achat')

    
  return <Section>
    <NavBar />
    <Container className='content'>
    <Right>
            <img src="https://3.bp.blogspot.com/-b4tggdxOD9U/Uk7SdMckW2I/AAAAAAAAACY/t8WqMOdJUgM/s1600/harry2+cover.jpg" alt='Harry Potter 2' />
    </Right>
    <Left>
                    <div className='infos'>
                    <h1>Harry Potter 2</h1>
                    <small> <span>Auteur :</span> J.K Rowling</small>
                    <p> <span>Description :</span> Harry Potter and the Chamber of Secrets begins when Harry is spending a miserable summer with his only remaining family, the Dursleys. During a dinner party hosted by his uncle and aunt, Harry is visited by Dobby, a house-elf. Dobby warns Harry not to return to Hogwarts, the magical school for wizards that Harry attended the previous year ...</p>
                    <h6><span>Prix :</span> 15€</h6>
                    </div>
                    <div className='buttons'>
                          <button onClick={handleClickdetails}>Ajouter au Panier</button>
                          <button onClick={handleClickAchat}>Acheter</button>    
                        </div>
    </Left>
            

            
    </Container>
    </Section>
}

export default index