import { useState } from "react";
import { TextField, Button , Grid } from "@mui/material";
import styled from "styled-components";
import slugify from "slugify";
import {  toast ,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addVetement } from "@/lib/vetementHelpers";
import { useRouter } from "next/router";
import { addMateriaux } from "@/lib/materiauxHelpers";

interface BookData {
  nom: string;
  description: string;
  price: number;
  poids: number;
  imageUrl1: string;
  imageUrl2: string;
  imageUrl3: string;
  color: string;
  size?: string;
  slug : string
}

interface Props {
  onSubmit: () => void;
  size : boolean;
}

const ProductForm = ({ onSubmit , size }: Props) => {
    const [load, setLoad] = useState(false)



    const [formData, setFormData] = useState<BookData>({
    nom: "",
    description: "",
    price: 0,
    poids: 0,
    imageUrl1: "",
    imageUrl2: "",
    imageUrl3: "",
    color: "",
    size: "",
    slug : ""
  });

  const  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(Object.keys(formData).length === 0) {
      toast.info('Le formulaire est vide !',{
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored"
      });
      return;
    }
    
     if(size){
      const response =  await addVetement(formData);
      if(response){toast.success('Produit Ajouté',{
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored"
      });}
      setLoad(!load)
      onSubmit();
      return ;
     }
      const response =  await addMateriaux(formData);
      if(response){toast.success('Produit Ajouté',{
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored"
      });}
      setLoad(!load)
      onSubmit()      
    
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.name === "nom") {
      const slug = slugify(event.target.value, { lower: true });
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
        slug: slug,
      });
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nom"
              name="nom"
              value={formData.nom}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Prix"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Poids"
              name="poids"
              type="number"
              value={formData.poids}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Image URL 1"
              name="imageUrl1"
              value={formData.imageUrl1}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Image URL 2"
              name="imageUrl2"
              value={formData.imageUrl2}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Image URL 3"
              name="imageUrl3"
              value={formData.imageUrl3}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Couleur"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          { size && <Grid item xs={12} sm={6}>
            <TextField
              label="Taille"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Container>
  );
};

export default ProductForm;

const Container = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
 
  gap: 5rem;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  font-family: "Playfair Display SC", serif;
  margin-bottom: 14rem;
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  justify-items: center;

  .button {
    transform: translateX(9.5rem);
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;

  label {
    margin-right: 10px;
    margin-bottom: 5px;
    font-family: "Montserrat", sans-serif;
    font-weight: light;
    font-size: 0.8rem;
  }

  input,
  textarea {
    background: white;
  }

  input[type="text"],
  input[type="number"],
  input[type="radio"],
  input[type="date"],
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

  input[type="text"]:focus,
  input[type="number"]:focus,
  input[type="radio"]:focus,
  textarea:focus,
  input[type="date"]:focus {
    border-color: #4c7cff;
  }
`;


