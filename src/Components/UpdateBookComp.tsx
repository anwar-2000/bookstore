import { addBook , updateBook } from '@/lib/helpers'
import React, { FC, useReducer, useState} from 'react'
import styled from 'styled-components'
import {  toast ,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BookData {
    titre: string;
    auteur: string;
    categorie: string;
    imageUrl1: string;
    imageUrl2: string;
    imageUrl3: string
    description: string;
    rating: number;
    quantite: number;
    etat: string;
    prix: number;
    poids : number;
  }

interface Props {
    existingData: BookData;
    onUpdate : () => void // to then refetch()
    bookId : string
}


const UpdateBookComp: FC<Props> = ({ existingData, onUpdate , bookId }) => {
  const [formData, setFormData] = useState<BookData>(existingData);


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
          <input type='text' onChange={handleInputChange} id='image' name='imageUrl1' value={formData.imageUrl1}/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='imageUrl'>Image URL 2 :</label>
          <input type='text' onChange={handleInputChange} id='image' name='imageUrl2' value={formData.imageUrl2} />
        </FormGroup>
        <FormGroup>
          <label htmlFor='imageUrl'>Image URL 3 :</label>
          <input type='text' onChange={handleInputChange} id='image' name='imageUrl3' value={formData.imageUrl3}/>
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
          <label htmlFor='etat'>Etat :</label>
          <input type='text' onChange={handleInputChange} id='etat' name='etat'  value={formData.etat}/>
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
          <label htmlFor='poids'>Poids :</label>
          <input type='number' onChange={handleInputChange}  id='poids' name='poids'  min={0.5} step={0.5} placeholder='15Kg' value={formData.poids}/>
        </FormGroup>
        <FormGroup>
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
  height: 50vh;
  display: flex;
  margin-top : 1.8rem;
  gap: 5rem;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  font-family: 'Playfair Display SC', serif;
  margin-bottom : 6rem;
`

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  justify-items: center;

  .button{
    transform : translateX(-7rem);
  }
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
  font-family: 'Montserrat', sans-serif;
  font-weight: light;
  font-size: 0.8rem;
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

 

`

const Button = styled.button`
margin-top: 10px;

padding: 10px 60px;
background-color: #0077cc;
color: #ffffff;
border: none;
border-radius: 5px;
cursor: pointer;
transform : translateX(15rem);

&:hover {
background-color: #0066b2;
}
`

