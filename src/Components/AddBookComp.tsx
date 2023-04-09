import { addBook } from '@/lib/helpers'
import React, { FC, useReducer} from 'react'
import styled from 'styled-components'
import {  toast ,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Props {
  onAdd : () => void // to then refetch()
}

const formReducer = (state : Object, e : any) =>{
  return {
    ...state ,
    [e.target.name]:e.target.value //for every input  , its name = event.target.itsValue
  }
}

const AddBookComp:FC<Props> = ({onAdd}) => {
    const [formData,setFormData] = useReducer(formReducer,{}) 
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    if(Object.keys(formData).length == 0) {
        return <h1>form empty</h1>
    }
        console.log(formData);
       await addBook(formData);
       toast.success('book Modified Successfully',{
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "colored"
      });
      onAdd()

      };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor='titre'>Titre:</label>
          <input type='text' onChange={setFormData} id='titre' name='titre' />
        </FormGroup>
        <FormGroup>
          <label htmlFor='auteur'>Auteur:</label>
          <input type='text'   id='auteur' name='auteur' onChange={setFormData} />
        </FormGroup>
        <FormGroup>
          <label htmlFor='categorie'>Categorie:</label>
          <input type='text' onChange={setFormData} id='categorie' name='categorie'/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='imageUrl'>Image URL:</label>
          <input type='text' onChange={setFormData} id='image' name='image' />
        </FormGroup>
        <FormGroup>
          <label htmlFor='Description'>Description:</label>
          <textarea  onChange={setFormData} id='Description' name='Description' />
        </FormGroup>
        <FormGroup>
          <label htmlFor='rating'>Rating:</label>
          <input type='number' onChange={setFormData} id='rating' name='rating' max={5} min={0} step={0.5}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='quantite'>quantité :</label>
          <input type='number' onChange={setFormData} id='quantite' name='quantite'  min={1} step={1}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='date_du_livre'>Date De Livre :</label>
          <input type='date' onChange={setFormData} id='date_du_livre' name='date_du_livre'/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='prix'>Prix :</label>
          <input type='number' onChange={setFormData} id='prix' name='prix'  min={1} step={1} placeholder='15€'/>
        </FormGroup>
        <FormGroup>
        { /* <label htmlFor='active' >Statut:</label>
          <RadioGroup>
            <label>
              <input type='radio' onChange={setFormData} id='inactive' name='status' value='inactive' />
              Inactif
            </label>
            <label>
              <input type='radio' id='active'  value='active' name='status' />
              Actif
            </label>
  </RadioGroup> */}
        </FormGroup>
       <div className='button'>
       <Button type='submit'>Ajouter</Button>
       </div>
      </Form>
    </Container>
  )
}

export default AddBookComp

const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  margin-top : 1.8rem;
  gap: 5rem;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  font-family: 'Playfair Display SC', serif;
`

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  justify-items: center;

`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;

  label {
    margin-right: 10px;
    margin-bottom: 5px;
  }

  input[type='text'], input[type='number'], input[type='radio'] {
    margin-right: 10px;
    border: 1px solid black;
    color: #555;
    background-color: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  input[type="date"] {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
    font-family: Arial, sans-serif;
    color: #555;
    background-color: #fff;
    width: 100%;
  }

  /* Styles for the date picker calendar popup */
  input[type="date"]::-webkit-calendar-picker-indicator {
    color: #555;
    font-size: 16px;
    padding: 4px;
  }
  input[type='text'] {
    padding-right: 2rem;
  }
  textarea {
    height: 100px;
    resize: vertical;
    border : solid 1px black;
    border-radius : 5px;
    color: #555;
    background-color: #fff;
  }
`
const Button = styled.button`
margin-top: 10px;
padding: 10px 60px;
background-color: #0077cc;
color: #ffffff;
border: none;
border-radius: 5px;
cursor: pointer;

&:hover {
background-color: #0066b2;
}
`