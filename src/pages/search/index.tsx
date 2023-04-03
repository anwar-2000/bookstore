export async function getServerSideProps(context: GetServerSidePropsContext) {
  let searchValue = context.query.searchValue as string;
  const searchParam = context.query.searchParam as string;
  searchValue = searchValue.replace("%20", " ");
  console.log(
    "getserversideprops params" + " " + searchParam + " " + searchValue
  );
  const response = await preparedFetchforInput(searchParam, searchValue);
  //console.log(response)
  return { props: { response } };
}

import NavBar from "@/Components/NavBar";
import BookItemSecond from "@/Components/ui/BookItemSecond";
import { preparedFetchforInput } from "@/lib/helpers";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  response: any;
}

const index: FC<Props> = ({ response }) => {
  const router = useRouter();

  const handleClick = (bookId: string) => {
    router.push(`/details/${bookId}`);
  };
  return (
    <>
      <Container>
        {response.length === 1 && (
          <div className="oneItem">
            <h1 id="h1">On a trouvé Ce-çi :</h1>
            {response.length === 1 &&
              response.map((book: any, i: number) => (
                <BookItemSecond
                  image={book.image}
                  key={i}
                  title={book.titre}
                  rating={book.rating}
                  onClick={() => handleClick(book._id)}
                />
              ))}
          </div>
        )}

        {response.length > 1 && <>
            <h1 id="h1">On a Trouvé Ces Livres : </h1>
          <div className="aLotOfItems">
            {response.length > 1 &&
              response.map((book: any, i: number) => (
                <BookItemSecond
                  image={book.image}
                  key={i}
                  title={book.titre}
                  rating={book.rating}
                  onClick={() => handleClick(book._id)}
                />
              ))}
          </div>
          </>}

        {response.length === 0 && (
          <div className="none">
            {response.length === 0 && (
              <h1 id="h1">Nous avons pas pû trouver votre recherche ... </h1>
            )}
            <img src="./notFound.png" alt="" />
          </div>
        )}
      </Container>
    </>
  );
};

export default index;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  #h1 {
    font-size: 3rem;
    margin-top: 5rem;
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
        height: 450px;
    }
  }
`;
