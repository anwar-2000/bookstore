import { GetServerSidePropsContext, GetStaticProps } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const slug = context.params?.slug as string;
  //console.log('SLUG IS',slug)
  // Fetch book and views in parallel using Promise.all
  const [book, views] = await Promise.all([
    fetchBook(slug),
    fetchViews(slug)
  ]);

  const data = book; 
  //console.log(data)


  return {
    props: { data,  slug, views }
  };
}

  

 import React, { useEffect, useState } from "react";
  import styled from "styled-components";
  import { addViewerToBook, fetchBook, fetchComments, fetchViews } from "@/lib/helpers";
  import { NextPage } from "next";
import { Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, calculateTotal , ChangeChecked, changeLivreur, reCalculate} from "@/redux/reducers/Cart";
//import getStripe from "@/lib/getStripe";
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import SwiperComponent from '@/Components/ui/Swiper'
import Head from 'next/head'
import Comments from '@/Components/Comments'
import AddCommentComp from '@/Components/addCommentComp'

import Link from 'next/link';
import { SET_LIVRAISON } from '@/redux/reducers/Toggle';


interface Book {
    _id : string;
    titre: string;
    auteur: string;
    description: string;
    etat : string;
    prix: number;
    imageUrl1: string;
    imageUrl2 : string;
    imageUrl3 : string;
    vendu : boolean,
    status: string;
    quantite : number,
    date: Date;
    rating: number;
    poids : number;
    date_du_livre : string,
    categorie : string
  }

  interface MyPageProps {
    data: Book;
    session : any;
    slug : string;
    views : number
  }
