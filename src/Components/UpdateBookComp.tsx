import { addBook , updateBook } from '@/lib/helpers'
import React, { FC, useReducer, useState} from 'react'
import styled from 'styled-components'
import {  toast ,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BookData {
    titre: string;
    auteur: string;
    categorie: string;
    image: string;
    description: string;
    rating: number;
    quantite: number;
    etat: string;
    prix: number;
  }

interface Props {
    existingData: BookData;
    onUpdate : () => void // to then refetch()
    bookId : string
}


const UpdateBookComp: FC<Props> = ({ existingData, onUpdate , bookId }) => {
  const [formData, setFormData] = useState<BookData>(existingData);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Object.keys(formData).length === 0) {
      return <h1>form empty</h1>;
    }
    console.log(formData);
    await updateBook(bookId,formData);
    toast.success('book Modified Successfully',{
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "colored"
    });
    onUpdate();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor='titre'>Titre:</label>
          <input type='text' onChange={handleInputChange} id='titre' name='titre' value={formData.titre} />
        </FormGroup>
        <FormGroup>
          <label htmlFor='auteur'>Auteur:</label>
          <input type='text'   id='auteur' name='auteur' value={formData.auteur} onChange={handleInputChange}  />
        </FormGroup>
        <FormGroup>
          <label htmlFor='categorie'>Categorie:</label>
          <input type='text' onChange={handleInputChange} id='categorie' name='categorie' value={formData.categorie}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='imageUrl'>Image URL:</label>
          <input type='text' onChange={handleInputChange} id='image' name='image' value={formData.image} />
        </FormGroup>
        <FormGroup>
          <label htmlFor='Description'>Description:</label>
          <textarea  onChange={handleInputChange} id='Description' name='description' value={formData.description}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='rating'>Rating:</label>
          <input type='number' onChange={handleInputChange} id='rating' name='rating' max={5} min={0} step={0.5} value={formData.rating}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='quantite'>quantité :</label>
          <input type='number' onChange={handleInputChange} id='quantite' name='quantite'  min={1} step={1} value={formData.quantite}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='date_du_livre'>Date De Livre :</label>
          <input type='date'  onChange={handleInputChange} id='date_du_livre' name='date_du_livre'/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='prix'>Prix :</label>
          <input type='number' onChange={handleInputChange} id='prix' name='prix'  min={1} step={1} placeholder='15€' value={formData.prix}/>
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
       <Button type='submit'>Modifier</Button>
       </div>
      </Form>
    </Container>
  )
}

export default UpdateBookComp

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
  input , textarea  {
    background : none;
  }

  input[type='text'], input[type='number'], input[type='radio'] {
    margin-right: 10px;
    border: 1px solid black;
    border-radius: 5px;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }

  input[type='text'] {
    padding-right: 2rem;
  }
  textarea {
    height: 100px;
    resize: vertical;
    border : solid 1px black;
    border-radius : 5px;
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
