export async function getServerSideProps(context: { params: { bookId: any } }) {
    const bookId = context.params.bookId;
    const data = await fetchBook(bookId);
    return { props: { data } };
  }
  

  import NavBar from "@/Components/NavBar";
  import { useRouter } from "next/router";
  import React, { useEffect, useState } from "react";
  import styled from "styled-components";
  import { fetchBook } from "@/lib/helpers";
  import { NextPage } from "next";
import { Star } from "lucide-react";

interface Book {
    titre: string;
    auteur: string;
    description: string;
    prix: number;
    image: string;
    status: string;
    date: Date;
    rating: number;
    date_du_livre : string,
    categorie : string
  }

  interface MyPageProps {
    data: Book;
  }
const index: NextPage<MyPageProps> = ({ data }) => {
  //const { bookId } = useSelector((state: any) => state.bookDetail);
  //const { data, isLoading, error } = useQuery(["detail", bookId], () =>
    //fetchBook(bookId)
  //);
  const [date,setDate] = useState<string>('')
    useEffect(()=>{
        const dateString = data.date;
        const date = new Date(dateString);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-4);

        setDate(`${day}-${month}-${year}`)

const formattedDate = `${day}-${month}-${year}`;
    })
  const router = useRouter();

  const handleClickPanier = () => {
    console.log(data)
  };

  const handleClickAchat = () => router.push("/achat");

  return (
    <Section>
      <NavBar />
        <Container className="content">
          <Right>{<img src={data.image} alt={data.titre} />}</Right>
          <Left>
            <div className="infos">
              <h1>{data.titre}</h1>
              <small>
                <span>Auteur :</span> {data.auteur}
              </small>
              <p>
                <span>Description :</span>
                {data.description}
              </p>
              <h6>
                <>
                <span>Date du Livre :</span>
                {date}
                </>
              </h6>
              <h6>
                <span>Prix :</span>
                {data.prix}€
              </h6>
               <div className="rating">
               <Star id="star"/>
                <h6>{data.rating}</h6>
              </div>
            </div>
            <div className="buttons">
              <button onClick={handleClickPanier}>Ajouter au Panier</button>
              <button onClick={handleClickAchat}>Acheter</button>
            </div>
          </Left>
        </Container>
    </Section>
  );
};

export default index;

const Section = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  gap: 2rem;

  /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
    gap: 4rem;
  }

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    gap: 4rem;
    .content {
      transform: translateY(-8rem);
    }
  }

  @media screen and (min-width: 912px) and (max-width: 1024px) {
    gap: 0rem;
    overflow-y: scroll;
    .content {
      transform: translateY(-11rem);
    }
  }
`;

const Container = styled.div`
  margin-top: 4rem;
  height: 80vh;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 4rem;

  /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    flex-direction: column;
  }
`;
const Left = styled.div`
  width: 30rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .rating{
    display: flex;
    align-items: center;
    justify-content: center;

    #star{
        transform: translateY(0rem);
        margin-right: 0.2rem;
    }
  }
  h1 {
    font-size: 4rem;
    font-family: Arial, Helvetica, sans-serif;
  }

  span {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 1.2rem;
  }

  .infos {
    align-items: start;
    justify-content: start;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    button {
      padding: 0.5rem 1rem;
      border-radius: 5px;
      border: solid 1px black;
      margin: 0.5rem;
      font-weight: bold;
      cursor: pointer;

      &:nth-child(1) {
        transition: all ease-in 700ms;

        &:hover {
          border: solid 1px black;
          background: black;
          color: white;
        }
      }

      &:nth-child(2) {
        background-color: yellow;
        border: none;
        transition: all ease-in 700ms;

        &:hover {
          border: solid 1px black;
          background: black;
          color: white;
        }
      }
    }
  }
  /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
    align-items: center;
    justify-content: center;

    & .rating{
    display: flex;
    align-items: center;
    justify-content: center;

    #star{
        transform: translateY(0.5rem);
        margin-right: 0.2rem;
    }
  }
    & .infos {
      justify-content: center;
      align-items: center;

      h1 {
        font-size: 30px;
        margin: 0.6rem 0;
      }

      small {
        margin-bottom: 0.5rem;
        font-size: larger;
      }

      p {
        width: 80%;
        text-align: center;
      }

      h6 {
        margin-top: 0.9rem;
        font-size: 1.5rem;
      }
    }
  }

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    gap: 1rem;
    align-items: center;
    justify-content: start;
  }
`;
const Right = styled.div`
  width: 30rem;
  display: grid;
  place-items: center;
  img {
    width: 650px;
    height: 650px;
    object-fit: contain;
  }

  /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
    & img {
        width: 350px;
         height: 350px;
    }
  }

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    & img {
        width: 450px;
        height: 450px;
    }
  }
`;
const Spiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 25rem;
`;

