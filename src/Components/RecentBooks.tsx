import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'
import BookItem from '@/Components/ui/BookItem'

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: start;
    justify-content: center;
    gap: 5rem;

    margin-top: 5rem;
`

type BookType = {
  titre: string;
  auteur: string;
  prix: number;
  quantite: number;
  image_url: string;
}

const RecentBooks = () => {
  console.log("i am being rendered ...")
  return <>
      <h1 className='text-center text-4xl'>LES NOUVEAUX LIVRES </h1>
      <Container>
        <BookItem key="1" titre="Harry Potter 2" auteur="JK Rowling" prix={19} quantite={3} imageUrl="https://3.bp.blogspot.com/-b4tggdxOD9U/Uk7SdMckW2I/AAAAAAAAACY/t8WqMOdJUgM/s1600/harry2+cover.jpg" showButtons={false} />
        <BookItem key="2" titre="Harry Potter 2" auteur="JK Rowling" prix={19} quantite={3} imageUrl="https://3.bp.blogspot.com/-b4tggdxOD9U/Uk7SdMckW2I/AAAAAAAAACY/t8WqMOdJUgM/s1600/harry2+cover.jpg" showButtons={false}  />
        <BookItem key="3" titre="Harry Potter 2" auteur="JK Rowling" prix={19} quantite={3} imageUrl="https://3.bp.blogspot.com/-b4tggdxOD9U/Uk7SdMckW2I/AAAAAAAAACY/t8WqMOdJUgM/s1600/harry2+cover.jpg" showButtons={false} />
      </Container>
    </>
}

export default RecentBooks