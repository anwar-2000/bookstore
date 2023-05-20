'use client'

import BookItemSecond from "@/Components/ui/BookItemSecond";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
interface Props {}

const Favories = () => {
  const router = useRouter()
  const [favories, setFavorie] = useState<[]>([]);
  // const router = useRouter();
  useEffect(() => {
    // This code will only run on the client-side
    let favoriteList = localStorage.getItem('favoriteBooksList');
    if (!favoriteList) {
      localStorage.setItem('favoriteBooksList', JSON.stringify([]));
      favoriteList = '[]';
    }
    setFavorie(JSON.parse(favoriteList));
  }, []);


  //  console.log(favories);
  

  /**
    *  const getBookIdHandler = (id: string) => {
    router.push(`/details/${id}`); //pushing to details page api with the selected items ID
  };
  */

  return (
    <Container>
      <motion.div
        className="FavoriteBooks"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {favories.length === 0 && <div className="empty"><h1>Vous Avez Pas de Favories</h1> <button  onClick={()=> router.push('/all')}>EXPLORER</button></div> }
        {favories.map((book: any, i: number) => (
          <>
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <BookItemSecond
                        key={i}
                        title={book.titre}
                        image={book.image} rating={0} prix={book.prix}/>
            </motion.div>
          </>
        ))}
      </motion.div>
    </Container>
  );
};

export default Favories;

const Container = styled.div`
  margin: 5rem 3rem;
  height: 80vh;
  display : grid;
  place-items : center;
  .FavoriteBooks {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  }
  .empty{
    display : flex;
    flex-direction : column;
    gap : 1rem;

    h1{
      font-size : 50px;
    }
    button {
    padding : 1rem 6rem;
    border-radius : 5px;
    background-color : #1997d1;
    color : white;
  }
  }
`;
