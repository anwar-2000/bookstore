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
    <h1 style={{fontSize : '2.5rem' , textAlign : 'center' }}>NOS ARTICLE DIVERS ET RARES</h1>
    <Container>
      {expensiveBooks.map((item: any) => (
        <BookItemSecond
          key={item._id}
          title={item.titre}
          image={item.imageUrl1}
          rating={0}
          prix={item.prix}
          onClick={() => getBookSlugHandler(item.slug)}
        />
      ))}
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

`;
