import NavBar from '@/Components/NavBar'
import React, { useReducer, useState , useEffect } from 'react'
import styled from 'styled-components'

interface Props {}

const formReducer = (state : Object, e : any) =>{
  return {
    ...state ,
    [e.target.name]:e.target.value //for every input  , its name = event.target.itsValue
  }
}

const index = () => {
    const [formData,setFormData] = useReducer(formReducer,{})
    const [disable,setDisable] =useState<boolean>(true)

    

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    if(Object.keys(formData).length == 0) {
        return <h1>form empty</h1>
    }
        console.log(formData)
        
      };
  return (
    <Container>
      <NavBar />
      <h1>AJOUTER UN LIVRE</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor='titre'>Titre:</label>
          <input type='text' onChange={setFormData} id='titre' name='titre' />
        </FormGroup>
        <FormGroup>
          <label htmlFor='auteur'>Auteur:</label>
          <input type='text' onChange={setFormData} id='auteur' name='auteur' />
        </FormGroup>
        <FormGroup>
          <label htmlFor='categorie'>Categorie:</label>
          <input type='text' onChange={setFormData} id='categorie' name='categorie'/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='imageUrl'>Image URL:</label>
          <input type='text' onChange={setFormData} id='imageUrl' name='imageUrl' />
        </FormGroup>
        <FormGroup>
          <label htmlFor='rating'>Rating:</label>
          <input type='number' onChange={setFormData} id='rating' name='rating' max={5} min={0} step={0.5}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='active'>Statut:</label>
          <RadioGroup>
            <label>
              <input type='radio' onChange={setFormData} id='inactive' name='inactive' value='inactive' />
              Inactif
            </label>
            <label>
              <input type='radio' id='active' name='active' value='active' />
              Actif
            </label>
          </RadioGroup>
        </FormGroup>

       <Button type='submit'>Ajouter</Button>
      </Form>
    </Container>
  )
}

export default index

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  gap: 5rem;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;

  label {
    margin-right: 10px;
  }

  input[type='text'],input[type='number'],
  input[type='radio'] {
    margin-right: 10px;
    border: 1px solid black;
    border-radius: 5px;
  }
  input[type='text']{
    padding-right: 2rem;
  }
`

const RadioGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  label {
    margin-right: 20px;
  }
`

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #0077cc;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0066b2;
  }
`