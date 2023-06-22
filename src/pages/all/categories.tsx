import { fetchCategories } from "@/lib/helpers";
import { NextPage } from "next";
import React, { useState } from "react";
import styled from "styled-components";
import {useBooksOfCategory } from "@/lib/useBooksOfCategory";
import { useRouter } from "next/router";
import BookItemSecond from "@/Components/ui/BookItemSecond";
import { PuffLoader } from "react-spinners";
import Head from "next/head";
import CategoriesSlider from "@/Components/CategoriesSlider";

interface Categorie {
  categorie: string;
}

interface MyPageProps {
  categories: Categorie[];
}

const Categories: NextPage<MyPageProps> = ({ categories }) => {

  const [searchTerm, setSearchTerm] = useState("");


  const router = useRouter();
  // @ts-ignore
  const [selectedCategorie, setSelectedCategorie] = useState<String>(categories[0]);

  const selectCategoryHandler = (categorie: any) => {
    setSelectedCategorie(categorie);
    //console.log(categorie)
  };
// @ts-ignore
  const { data: books, isLoading } = useBooksOfCategory(selectedCategorie);

  /**
   * 
   * SEARCHING WITH TITLE FOR EACH CATEGORY 
   */
  const filteredBooks = books?.filter((book: any) => { 
    const titre = book.titre;
    return titre && titre.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getBookIdHandler = (id: string) => {
    router.push(`/details/${id}`); //pushing to details page api with the selected items ID
  };

  return (
    <>
      <Head>
        <title>Nos Livres : categories</title>
        <link rel="icon" href="emmaus.jpg" />
        <meta
          name="description"
          content="Tous livres d&apos;EMMAUS Boutique de Chatellerault"
        />
        <meta property="og:title" content="Explorer notre Categories de Livres" />
        <meta property="og:description" content="Du BD vers anciens vers Livres Rares - emmaus vends ses livres a un prix compététif !" />
        <meta property="og:image" content="/emmaus.jpg" />
      </Head>

      
      <Container>
        <div className="categories">
        {<CategoriesSlider categories={categories} onChange={selectCategoryHandler} />}
         
        </div>
        <div className="controls__input">
                <input type="text"
                 placeholder="Rechercher Un Livre..."
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
      {isLoading ? (
        <div className="spinner">
        <Spiner>
          <PuffLoader
            color="yellow"
            size={250}
            aria-label="attendez un moments"
            data-testid="loader"
          />
        </Spiner>
        </div>
      ) : (
        
        <Items>

          {filteredBooks.map(
            (
              book: {
                titre: string;
                imageUrl1: string;
                rating: number;
                slug: string;
                prix: number;
              },
              i: number
            ) => (
              <BookItemSecond
                key={i}
                title={book.titre}
                image={book.imageUrl1}
                rating={book.rating}
                onClick={() => getBookIdHandler(book.slug)}
                prix={book.prix}
              />
            )
          )}
        </Items>
      )} </Container>
    </>
  );
};

export default Categories;

export async function getServerSideProps() {
  const response = await fetchCategories();
  const categories = response.categories;
  //console.log(categories);
  return { props: { categories } };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom : 5rem;
  

  .controls__input{
      input {
        margin-top : 1rem;
        padding : 0.6rem 3rem;
        border-radius : 10px;
        background : none;
        outline : 2px solid black;
      }
    }

  .categories{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap : wrap;
    white-space: nowrap;

    h1{
       font-size: 1rem;
       width: auto;
      cursor: pointer;
      padding: 0.3rem 0.7rem;
      border-radius: 10px;
      color: black;
      transition: all ease 400ms;
      &:hover{
        background-color: #161616;
        color : white;
      }

      &:focus{
        background-color: #161616;
        color : white;
      }
    }
  }
`;
const Items = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding-bottom : 3rem;
  margin : 2.8rem 3rem;
  width : 90%;
 
`;
const Spiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
`;
