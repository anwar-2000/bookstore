import NavBar from '@/Components/NavBar';
import { fetchCategories, preparedFetchforInput } from '@/lib/helpers'
import { NextPage } from 'next';
import React, { useState } from 'react'
import styled from 'styled-components';
import {fetchBooksOfCat} from "@/lib/utils"
import { useRouter } from 'next/router';
import BookItemSecond from '@/Components/ui/BookItemSecond';
import { ClipLoader } from 'react-spinners';

interface Categorie {
    categorie : string
  }

  interface MyPageProps {
    categories: Categorie[];
    
  }

const categories:NextPage<MyPageProps>= ({categories}) => {
  const router = useRouter()
  const [selectedCategorie, setSelectedCategorie] = useState(categories[0]);

  const selectCategoryHandler = (categorie : any) =>{
    setSelectedCategorie(categorie);
    //console.log(categorie)
}
  const { data: books, isLoading } = fetchBooksOfCat(selectedCategorie);

  /** testing */ //it worked 
  //useEffect(()=>{setSelectedCategorie('Fiction')},[selectedCategorie])
  //
  const getBookIdHandler = (id : string) =>{
    router.push(`/details/${id}`); //pushing to details page api with the selected items ID
}

 

      return <>
           <Container>
            {categories.map((categoryy,i:number)=>(<h1 key={i} onClick={()=>selectCategoryHandler(categoryy)}>{categoryy}</h1>))}</Container>
    { isLoading ? <Spiner>
      <ClipLoader
        color='blue'
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></Spiner> : <Items>
{books.map((book: { titre: string; image: string; rating: number; _id: string; },i : number) => (
                    <BookItemSecond key={i} title={book.titre} image={book.image} rating={book.rating} onClick={()=>getBookIdHandler(book._id)}/>
           ))}
           </Items>}
      </>
}

export default categories

export async function getServerSideProps() {

    const response = await fetchCategories();
    const categories = response.categories;
    console.log(categories)
    return { props: { categories} };}


    const Container = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 2.5rem;

      h1 {
        font-size: 1.5rem;
        margin: 0 2rem;
      }
    `
    const Items = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      margin-top: 2.5rem;
    `
  const Spiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 25rem;
`

