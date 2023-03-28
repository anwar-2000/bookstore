import { fetchCategories } from '@/lib/helpers'
import { NextPage } from 'next';
import React from 'react'


interface Categorie {
    categorie : string
  }

  interface MyPageProps {
    data: Categorie[];
  }

const categories:NextPage<MyPageProps>= ({data}) => {
  return <div>{data.map((categorie:Categorie,i:number)=>(<h1 key={i}>{categorie.categorie}</h1>))}</div>
}

export default categories

export async function getServerSideProps() {
    const data = await fetchCategories();
    return { props: { data } };
  }