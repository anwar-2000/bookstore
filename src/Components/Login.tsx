import React from 'react'
import styled from 'styled-components'
import {signIn} from 'next-auth/react'
interface Props {}

const Login = () => {


    const HandleClick = async (e : any ) => {
        e.preventDefault();

        try {
            const data = await signIn('credentials' , {
                redirect : false,
                email,
                password
            })

            console.log(data)
        } catch (error) {
            console.log(error)
        }
        
        try {
            
        } catch (error) {
            console.log(error)
        }


    }
  return <Container>
        <h1>Login</h1>
        <label htmlFor="email">Email :</label> <input type="email" id="email" />
        <label htmlFor="password">Password :</label> <input type="password" id="password" />

        <button onClick={HandleClick}>Submit</button>
  </Container>
}

export default Login

const Container = styled.div`
    width: 20rem;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;

    h1{
        font-size: 2rem;
    }
`