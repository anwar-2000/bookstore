import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const bookId = context.params?.bookId as string;
  
  // Fetch book and views in parallel using Promise.all
  const [book, views] = await Promise.all([
    fetchBook(bookId),
    fetchViews(bookId)
  ]);

  const data = book; // Assuming `fetchBook` returns the book data

  const session = await getSession(context);

  return {
    props: { data, session, bookId, views }
  };
}
  

 import React, { useEffect, useState } from "react";
  import styled from "styled-components";
  import { addViewerToBook, fetchBook, fetchComments, fetchViews } from "@/lib/helpers";
  import { NextPage } from "next";
import { Eye, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { AddToCart, calculateTotal} from "@/redux/reducers/Cart";
import getStripe from "@/lib/getStripe";
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import SwiperComponent from '@/Components/ui/Swiper'
import Head from 'next/head'
import Comments from '@/Components/Comments'
import AddCommentComp from '@/Components/addCommentComp'

import {BsStripe} from 'react-icons/bs'
import Link from 'next/link';


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
    poids : number;
    date_du_livre : string,
    categorie : string
  }

  interface MyPageProps {
    data: Book;
    session : any;
    bookId : string;
    views : number
  }
const Index: NextPage<MyPageProps> = ({ data , session , bookId , views }) => {
/**
 * 
 * fetching for comments based on if the user clicked or not
 */
  const [comments, setComments] = useState([]);
  const [toggleComments,setToggleComments]=useState<boolean>(false)

/** //////////// for the free shipping ////////////*/

const [isChecked, setIsChecked] = useState(false);

  const handleFetchComments = async () => {
    try {
      const commentsData = await fetchComments(bookId); 
      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  setToggleComments(true)
  };

  function refetch(){
    handleFetchComments()
  }
    


    const dispatch = useDispatch();
    //console.log("***************" ,bookId)


  const [date,setDate] = useState<string>('')
  /**
   * 
   * FORMATTING THE DATE
   */
    useEffect(()=>{
        const dateString = data.date;
        const date = new Date(dateString);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-4);

        setDate(`${day}-${month}-${year}`)

    },[data.date]);

    /**
     * 
     * ADD VIEWER COUNT TO BOOK -- DONE
     */
    useEffect(()=>{
      addViewerToBook(bookId)
    },[]);

    /**
     * 
     * 
     * i'll fix the bug when can order a book even if its sold out -- FIXED
     */
    
  let book = {
    titre : data.titre,
    prix : data.prix,
    image : data.imageUrl1,
    poids : data?.poids,
    quantite : 1,
    isChecked : isChecked
   }



  const handleCheckboxChange = (event:any) => {
    setIsChecked(event.target.checked);
  };
   
  const handleClickPanier = () => {
   
     //console.log( book)
     dispatch(AddToCart(book))
     dispatch(calculateTotal())

     toast.success(`Le Livre ${book.titre} est dans votre Panier`,{
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored"
    });
  };
  const cart = [book]
  const handleClickAchatStripe = async () => {
   // console.log(cart);
    const stripe = await getStripe();

    //console.log("FOR STRIPE : ",cart)
  
    const response = await fetch("/api/stripe", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({cart,isChecked})
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

 


  return <>
    <Head>
      <title>{data.titre} - Emmaus </title>
      <link rel="icon" href={data.imageUrl1} />
      <meta name="description" content="La boutique des livres Emmaus Chatellerault vend ses livres rares, ses BD, ses livres de poche à un prix compétitif."  />
      <meta name="keywords" content="Livres Rares,livres Anciens,Les BD,Livres Francais,Lives,Rares,Ancien,BD" />
      <meta name="author" content={data.auteur} />
      <meta property="og:title" content="Emmaus- Boutique chatellerault" />
      <meta property="og:description" content={data.description} />
    </Head>





    <Section>
        <Container className="content">
          <Right>
            <SwiperComponent imageUrl1={data.imageUrl1} imageUrl2={data.imageUrl2} imageUrl3={data.imageUrl3} titre={data.titre}/>
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
                <span>Prix :</span>
                {data.prix}€ 
              </h6>
              <h6>
                <span>Poids :</span>
                {data.poids} Kg <Link target={'_blank'} href={'https://static0.tiendeo.fr/images/tiendas/136330/catalogos/580300/paginas/med/00002.jpg'}><strong style={{color : "blue"}}> ** tarifs de livraison-</strong></Link> 
                <br/> <label htmlFor='chatel' className="text-xl mt-xl text-center">Je suis de Chatellerault </label><input id='chatel' type={'checkbox'} checked={isChecked}
        onChange={handleCheckboxChange}
 />
              </h6>
               <div className="rating">
               <Eye id="star"  color="black"/>
                <h6>{views}</h6>
              </div>
            </div>
            <div className="buttons">
              <button onClick={handleClickPanier}>Ajouter au Panier</button>
              <button onClick={handleClickAchatStripe}>Acheter <BsStripe /></button>
              <button style={{cursor : 'not-allowed'}}>Faire une offre</button>
            </div>
          </Left>
        </Container>
        <button onClick={handleFetchComments} className="buttonComments">Afficher les Commentaires</button>
    </Section>
    <CommentsContainer>
      {toggleComments &&  <AddCommentComp onAdd={refetch} bookId={bookId} />}
      {comments.length > 0 && 
          comments.map((item:any,i:number)=>(
            <Comments onLike={refetch} comment={item} key={i}/>
          ))
      }
    </CommentsContainer>
    </>;
};

export default Index;

const Section = styled.section`
 
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;
  overflow-x:hidden;
  gap: 2rem;
 
  .buttonComments{
    padding : 1rem 3rem;
    background : black;
    color : white;
    border-radius : 15px;
    transition : all ease-in 400ms;
    transform : translateY(-3rem);
    &:hover{
      background : white;
      color : black;
      border : solid black 1px;
    }
  }
 

  /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
    gap: 4rem;
    margin-top : 3rem;
    padding-bottom : 20rem;

    .buttonComments{
      transform : translateY(20rem);
    }
  }

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    gap: 4rem;
    padding-bottom : 28rem;
    
  }

  @media screen and (min-width: 912px) and (max-width: 1024px) {
    padding-bottom : 28rem;
    gap: 0rem;
    .buttonComments{
      transform : translateY(18rem);
    }
    .content {
      transform: translateY(-15rem);
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
      display : flex;
      align-items : center;
      justify-content : center;
      flex-direction : column;
      height : 4rem;
      gap : 0rem;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      border: solid 1px black;
      margin: 0.5rem;
      font-weight: bold;
      text-align : center;
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
const CommentsContainer = styled.div`
    margin-top : 2rem;
    width : 100vw;
    display : flex;
    align-items  : center;
    justify-content : center;
    flex-wrap : wrap;
    gap : 2rem;
    margin-bottom : 3rem;
`
