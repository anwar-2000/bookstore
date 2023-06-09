import { addBook } from '@/lib/helpers'
import React, { FC, useEffect, useReducer, useState} from 'react'
import styled from 'styled-components'
import {  toast ,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import slugify from 'slugify';


interface Props {
  onAdd : () => void // to then refetch()
}

const formReducer = (state: Object, e: any) => {
  if (e.target.name === 'titre') {
    const slug = slugify(e.target.value, { lower: true });
    return {
      ...state,
      [e.target.name]: e.target.value,
      slug: slug,
    };
  }
  return {
    ...state,
    [e.target.name]: e.target.value,
  };
};

const AddBookComp:FC<Props> = ({onAdd}) => {
    const [load, setLoad] = useState(false)
    useEffect(()=>{

    },[load])
    const [formData,setFormData] = useReducer(formReducer,{}) 
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    if(Object.keys(formData).length === 0) {
      toast.info('Le formulaire est vide !',{
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored"
      });
      return;
    }
     //console.log(formData);
      const response =  await addBook(formData);
      if(response){toast.success('book Added Successfully',{
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored"
      });}
      setLoad(!load)
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
          <input type='text' onChange={setFormData} id='image' name='imageUrl1' />
        </FormGroup>
        <FormGroup>
          <label htmlFor='imageUrl'>Image URL 2 :</label>
          <input type='text' onChange={setFormData} id='image' name='imageUrl2' />
        </FormGroup>
        <FormGroup>
          <label htmlFor='imageUrl'>Image URL 3 :</label>
          <input type='text' onChange={setFormData} id='image' name='imageUrl3' />
        </FormGroup>
        <FormGroup>
          <label htmlFor='Description'>Description:</label>
          <textarea  onChange={setFormData} id='Description' name='description' />
        </FormGroup>
        <FormGroup>
          <label htmlFor='etat'>Etat:</label>
          <input type='text' onChange={setFormData} id='etat' name='etat' />
        </FormGroup>
        <FormGroup>
          <label htmlFor='quantite'>quantité :</label>
          <input type='number' onChange={setFormData} id='quantite' name='quantite'  min={1} step={1}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='prix'>Prix :</label>
          <input type='number' onChange={setFormData} id='prix' name='prix'  min={1} step={1} placeholder='15€'/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='poids'>Poids :</label>
          <input type='number' onChange={setFormData} id='poids' name='poids' min="0" step="0.001"  placeholder='0.100 kg'/>
        </FormGroup>
        <FormGroup>
       
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
  margin-bottom : 5rem;
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

  input , textarea  {
    background : white;
 
  }

  input[type='text'], input[type='number'], input[type='radio'],input[type='date'] , textarea{
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  font-size: 16px;
  color: #555;
  outline: none;
  transition: border-color 0.3s ease-in-out;
}

input[type='text']:focus, input[type='number']:focus, input[type='radio']:focus , textarea:focus , input[type='date']:focus {
  border-color: #4c7cff;
}
  /* Styles for the date picker calendar popup */
  input[type="date"]::-webkit-calendar-picker-indicator {
    color: #fffb09 !important;
    font-size: 16px;
    padding: 4px;
  }
  input[type='text'] {
    padding-right: 2rem;
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