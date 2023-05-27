import { addFund } from '@/lib/helpers'
import React, { FC, useReducer} from 'react'
import styled from 'styled-components'
import {  toast ,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';




const formReducer = (state : Object, e : any) =>{
  return {
    ...state ,
    [e.target.name]:e.target.value //for every input  , its name = event.target.itsValue
  }
}

export default function  Index () {
    const [formData,setFormData] = useReducer(formReducer,{}) 

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    if(Object.keys(formData).length == 0) {
        return <h1>form empty</h1>
    }
      //console.log(formData);
      const response =  await addFund(formData);
      if(response) {toast.success('Merci Pour votre Don , Veuillez attendre notre réponse !',{
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored"
      });} else if(response.error) {
        {toast.error(`Erreur , ${response.error}`,{
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored"});
      }}}
    return <>
    <Head>
      <title>EMMAUS NAINTRE</title>
      <link rel="icon" href="./logo.jpg" />
      <meta name="description" content="Donner Des Livres a La boutique des livres Emmaus Chatellerault , on vend ses livres rares, ses BD, ses livres de poche à un prix symbolique."  />
      <meta name="keywords" content="Livres Rares,livres Anciens,Les BD,Livres Francais,Lives,Rares,Ancien,BD" />
      <meta name="author" content="Emmaus Naintré - Chatellerault" />
      <meta property="og:title" content="Emmaus Naintré - Boutique chatellerault" />
      <meta property="og:description" content="La boutique des livres Emmaus Chatellerault vend ses livres rares, ses BD, ses livres de poche à un prix compétitif." />
    </Head>
        <Container>
          <h1 >Emmaüs vous remercie !</h1>
      <Form onSubmit={handleSubmit}>
        <div className='divs' >
        <FormGroup>
          <label htmlFor='nom'>Nom:</label>
          <input type='text' onChange={setFormData} id='nom' name='nom' />
        </FormGroup>
        <FormGroup>
          <label htmlFor='Prénom'>Prénom:</label>
          <input type='text'   id='Prénom' name='prenom' onChange={setFormData} />
        </FormGroup>
        </div>
        <div className='divs' >
        <FormGroup>
          <label htmlFor='Addresse'>Adresse:</label>
          <input type='text' onChange={setFormData} id='Addresse' name='addresse'/>
        </FormGroup>
        <FormGroup>
          <label htmlFor='Numero'>Numéro  Tel :</label>
          <input type='text' onChange={setFormData} id='Numéro' name='numero' />
        </FormGroup>
        </div>
        <div  className='divs' >
        <FormGroup>
          <label htmlFor='dons'>Dons</label>
          <textarea onChange={setFormData} id='dons' name='dons' placeholder='On va vous donner ça et ça ...' />
        </FormGroup>
        <FormGroup>
          <label htmlFor='email'>Email:</label>
          <input type='email'  onChange={setFormData} id='email' name='email' />
        </FormGroup>
        </div>
        
       <div className='button'>
       <Button type='submit'>Ajouter</Button>
       </div>
      </Form>
    </Container>
    </>
};


const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  margin-top : 1.8rem;
  margin-bottom : 5rem;
  gap: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Playfair Display SC', serif;

  h1 {
    font-family: 'Playfair Display SC', serif;
    font-size : 3rem;
    color : black;
    font-weight : bold;

     /* styles for screens smaller than 768px */
     @media screen and (max-width: 767px) {
      font-size : 1.5rem;
    }
  }
`

const Form = styled.form`
  display: flex;
  align-items : center;
  flex-direction : column;
  gap: 2rem;
  justify-items: center;
  flex-wrap : wrap;
  margin-left : 1rem;

  .divs{
    display : flex ; 
    gap : 1rem;
  }

`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content : center;
  margin-bottom: 10px;
  width: 100%;

  label {
    margin-right: 10px;
    margin-bottom: 5px;
  }

  input , textarea  {
    background : white;
 
  }

  input[type='text'], input[type='number'], input[type='email'],input[type='radio'],input[type='date'] , textarea{
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