const Index: NextPage<MyPageProps> = ({ data  , slug , views }) => {
/**
 * 
 * fetching for comments based on if the user clicked or not
 */
  const [comments, setComments] = useState([]);
  const [toggleComments,setToggleComments]=useState<boolean>(false)

/** //////////// for the free shipping ////////////*/

const {isChecked} = useSelector((state:any)=>state.cart);
//console.log("in details",isChecked)
/****************************************** */

const [isCheckedMondialRelay, setIsCheckedMondialRelay] = useState(false);
const [isCheckedColissimo, setIsCheckedColissimo] = useState(false);



  const handleFetchComments = async () => {
    try {
      const commentsData = await fetchComments(slug); 
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
    //console.log("***************" ,slug)


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
      addViewerToBook(slug)
    },[]);

  const { total } = useSelector((state: any) => state.cart);
  const {showOptions} = useSelector((state:any)=>state.toggle);


  let book = {
    _id : data._id,
    titre : data.titre,
    prix : data.prix,
    image : data.imageUrl1,
    poids : data?.poids,
    quantite : data.quantite,
    total
   }

  const handleChatelleraultChange = () => {
    dispatch(ChangeChecked());
    setIsCheckedColissimo(false)
    setIsCheckedMondialRelay(false)
    
    //recalculate logic
    dispatch(reCalculate())


    dispatch(SET_LIVRAISON()) // hididing other options for the rest of buying
  }

   const handleMondialRelayBox = () => {
    dispatch(ChangeChecked());
    setIsCheckedMondialRelay(true);
    setIsCheckedColissimo(false);
    dispatch(changeLivreur({type : "MONDIAL"}))
    

    //recalculate logic
    dispatch(reCalculate())

    dispatch(SET_LIVRAISON()) // hididing other options for the rest of buying
  };

  const handleColissimoBox = () => {
    dispatch(ChangeChecked());
    setIsCheckedMondialRelay(false);
    setIsCheckedColissimo(true);
    dispatch(changeLivreur({type : "COLISSIMO"}))

    
    //recalculate logic
    dispatch(reCalculate())

    dispatch(SET_LIVRAISON()) // hididing other options for the rest of buying
  };



  
  const handleClickPanier = () => {
     
     //console.log( 'PANIER : ',book)
     dispatch(AddToCart(book))
     dispatch(calculateTotal())

    toast.info(` le livre ${book.titre}  de Poids : ${book.poids} Kg est dans votre panier `,{
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
  };


 


  return <>
    <Head>
      <title>{data.titre}</title>
      <link rel="icon" href={data.imageUrl1} />
      <meta name="description" content="La boutique des livres Emmaus Chatellerault vend ses livres rares, ses BD, ses livres de poche à un prix compétitif."  />
      <meta name="keywords" content="Livres Rares,livres Anciens,Les BD,Livres Francais,Lives,Rares,Ancien,BD" />
      <meta name="author" content={data?.auteur} />
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
                <span className='font-thin '> {data.prix} €</span> 
              </h6>
              <small>
                <span >Il reste <span className='text-blue-500'>{data.quantite} </span>  dans la boutique</span> 
              </small>
              <h6>
                <span>Poids :</span>{data.poids} Kg 
              </h6>

                { showOptions && <div>
                <label htmlFor='chatel' className="text-xl mt-xl text-center">Je suis de Chatellerault </label>
                <input id='chatel' type={'checkbox'} checked={isChecked}
                onChange={handleChatelleraultChange}/>
                </div>}
              
              { showOptions && <div className='flex gap-3 items-center justify-center'>
               <h6><label htmlFor='livreur' className="text-xl mt-xl text-center">Mondial Relay</label>
               <input className='ml-3' id='livreur' type={'checkbox'} 
                onChange={handleMondialRelayBox} />
                </h6>
                <h6>
               <label htmlFor='livreur' className="text-xl mt-xl text-center">Colissimo</label>
               <input  id='livreur' className='ml-3' type={'checkbox'} 
                onChange={handleColissimoBox} />
                </h6>
                </div>}
                <div>
                <Link target={'_blank'} href={'https://static0.tiendeo.fr/images/tiendas/136330/catalogos/580300/paginas/med/00002.jpg'} className='text-blue-400 mr-2' >tarifs Mondial Relay</Link> 
                  ||  
                <Link  target={'_blank'}  href='https://www.laposte.fr/tarif-colissimo' className='text-blue-400 ml-2' >tarifs colissimo </Link>
                </div>
               <div className="rating">
               <Eye id="star"  color="black"/>
                <h6>{views}</h6>
              </div>
            </div>
           { data?.vendu === false ? <div className="buttons">
              <button onClick={handleClickPanier}>Ajouter au Panier</button>
              <button style={{cursor : 'not-allowed'}}>Faire une offre</button>
            </div> : (
              <h1 className='text-red-700'>Vendu</h1>
            )}

            <button onClick={handleFetchComments} className="buttonComments">Afficher les Commentaires</button>
          </Left>

        </Container>
       
    </Section>
    <CommentsContainer>
      {toggleComments &&  <AddCommentComp onAdd={refetch} slug={slug} />}
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
  //min-height : 100vh;

#livreur:checked{
    background-color: #00ff4c !important;       
}

 
  .buttonComments{
    padding : 1rem 3rem;
    background : black;
    color : white;
    border-radius : 15px;
    transition : all ease-in 400ms;
  
    &:hover{
      background : white;
      color : black;
      border : solid black 1px;
    }
  }
 

  /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
    gap: 4rem;
   // margin-top : 3rem;
   // padding-bottom : 20rem;
    .buttonComments{
      transform : translateY(2rem);
    }
  }

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    gap: 4rem;
    padding-bottom : 3rem;
    
  }

  @media screen and (min-width: 912px) and (max-width: 1024px) {
    padding-bottom : 26rem;
    gap: 0rem;
    .buttonComments{
      transform : translateY(4rem);
    }
    .content {
      transform: translateY(-15rem);
    }
  }
`;
const Container = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-top : 2rem;
  //margin-bottom : 3rem;
  gap: 4rem;

  /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
    flex-direction: column;
    transform : translateY(-20rem);
    margin-bottom : 0rem;
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
    font-size: 2rem;  
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
    @media screen and (max-width: 767px) {
      margin-top : 1.5rem;
  }
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
  @media screen and (max-width: 624px) {
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
      margin-top : 1.3rem;
      justify-content: center;
      align-items: center;

      h1 {
        font-size: 25px;
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
    width : 80vw;
    display : flex;
    align-items  : center;
    justify-content : center;
    flex-wrap : wrap;
    gap : 2rem;
    margin-bottom : 3rem;
`
