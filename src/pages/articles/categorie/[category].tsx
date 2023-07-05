
let cachedData: Record<string, any> = {};
let cacheExpirationTime: Record<string, number> = {};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const category = context.params?.category as string;
  let url = '/details';
  let data = [];

  const now = Date.now();
  if (
    !cachedData[category] ||
    !cacheExpirationTime[category] ||
    now > cacheExpirationTime[category]
  ) {
    if (category === 'Vetements') {
      data = await fetchVetements();
      url = '/articles/details/vetements';
    } else if (category === 'Cuirs') {
      data = await fetchMateriaux();
      url = '/articles/details/materiaux';
    } else {
      data = await fetchBooksOfCategory(category);
    }

    cachedData[category] = data;
    cacheExpirationTime[category] = now + 60 * 60 * 1000; // cache expires in 1 hour
  } else {
    data = cachedData[category];
  }

  return {
    props: {
      data,
      url,
      category,
    },
  };
}

import BookItemSecond from '@/Components/ui/BookItemSecond'
import LoadingCards from '@/Components/ui/LoadingCards';
import ProductsItem from '@/Components/ui/ProductsItem';
import { fetchBooksOfCategory } from '@/lib/helpers'
import { fetchMateriaux } from '@/lib/materiauxHelpers'
import { fetchVetements } from '@/lib/vetementHelpers'
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router'
import React, {useEffect, useState } from 'react'
import styled from 'styled-components';


const Index = ({data , url , category } : {data : [] , url : string , category : string}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setloading] = useState(true);

    const ItemCard = category === "Vetements" || category === "Cuirs" ;


    useEffect(() => {
      const timer = setTimeout(()=>setloading(false),2000)

      return ()=> clearTimeout(timer)
    }, [category , ItemCard])
    
    const router = useRouter()
    

    const getBookSlugHandler = (slug: string) => {
        router.push(`${url}/${slug}`); //pushing to details page api with the selected items SLUG
      };
      let titre = "";
      const filteredProdcuts = data?.filter((produit: any) => { 
        titre = produit.nom;
        if(!ItemCard) titre = produit.titre;
        return titre && titre.toLowerCase().includes(searchTerm.toLowerCase());
      });


  return( 
    <div className='min-h-96 text-center'>
    { data.length === 0 ? <h1>0 Articles Pour L&apos;instant</h1> : <Container>
    { !loading && <div>
    <div className="controls__input">
      <h2>Rechercher Par Nom : </h2>
    <input type="text"
     placeholder="Rechercher ..."
     value={searchTerm}
     onChange={(e) => setSearchTerm(e.target.value)} />
  </div>
    </div>}

  {loading && <LoadingCards />}
  <div className='items'>
  { filteredProdcuts && !loading && !ItemCard &&  filteredProdcuts.map((item: any, i: number) => (
      <BookItemSecond
        key={i}
        title={item.titre}
        image={item.imageUrl1}
        rating={0}
        onClick={() => getBookSlugHandler(item.slug)}
        prix={item.prix}
      />
    ))}

{ !loading && ItemCard && (
    filteredProdcuts.map((item: any, i: number) => (
      <ProductsItem
        key={i}
        title={item.nom}
        onClick={() => getBookSlugHandler(item.slug)}
        image={item.imageUrl1}
        color={item.color}
        prix={item.price}
        size={item.size}
      />
    ))
  )}

  </div>

 
</Container>}
</div>)
}

export default Index

const Container = styled.div`
    margin-top : 2rem;
    min-height : 100vh;
    display : flex;
    align-items : center;
    justify-content : start;
    flex-direction : column;
    gap : 2rem;
    flex-wrap : wrap;
    width : 100vw;
      .items{
        display : flex;
           align-items : center;
         justify-content : center;
     
    gap : 2rem;
    flex-wrap : wrap;
      }
    .controls__input{

      h2{
        font-weight : 700;
        font-family: 'Montserrat', sans-serif;
      }
      display : flex;
      flex-wrap : wrap;
      align-items : center;
      justify-content : center;
      gap : 1.5rem;
      input {
        
        padding : 0.6rem 3rem;
        padding-left : 0.5rem;
        border-radius : 10px;
        background : none;
        outline : 2px solid black;
      }
    }
`