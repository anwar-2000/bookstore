
import { useRouter } from 'next/navigation'
import React from 'react'
import styled from 'styled-components'



const ProductsCatgeories = () => {
    const router = useRouter();
  return <Categorie>
 
  <div className='card cuirs'  onClick={()=>router.push('/articles/categorie/Cuirs')}>
      <h1>Matériaux Cuirs</h1>
  </div>
  <div className='card Divers'  onClick={()=>router.push('/articles/categorie/Divers')}>
      <h1>Divers</h1>
  </div>
  <div className='card BD'  onClick={()=>router.push('/articles/categorie/BD')}>
      <h1>BD</h1>
  </div>
  <div className='card vetements'  onClick={()=>router.push('/articles/categorie/Vetements')}>
      <h1>Vêtements</h1>
  </div>
  <div className='card rares'  onClick={()=>router.push('/articles/categorie/Histoire')}>
      <h1>Livres D&apos;Histoire</h1>
  </div>
</Categorie>
}

export default ProductsCatgeories

const Categorie = styled.div`
    transform : translateY(-2rem);
    display : flex;
    gap : 2rem;
    align-items : center;
    justify-content : center;
    flex-wrap : wrap;
    width : 100vw;
    color : black;
  

    .card{
        width : 12rem;
        padding : 1rem;
        height : 3.5rem;
        font-size : 16px;
        h1 {
            opacity : 0;
        }
        background-size : cover;
        border : solid 1px black;
        border-radius : 10px;
        text-align : center;
        cursor : pointer;
        transition : all ease 400ms;
        
        &:hover{
            background : black;
            color : white;

            h1{
                opacity : 1;
            }
        }

           /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
           width : 8rem;
  }

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
       // margin-top : 5rem;
  }


  @media screen and (min-width: 912px) and (max-width: 1024px) {
    
  }
        
    
    }
    .rares{
        background-image : url('https://static.vecteezy.com/system/resources/previews/000/691/409/original/bookshelf-in-library-vector.jpg');
    }
    .cuirs{
        background-image : url('https://th.bing.com/th/id/R.f4b2532e6d87f7e977839508ba74b55a?rik=Wq4wNrUOsxCCQA&pid=ImgRaw&r=0');
    }
    .vetements{
        background-image : url('https://images.wave.fr/images/demna-gvasalia-vetements.jpg');
    }
    .Divers{
        background-image : url('https://th.bing.com/th/id/OIP.asQK-53rcjr5WaJw_BapcgHaHa?pid=ImgDet&rs=1');
    }
    .BD{
        background-image : url('https://th.bing.com/th/id/OIP.iGlt5FHMzBKy9BR99vs4dgHaJ-?pid=ImgDet&rs=1');
    }
`
