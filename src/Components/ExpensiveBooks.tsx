import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import BookItemSecond from "./ui/BookItemSecond";

interface Props {
  expensiveBooks: any;
}

const ExpensiveBooks: React.FC<Props> = ({ expensiveBooks }) => {
  //console.log(expensiveBooks)
  const router = useRouter();
  const getBookSlugHandler = (slug: string) => {
    router.push(`/details/${slug}`); //pushing to details page api with the selected items Slugs
  };

  return <>
    <h1 style={{fontSize : '2.5rem' , alignSelf:"start", textAlign : "start" , paddingLeft : "2rem" , fontFamily : 'Libre Baskerville, serif' , fontWeight : '400' }}>NOS ARTICLES DIVERS ET RARES:</h1>
    <Container>
      {expensiveBooks.map((item: any) => (
        <BookItemSecond
          high_price={item.high_price}
          key={item._id}
          title={item.titre}
          image={item.imageUrl1}
          rating={0}
          prix={item.prix}
          onClick={() => getBookSlugHandler(item.slug)}
        />
      ))}
      <Link href="/all"><button>Voir plus</button></Link>
    </Container>
    </>;
};

export default ExpensiveBooks;

const Container = styled.div`

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap : wrap;
  gap: 1rem;
  button{
    margin-top : 2rem;
    color : white;
    padding : 1rem 4rem;
    background : #334155;
    font-family: "Libre Baskerville", serif;
  font-weight: 400;
  font-style: italic;
    border-radius : 10px;
  }
`;
