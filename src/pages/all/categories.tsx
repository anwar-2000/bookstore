import { fetchCategories } from "@/lib/helpers";
import { NextPage } from "next";
import React, { useState } from "react";
import styled from "styled-components";
import {useBooksOfCategory } from "@/lib/useBooksOfCategory";
import { useRouter } from "next/router";
import BookItemSecond from "@/Components/ui/BookItemSecond";
import { ClipLoader } from "react-spinners";
import Head from "next/head";

interface Categorie {
  categorie: string;
}

interface MyPageProps {
  categories: Categorie[];
}

const Categories: NextPage<MyPageProps> = ({ categories }) => {
  const router = useRouter();
  // @ts-ignore
  const [selectedCategorie, setSelectedCategorie] = useState<String>(categories[0]);

  const selectCategoryHandler = (categorie: any) => {
    setSelectedCategorie(categorie);
    //console.log(categorie)
  };
// @ts-ignore
  const { data: books, isLoading } = useBooksOfCategory(selectedCategorie);

  /** testing */ //it worked
  //useEffect(()=>{setSelectedCategorie('Fiction')},[selectedCategorie])
  //
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
          content="Tous livres EMMAUS Boutique de Chatellerault"
        />
        <meta property="og:title" content="Nos Livres : Explore" />
        <meta property="og:description" content="This is my page description" />
        <meta property="og:image" content="/my-page-image.jpg" />
      </Head>

      
      <Container>
        <div className="categories">
          {categories.map((categoryy, i: number) => (
            <h1 key={i} onClick={() => selectCategoryHandler(categoryy)}>
              {/* @ts-ignore */}
                {categoryy}
            </h1>
          ))}
        </div>
      </Container>
      {isLoading ? (
        <div className="spinner">
        <Spiner>
          <ClipLoader
            color="blue"
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </Spiner>
        </div>
      ) : (
        <Items>
          {books.map(
            (
              book: {
                titre: string;
                image: string;
                rating: number;
                _id: string;
                prix: number;
              },
              i: number
            ) => (
              <BookItemSecond
                key={i}
                title={book.titre}
                image={book.image}
                rating={book.rating}
                onClick={() => getBookIdHandler(book._id)}
                prix={book.prix}
              />
            )
          )}
        </Items>
      )}
    </>
  );
};

export default Categories;

export async function getServerSideProps() {
  const response = await fetchCategories();
  const categories = response.categories;
  console.log(categories);
  return { props: { categories } };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    
  }

  .categories{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap : wrap;
    white-space: nowrap;
    margin-top : 0.5rem;

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
  margin-top: 2.5rem;
`;
const Spiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
`;
