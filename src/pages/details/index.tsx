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
`

const Container = styled.div`
    margin-top: 4rem;
    height: 80vh;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    gap: 4rem;
    
`
const Left = styled.div`
    width: 30rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;

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
const Right = styled.div`
    width: 30rem;
    background-color: #74a2ca;
    img{
       aspect-ratio: 9/10;
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
    <Container>

    <Right>
                        <img src="https://3.bp.blogspot.com/-b4tggdxOD9U/Uk7SdMckW2I/AAAAAAAAACY/t8WqMOdJUgM/s1600/harry2+cover.jpg" alt='Harry Potter 2' />
                    </Right>
            <Left>
                    <h1>Harry Potter 2</h1>
                    <small>By J.K Rowling</small>
                    <p>Description : Harry Potter and the Chamber of Secrets begins when Harry is spending a miserable summer with his only remaining family, the Dursleys. During a dinner party hosted by his uncle and aunt, Harry is visited by Dobby, a house-elf. Dobby warns Harry not to return to Hogwarts, the magical school for wizards that Harry attended the previous year ...</p>
                    <h6>Prix : 15€</h6>
                    <div className='buttons'>
                          <button onClick={handleClickdetails}>Ajouter au Panier</button>
                          <button onClick={handleClickAchat}>Acheter</button>    
                        </div>
            </Left>
            

            
    </Container>
    </Section>
}

export default index