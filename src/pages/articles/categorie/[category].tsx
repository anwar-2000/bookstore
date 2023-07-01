export async function getServerSideProps(context : GetServerSidePropsContext) {
   const category = context.params?.category as string;
   let url = "/details"
  // Use the parameter in your logic or fetch data based on the parameter
  let data = []
  if (category === 'Vetements') {
    data = await fetchVetements();
    url = "/articles/details/vetements"
  }else if(category === 'Cuirs'){
   data = await fetchMateriaux()
   url = "/articles/details/materiaux"
  }else {
     data = await fetchBooksOfCategory(category)
  }

  // Pass the fetched data as props to the component
  return {
    props: {
      data, url , category
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
  
    const [loading, setloading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(()=>setloading(false),2000)

      return ()=> clearTimeout(timer)
    }, [category])
    
    const router = useRouter()
    
    
    const ItemCard = category !== "Vetement" && category !== "Materiaux" ;

    const getBookSlugHandler = (slug: string) => {
        router.push(`${url}/${slug}`); //pushing to details page api with the selected items SLUG
      };


  return <Container>
        {loading && <LoadingCards />}

        {data && !loading && !ItemCard ? (
            data.map((item : any , i : number)=>(
                <BookItemSecond
                key={i}
                title={item.nom}
                image={item.imageUrl1}
                rating={0}
                onClick={() => getBookSlugHandler(item.slug)}
                prix={item.price}
              />
            ))
        ) : !loading && (
          data.map((item : any , i : number)=>(
            <ProductsItem key={i} title={item.nom}  onClick={() => getBookSlugHandler(item.slug)} image={item.imageUrl1} color={item.color} prix={item.price} size={item.size}  />
        ))
        )}
  </Container>
}

export default Index

const Container = styled.div`
    min-height : 100vh;
    display : flex;
    align-items : start;
    justify-content : center;
    gap : 2rem;
    flex-wrap : wrap;
    width : 100vw;
`