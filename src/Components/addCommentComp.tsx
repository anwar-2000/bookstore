import { addBook, addCommentToBook } from '@/lib/helpers'
import React, { FC, useReducer, useState} from 'react'
import styled from 'styled-components'
import {  toast ,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Props {
  onAdd : () => void // to then refetch()
  slug : string;
}



const AddCommentComp: FC<Props> = ({ onAdd, slug }) => {
    const [username, setUsername] = useState<string>('');
    const [comment, setComment] = useState<string>('');
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!username || !comment) {
        return <h1>Form is incomplete</h1>;
      }
  
      const formData = {
        username: username,
        comment: comment,
        slug: slug,
      };
  
      const response = await addCommentToBook(formData);
      if (response) {
        toast.success('Commentaire Ajouté', {
          position: toast.POSITION.TOP_RIGHT,
          theme: 'colored',
        });
      }
      onAdd();
    };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor='username'>Nom:</label>
          <input type='text' onChange={(e) => setUsername(e.target.value)} id='username' name='username' />
          <label htmlFor='comment'>Commentaire</label>
          <input type="text" id='comment' name='comment' onChange={(e) => setComment(e.target.value)} />
          <div className='button'>
         <Button type='submit'>Ajouter</Button>
       </div>
        </FormGroup>
      </Form>
    </Container>
  )
}

export default AddCommentComp

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Playfair Display SC', serif;
  margin-left :15rem;
  @media screen and (min-width: 912px) and (max-width: 1024px) {
    transform : translateY(-9rem);
  }

  /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
      margin-left : 5rem;
  }
`;

const Form = styled.form`
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-items: center;

`;

const FormGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;

  /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
    flex-direction : column;
  }

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    flex-direction : column;
    
  }

  @media screen and (min-width: 912px) and (max-width: 1024px) {
    flex-direction : row;
  }

  label {
    margin-right: 10px;
    margin-bottom: 5px;
  }

  input[type='text'],
  textarea {
    background: white;
  }

  input[type='text'],
  textarea {
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

  input[type='text']:focus,
  textarea:focus {
    border-color: #4c7cff;
  }

  textarea {
    height: 200px;
  }
`;

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
`;