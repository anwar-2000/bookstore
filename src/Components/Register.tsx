import { addUser } from '@/lib/helpers';
import React, { useReducer } from 'react'
import styled from 'styled-components'

interface Props {}

const formReducer = (state : Object, e : any) =>{
    return {
      ...state ,
      [e.target.name]:e.target.value //for every Input  , its name = event.target.itsValue
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
        <Title>Ajoutez Un Compte Admin </Title>
        <Label htmlFor="username">Username :</Label><Input type="email" id="username" name="username"  className='text-slate-700' onChange={setFormData}/>
        <Label htmlFor="email">Email :</Label> <Input type="email" id="email" onChange={setFormData}  className='text-slate-700' name="email" />
        <Label htmlFor="password">Password :</Label> <Input type="password" id="password" onChange={setFormData}  className='text-slate-700'  name="password"/>

        <Button onClick={HandleClick}>Submit</Button>
  </Container>
}

export default Register

const Container = styled.div`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  transform : translateY(-3rem);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 768px) {
    padding: 40px;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 30px;
`;



const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #0070f3;
  margin-top : 2rem;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0060cc;
  }
`;