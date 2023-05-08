import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const bookId = context.params?.bookId as string
  const data = await fetchBook(bookId)
    //console.log("the author of the  book : " , data.auteur)
  const session = await getSession(context)
  //console.log("the session is " ,session)

  return { props: { data , session} }
}
  

 import React, { useEffect, useState } from "react";
  import styled from "styled-components";
  import { fetchBook } from "@/lib/helpers";
  import { NextPage } from "next";
import { Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { AddToCart, calculateTotal} from "@/redux/reducers/Cart";
import getStripe from "@/lib/getStripe";
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import SwiperComponent from '@/Components/ui/Swiper'


interface Book {
    titre: string;
    auteur: string;
    description: string;
    etat : string;
    prix: number;
    imageUrl1: string;
    imageUrl2 : string;
    imageUrl3 : string;
    status: string;
    date: Date;
    rating: number;
    date_du_livre : string,
    categorie : string
  }

  interface MyPageProps {
    data: Book;
    session : any
  }
const Index: NextPage<MyPageProps> = ({ data , session }) => {
 
    const dispatch = useDispatch();
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

    },[data.date]);
    //console.log(data.imageUrl1 , data.imageUrl2 , data.imageUrl3)
 
  let book = {
    titre : data.titre,
    prix : data.prix,
    image : data.imageUrl1,
    quantite : 1
   }
  const handleClickPanier = () => {
   
     //console.log( book)
     dispatch(AddToCart(book))
     dispatch(calculateTotal())

     toast.success(`Le Livre ${book.titre} est dans votre Panier`,{
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored"
    });
  };

  const handleClickAchat = async () => {
    const stripe = await getStripe();
    //console.log("FOR STRIPE : ",cart)
    const response = await fetch("/api/stripe", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([book])
    });
    if (!response.ok) {
      const error = await response.text();
      console.error(error);
      return;
    }
    // if error just exit function
    if ((response as any).statusCode === 500) {
      console.error((response as any).message);
      return;
    }

    const data = await response.json();
    /** TO DO : ADD REDIRECT STATE && message  */

    stripe?.redirectToCheckout({ sessionId: data.id });
  };

 


  return (
    <Section>
        <Container className="content">
          <Right>
            <SwiperComponent imageUrl1={data.imageUrl1} imageUrl2={data.imageUrl2} imageUrl3={data.imageUrl3}/>
            </Right>
          <Left>
            <div className="infos">
              <h1>{data.titre}</h1>
              <small>
                <span>Auteur :</span> {data.auteur}
              </small>
              <details>
                <summary>Description :</summary>
               <p>{data.description}</p>
              </details>
              <details>
                <summary>Etat :</summary>
               <p>{data.etat}</p>
              </details>
              <h6>
                <>
                <span>Edité Le :</span>
                {date}
                </>
              </h6>
              <h6>
                <span>Prix :</span>
                {data.prix}€
              </h6>
               <div className="rating">
               <Star id="star" fill="yellow" color="yellow"/>
                <h6>{data.rating}</h6>
              </div>
            </div>
            <div className="buttons">
              <button onClick={handleClickPanier}>Ajouter au Panier</button>
              <button onClick={handleClickAchat}>Commander maintenant</button>
              <button style={{cursor : 'not-allowed'}}>Négocier Le Prix</button>
            </div>
          </Left>
        </Container>
    </Section>
  );
};

export default Index;

const Section = styled.section`
 
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;
  
  gap: 2rem;
 

 

  /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
    gap: 4rem;
    margin-top : 3rem;
    padding-bottom : 28rem;
  }

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    gap: 4rem;
    padding-bottom : 28rem;
    .content {
      transform: translateY(-8rem);
    }
  }

  @media screen and (min-width: 912px) and (max-width: 1024px) {
    padding-bottom : 28rem;
    gap: 0rem;
    .content {
      transform: translateY(-11rem);
    }
  }
`;
const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-top : 2rem;
  margin-bottom : 3rem;
  gap: 4rem;

  /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
    flex-direction: column;
    //margin-top : 9rem;
  }

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    flex-direction: column;
  }
`;
const Left = styled.div`
  width: 30rem;
  height : 100%;
  display: flex;
  flex-direction: column;
  align-items : center;
  justify-content : center;
  gap: 2rem;
  padding-bottom : 3rem;

  /* Hide the details element content by default */
  details {
    overflow: hidden;
  }
  
  
  /* Style the summary element */
  summary {
    cursor: pointer;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  /* Change the icon when the details element is open */
  details[open] summary::before {
    content: "-";
  }
  
  /* Change the icon when the details element is closed */
  details:not([open]) summary::before {
    content: "+";
  }
  
  /* Style the details element content */
  details[open]  p {
    margin: 0;
    padding: 0.5rem 0;
    /* styles for screens smaller than 768px */
   @media screen and (max-width: 767px) {
      width : 250px;
      text-align : center;
  }
  }
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
    font-size: 2.5rem;
    font-family: 'Shadows Into Light';
    
  }

  span {
    font-weight: bold;
    font-size: 1.2rem;
    font-family: 'Shadows Into Light';
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
    
    align-items : center;
    justify-content : center;
    gap: 1rem;
    button {
      padding: 0.5rem 1rem;
      border-radius: 5px;
      border: solid 1px black;
      margin: 0.5rem;
      font-weight: bold;
      cursor: pointer;

      &:nth-child(1) {
        transition: all ease-in 200ms;
        background: black;
        color: white;
      }

      &:nth-child(2) {
        background-color: yellow;
        border: none;
        transition: all ease-in 700ms;
        color : black;
      }
    }
    /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
      & {
        flex-wrap : wrap;
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
  & .buttons {
      margin : 0 5rem !important;
    }
    
    & .infos {
      justify-content: center;
      align-items: center;

      h1 {
        font-size: 30px;
        margin: 0.6rem 2rem;
        text-align : center;
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
    width: 450px;
    height: 450px;
    object-fit: contain;
  }

  /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
    padding-top : 25rem;
    & img {
         width: 250px;
         height: 450px;
         margin-top : 2rem;
    }

  }

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    padding-top : 50rem;
    & img {
        width: 450px;
        height: 450px;
    }
  }
`;

