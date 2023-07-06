import React, { useReducer, useState } from "react";
import { Button, TextField } from "@mui/material";
import { addactualite } from "@/lib/actualiteHelpers";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
import slugify from "slugify";


const formReducer = (state: Object, e: any) => {
    if (e.target.name === 'nom') {
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


const ActualiteForm = () => {
  const [formData,setFormData] = useReducer(formReducer,{}) 

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try {
        const response = await addactualite(formData)
        if (response) {
            toast.success('Actualité Ajouté', {
              position: toast.POSITION.TOP_RIGHT,
              theme: 'colored',
            });
          }
      // handle successful form submission here
    } catch (error) {
      // handle error here
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        label="Nom"
        name="nom"
        //@ts-ignore
        value={formData.nom}
        onChange={setFormData}
      />
      <TextField
        label="Description"
        name="description"
        //@ts-ignore
        value={formData.description}
        onChange={setFormData}
      />
      <TextField
        label="Image URL"
        name="imageUrl1"
        //@ts-ignore
        value={formData.imageUrl1}
        onChange={setFormData}
      />
      <TextField
        label="Date de l'événement"
        name="date_event"
        type="date"
        //@ts-ignore
        value={formData.date_event}
        onChange={setFormData}
      />
      <Button type="submit" variant="contained">Submit</Button>
    </Form>
  );
};

export default ActualiteForm;

const Form = styled.form`
        width : 80vw;
        display : flex;
        align-items:center;
        justify-content : center;
        gap : 0.8rem;
`
