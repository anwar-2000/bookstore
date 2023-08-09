
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { addViewerToBook, fetchComments, fetchViews } from "@/lib/helpers";
import { NextPage } from "next";
import { Eye } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, calculateTotal , ChangeChecked, changeLivreur} from "@/redux/reducers/Cart";
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import SwiperComponent from '@/Components/ui/Swiper'
import Head from 'next/head'
import Comments from '@/Components/Comments'
import AddCommentComp from '@/Components/addCommentComp'

import Link from 'next/link';
import { SET_LIVRAISON } from '@/redux/reducers/Toggle';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import LoadingDetails from "@/Components/LoadingDetails";
import { fetchMusic } from "@/lib/MusicHelpers";


interface Produit {
_id : string;
nom: string;
description: string;
price: number;
imageUrl1: string;
imageUrl2 : string;
imageUrl3 : string;
vendu : boolean,
poids : number;
type? : string;
size ?: string;
}

interface MyPageProps {
  data : Produit
  views : number
}
const Index: NextPage<MyPageProps> = () => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const { data, isLoading } = useQuery<MyPageProps>(
    ['MusicDATA', slug],
    async () => {
      const [data, views] = await Promise.all([
        fetchMusic(slug),
        fetchViews(slug),
      ]);

      return { data, views };
    },
    {
      staleTime: 60 * 60 * 1000, // cache expires in 1 hour
    }
  );
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
    /**
     * 
     * ADD VIEWER COUNT TO product -- DONE
     */
    useEffect(()=>{
      addViewerToBook(slug)
    },[]);

  const { total , items } = useSelector((state: any) => state.cart);
  const {showOptions} = useSelector((state:any)=>state.toggle);

  let produits = {
    _id: data?.data._id,
    titre: data?.data.nom,
    prix: data?.data.price,
    image: data?.data.imageUrl1,
    poids: data?.data.poids,
    total,
  };

  const handleChatelleraultChange = () => {
    dispatch(ChangeChecked());
    setIsCheckedColissimo(false)
    setIsCheckedMondialRelay(false)



    dispatch(SET_LIVRAISON()) // hididing other options for the rest of buying
  }

   const handleMondialRelayBox = () => {
    dispatch(ChangeChecked());
    setIsCheckedMondialRelay(true);
    setIsCheckedColissimo(false);
    dispatch(changeLivreur({type : "MONDIAL"}))

    dispatch(SET_LIVRAISON()) // hididing other options for the rest of buying
  };

  const handleColissimoBox = () => {
    dispatch(ChangeChecked());
    setIsCheckedMondialRelay(false);
    setIsCheckedColissimo(true);
    dispatch(changeLivreur({type : "COLISSIMO"}))


    dispatch(SET_LIVRAISON()) // hididing other options for the rest of buying
  };



  
  const handleClickPanier = () => {
     
     //console.log( 'PANIER : ',book)
     dispatch(AddToCart(produits))
     dispatch(calculateTotal())

    toast.info(` le livre ${produits.titre}  de Poids : ${produits.poids} Kg est dans votre panier `,{
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
  };


 



return <>
  <Head>
    <title>{data?.data.nom}</title>
    <link rel="icon" href={data?.data.imageUrl1} />
    <meta name="description" content="La boutique des livres Emmaus Chatellerault vend ses livres rares, ses BD, ses livres de poche à un prix compétitif."  />
    <meta name="keywords" content="Livres Rares,livres Anciens,Les BD,Livres Francais,Lives,Rares,Ancien,BD" />
    <meta property="og:title" content="Emmaus- Boutique chatellerault" />
    <meta property="og:description" content={data?.data.description} />
  </Head>





  <Section>
     { isLoading ? <LoadingDetails /> : <Container className="content">
        <Right>
          <SwiperComponent imageUrl1={data?.data.imageUrl1 as string} imageUrl2={data?.data.imageUrl2 as string} imageUrl3={data?.data.imageUrl3 as string } titre={data?.data.nom as string}/>
          </Right>
        <Details>
          <div className="infos">
                  <h1>{data?.data.nom}</h1>
                  <small>{data?.data.description}</small>
            <div className='prices'>
                <h2> Prix : {data?.data.price} €</h2>
            </div>
            <div className='prices'>
                <h2> Poids : {data?.data.poids} Kg</h2>
            </div>

              { showOptions && items === 0 && <div>
              <label htmlFor='chatel' className="text-xl mt-xl text-center">Je suis de Chatellerault </label>
              <input id='chatel' type={'checkbox'} checked={isChecked}
              onChange={handleChatelleraultChange}/>
              </div>}
            
            { showOptions && items === 0 && <div className='flex gap-3 items-center justify-center'>
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
              <h6>{data?.views}</h6>
            </div>
          </div>
         { data?.data.vendu === false ? <div className="buttons">
            <button onClick={handleClickPanier}>Ajouter au Panier</button>
            <button style={{cursor : 'not-allowed'}}>Faire une offre</button>
          </div> : (
            <h1 className='text-red-700'>Vendu</h1>
          )}

          <button onClick={handleFetchComments} className="buttonComments">Afficher les Commentaires</button>
        </Details>

      </Container>}
     
  </Section>
 { !isLoading && <CommentsContainer>
    {toggleComments &&  <AddCommentComp onAdd={refetch} slug={slug} />}
    {comments.length > 0 && 
        comments.map((item:any,i:number)=>(
          <Comments onLike={refetch} comment={item} key={i}/>
        ))
    }
  </CommentsContainer>}

  </>;
};

export default Index;

const Section = styled.section`
min-height : 100vh;
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
min-height: 90vh;
display: flex;
align-items: center;
flex-direction: row;
justify-content: center;
margin-top : 2rem;
overflow-x:hidden;
//margin-bottom : 3rem;
gap: 4rem;

/* styles for screens smaller than 768px */
@media screen and (max-width: 767px) {
  flex-direction: column;
  transform : translateY(-25rem);
  margin-bottom : 0rem;
}

/* styles for screens between 768px and 1024px */
@media screen and (min-width: 768px) and (max-width: 1024px) {
  flex-direction: column;
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


const Details = styled.div`
  align-self : start;
  flex:1;
  display : flex;
  flex-direction : column;

   /* styles for screens smaller than 768px */
@media screen and (max-width: 767px) {
      align-self : center;
      margin-bottom : 2rem;
      align-items : start;
      justify-content : center;
}


  h1{
      font-weight : bold;
      font-size : 15px;
  }
  .infos{
      display : flex;
      flex-direction : column;
      align-items : start;
      justify-content : start;
      h1{
          font-size : 37px;
          font-weight : bold;
          width : 30rem;
      }
      & small{
          font-size : 12px;
          color : black;
          width : 15rem;
      }

           @media screen and (max-width: 767px) {
                  h1{
                  width : 20rem;
                  font-size : 32px;
                  font-weight : bold;}
                    }
      
  }

  .prices {
      h2{
          font-size : 25px;
          font-weight : bold;
          width : 20rem;
      }
  }
  .colors {
          display : flex;
          gap : 0.6rem;
          width : 12rem;
          .circle{
              width : 20px;
              height : 20px;
              background : black;
              border-radius : 50%;

              &:hover {
                  cursor : pointer;
              }
          }
      }
  .quantite{
      margin-top : 1rem;
      background : #b4afaf;
      border-radius : 10px;
      display : flex;
      align-items : center;
      justify-content : center;
      gap : 0.8rem;
      width : 7rem;
      font-size : 17px;
  }
  .buttons{
      display : flex;
      flex-wrap : wrap;
      align-items : center;
      justify-content : center;
      gap : 0.8rem;
      margin-top : 1.6rem;
      margin-bottom : 2rem;
      button:nth-child(2){
          background : white;
          color : black;
      }
      button {
          background : #003e29;
          border : solid 1.5px black;
          padding: 0.5rem 1.5rem;
          color : white;
          border-radius : 15px;
          transition : all ease-in 300ms;

          &:hover{
              background : black;
              color : white;
          }

             /* styles for screens smaller than 768px */
@media screen and (max-width: 767px) {
      padding : 0.5rem 0.6rem;
}
      }
  }

`