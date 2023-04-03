import { addUser } from '@/lib/helpers';
import React, { useReducer } from 'react'
import styled from 'styled-components'

interface Props {}

const formReducer = (state : Object, e : any) =>{
    return {
      ...state ,
      [e.target.name]:e.target.value //for every input  , its name = event.target.itsValue
    }
  }

const Register = () => {
    const [formData,setFormData] = useReducer(formReducer,{}) 

    const HandleClick = async (e : any ) => {
        e.preventDefault();
        const user  =  await addUser(formData)
        console.log(user)
        try {
            
        } catch (error) {
            console.log(error)
        }


    }
  return <Container>
        <h1>Register</h1>
        <label htmlFor="username">Username :</label><input type="email" id="username" name="username" onChange={setFormData}/>
        <label htmlFor="email">Email :</label> <input type="email" id="email" onChange={setFormData} name="email" />
        <label htmlFor="password">Password :</label> <input type="password" id="password" onChange={setFormData}  name="password"/>

        <button onClick={HandleClick}>Submit</button>
  </Container>
}

export default Register

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