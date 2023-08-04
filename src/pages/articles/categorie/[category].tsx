import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import BookItemSecond from '@/Components/ui/BookItemSecond';
import LoadingCards from '@/Components/ui/LoadingCards';
import ProductsItem from '@/Components/ui/ProductsItem';
import { fetchBooksOfCategory } from '@/lib/helpers';
import { fetchMateriaux } from '@/lib/materiauxHelpers';
import { fetchVetements } from '@/lib/vetementHelpers';
import { useQuery } from 'react-query';
import Head from 'next/head';
import { fetchMusics } from '@/lib/MusicHelpers';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const category = router.query.category as string;

  let url = '/details';
  let fetchData: () => Promise<any[]> = async () => [];

  if (category === 'Vetements') {
    fetchData = fetchVetements;
    url = '/articles/details/vetements';
  } else if (category === 'Cuirs') {
    fetchData = fetchMateriaux;
    url = '/articles/details/materiaux';
  }else if (category === 'Musiques') {
    fetchData = fetchMusics;
    url = '/articles/details/musiques';
  } else {
    fetchData = () => fetchBooksOfCategory(category);
  }

  const { data, isLoading } = useQuery(
    ['data', category],
    fetchData,
    {
      staleTime: 60 * 60 * 1000, // cache expires in 1 hour
    }
  );
  const ItemCard = category === 'Vetements' || category === 'Cuirs' || category === "Musiques";

  const getBookSlugHandler = (slug: string) => {
    router.push(`${url}/${slug}`); //pushing to details page api with the selected items SLUG
  };
  let titre = '';
  const filteredProdcuts =
    data?.filter((produit: any) => {
      titre = produit.nom;
      if (!ItemCard) titre = produit.titre;
      return (
        titre && titre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }) || [];

  return <>

    <Head>
      <title>Emmaus Boutique - {category}</title>
      <link rel="icon" href="/logo.jpg" />
      <meta name="description" content="La boutique des livres Emmaus Chatellerault vend ses livres rares, ses BD, ses livres de poche à un prix compétitif."  />
      <meta name="keywords" content="Livres Rares,livres Anciens,Les BD,Livres Francais,Lives,Rares,Ancien,BD" />
      <meta property="og:title" content="Emmaus- Boutique chatellerault" />
    </Head>



    <div className="min-h-screen text-center">
      {data?.length === 0 ? (
        <h1 className='text-2xl'>0 Articles Pour L&apos;instant</h1>
      ) : (
        <Container>
          {!isLoading && (
            <div>
              <div className="controls__input">
                <h2>Rechercher Par Nom : </h2>
                <input
                  type="text"
                  placeholder="Rechercher ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          )}

          {isLoading && <LoadingCards />}
          <div className="items">
            {!isLoading &&
              !ItemCard &&
              filteredProdcuts.map((item: any, i: number) => (
                <BookItemSecond
                  key={i}
                  title={item.titre}
                  image={item.imageUrl1}
                  rating={0}
                  onClick={() => getBookSlugHandler(item.slug)}
                  prix={item.prix}
                />
              ))}

            {!isLoading &&
              ItemCard &&
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
              ))}
          </div>
        </Container>
      )}
    </div>
  ;
</>;
}
export default Index;

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
         width : 90vw;
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