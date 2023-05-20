export async function getServerSideProps(context: GetServerSidePropsContext) {
  let searchValue = context.query.searchValue as string;
  const searchParam = context.query.searchParam as string;
  const page = 1 ;
  const limit = 10;
  searchValue = searchValue.replace("%20", " ");
  
  const [response1, response2] = await Promise.all([
    preparedFetchforInput(searchParam, searchValue),
    fetchBooks(page, limit)]);
 // console.log(response1)
  return { props: { response1,response2 } };
}

import BookItemSecond from "@/Components/ui/BookItemSecond";
import { fetchBooks, preparedFetchforInput } from "@/lib/helpers";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  response1: any;
  response2 : any;
}

const Index: FC<Props> = ({ response1,response2 }) => {
  const router = useRouter();

  const handleClick = (bookId: string) => {
    router.push(`/details/${bookId}`);
  };
  return (
    <>
    <Head>
      <title>EMMAUS NAINTRE</title>
      <link rel="icon" href="./logo.jpg" />
      <meta name="description" content="Rechercher Des livres Rares , Des BD , Livers Anciens --> La boutique des livres Emmaus Chatellerault vend ses livres rares, ses BD, ses livres de poche à un prix compétitif."  />
      <meta name="keywords" content="Livres Rares,livres Anciens,Les BD,Livres Francais,Lives,Rares,Ancien,BD" />
      <meta name="author" content="Emmaus Naintré - Chatellerault" />
      <meta property="og:title" content="Emmaus Naintré - Boutique chatellerault" />
      <meta property="og:description" content="La boutique des livres Emmaus Chatellerault vend ses livres rares, ses BD, ses livres de poche à un prix compétitif." />
    </Head>
      <Container>
        {response1.length === 1 && (
          <div className="oneItem">
            <h1 id="h1">On a trouvé Ce-çi :</h1>
            {response1.length === 1 &&
              response1.map((book: any, i: number) => (
                <BookItemSecond
                  prix = {book.prix}
                  image={book.imageUrl1}
                  key={i}
                  title={book.titre}
                  rating={book.rating}
                  onClick={() => handleClick(book._id)}
                />
              ))}
          </div>
        )}

        {response1.length > 1 && <>
            <h1 id="h1">On a Trouvé Ces Livres : </h1>
          <div className="aLotOfItems">
            {response1.length > 1 &&
              response1.map((book: any, i: number) => (
                <BookItemSecond
                  image={book.imageUrl1}
                  key={i}
                  title={book.titre}
                  rating={book.rating}
                  prix = {book.prix}
                  onClick={() => handleClick(book._id)}
                />
              ))}
          </div>
          </>}

        {response1.length === 0 && <>
          <div className="none">
            {response1.length === 0 && (
              <h1 id="h1">Nous avons pas pû trouver votre recherche ... </h1>
            )}
            <img src="./notFound.png" alt="" />
          </div>
          <Suggestions>
              
              <h4>Cependant, voici quelques autres livres que vous pourriez aimer :</h4>
              <div className="items">
              {response2.length > 1 &&
              response2.map((book: any, i: number) => (
                <BookItemSecond
                  image={book.imageUrl1}
                  key={i}
                  title={book.titre}
                  rating={book.rating}
                  prix = {book.prix}
                  onClick={() => handleClick(book._id)}
                />
              ))}
              </div>
          </Suggestions>
        </>}
      </Container>
    </>
  );
};

export default Index;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  margin-top: 3rem;
  margin-bottom : 3rem;
  #h1 {
    font-size: 1.5rem;
    margin-top: 1rem;
  }
  .oneItem{
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
  .aLotOfItems{
    width: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 0.6rem;
        margin: 2rem 4rem;
        #h1{
        font-size: 3rem;
    }
  }
  .none{
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: center;
    justify-content: center;

    img {
        height: 200px;
        border-radius: 20px;
    }
  }
`;


const Suggestions = styled.div`
  width: 100%;
  margin-top: 5rem;
  margin-left : 2rem;

  h4 {
    font-size: 1.5rem;
    margin-top: 1rem;
    font-family: 'Playfair Display SC', serif;
  }

  .items{
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 1rem;
    flex-wrap: wrap;
  }
`
