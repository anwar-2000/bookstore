import React from "react";
import styled from "styled-components";
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const Index = () => {
  return <>
  <Head>
      <title>EMMAUS NAINTRE - France</title>
      <link rel="icon" href="./logo.jpg" />
      <meta name="description" content="Petit historique de la Communauté Châtellerault-Naintré"  />
      <meta name="keywords" content="Emmaus france,emmaus Poitiers,emmaus Chatellerault,Livres Rares,livres Anciens,Les BD,Livres Francais,Lives,Rares,Ancien,BD" />
      <meta name="author" content="Emmaus Naintré - Chatellerault" />
      <meta property="og:title" content="Emmaus Naintré - France" />
      <meta property="og:description" content="Petit historique de la Communauté Châtellerault-Naintré" />
    </Head>
    <Container>
            <img src="/logo.jpg" alt="" width={'400'} style={{borderRadius : '15px' , mixBlendMode : 'multiply'}} />
      <Emmaus>
        <div className="France" data-aos="fade-down" data-aos-duration="3000">
          <h1>Emmaüs France</h1>
          <p>27500 personnes (salariés, compagnons, bénévoles)</p>
          <p>122 communautés</p>
          <p>
            291 groupes Emmaüs &quot;Comités d&apos;amis, Sos familles, communautés,
            structures d&apos;Insertion…&quot;
          </p>
        </div>

        <div className="international" data-aos="fade-up" data-aos-duration="3000">
          <img src="https://www.emmaus-international.org/wp-content/themes/emmausint/assets/img/logo/logo-emmaus-horizontal-en.svg" alt="emmaus-international " />
          <p>
            350 associations dans 37 pays tous basés sur les mêmes principes et
            valeurs d&apos;origine
          </p>
        </div>
      </Emmaus>
      <Histoire>
        <h1>Petit historique de la Communauté Châtellerault-Naintré</h1>
        <div>
          <p>
            <mark>1981-1991 :</mark> Création de la Communauté par 4 personnes,
            les premiers ramassages, le 1er Bric-à-Brac, achat de la Ferme
          </p>
        </div>
        <div>
          <p>
            <mark>1991-2001 :</mark> Enracinement et stabilité, 40 compagnons:
            premières braderies Parc Expo, accueil des premiers demandeurs
            d&apos;asiles
          </p>
        </div>
        <div>
          <p>
            <mark>2001-2011 :</mark> accueil de familles migrantes en plus de
            l&apos;accueil &quot;traditionnel&quot;
          </p>
        </div>
        <div>
          <p>
            <mark>Depuis 2011 :</mark> ouverture du Coin Livres et de La
            Boutique, partenariat avec Le Ressort et d&apos;autres association,
            poursuite des actions de solidarité et d&apos;accueil Actuellement 130
            adultes et 90 enfants sont accueillis et hébergés
          </p>
        </div>
      </Histoire>
      <Accueil>
        <h1>L&apos;ACCUEIL :</h1>
        <p>
          <mark>L&apos;accueil des plus démunis</mark> sans distinction d&apos;origine,
          parce qu&apos;ils ont besoin d&apos;un toit, de liens d&apos;amitié, d&apos;une raison de
          vivre
        </p>
        <p>
          <mark>L&apos;accueil des passagers</mark> pour une ou plusieurs nuits
        </p>
        <p>
          <mark>L&apos;accueil des familles et de leurs enfants</mark>
        </p>
      </Accueil>

      <Vie>
      <h1>LA VIE COMMUNAUTAIRE :</h1>
      <p><mark>C&apos;est le partage du quotidien</mark> ... quotidien des repas, du travail, des loisirs</p>
      <p>Chacun peut s&apos;investir dans le fonctionnement et l&apos;évolution de la communauté, toujours dans un
respect mutuel</p>
<p>Dans la communauté, les compagnons peuvent retrouver une appartenance à un groupe social,
des relations d&apos;amitié et de solidarité, voire un lieu d&apos;épanouissement.</p>

<p> pour certains c&apos;est une courte étape, un dépannage dans une situation d&apos;urgence leur permettant
de se stabiliser</p>
<p>Pour d&apos;autres cela peut devenir une manière de vivre, un combat.</p>

      </Vie>
    </Container>
    </>;
};

export default Index;

const Container = styled.div`
img {
  margin-left : 1.5rem;
}
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction : column;
  margin-bottom : 3rem;
  gap : 3rem;
  text-align : center;
  p {
    text-align : center;
    mark {
      font-weight : bold;
    }
  }

  h1{
    font-size : 2rem;
    font-weight : bold;
  }


  

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    
  }
`;

const Emmaus = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap : 1rem;

  

  .France {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction : column;
    width: 30rem;
    text-align : start;
    height: 10rem; 
   
    border-radius : 15px;
    background : #0aa7b3;
    color : white;
    padding : 1.5rem;
   
    p{
        text-align : center;
    }

    @media screen and (max-width: 767px) {
        width : 20rem;
        height : 15rem;
    }
  }

  .international {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    p{
        text-align : center;
    }
    text-align : start;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction : column;
    width: 30rem;
    height: 10rem;
    border : solid 2px black;
    border-radius : 15px;
    padding : 1.5rem;
  }

  @media screen and (max-width: 767px) {
        width : 20rem;
                      
    }
`;

const Histoire = styled.div`
 width : 60%;
text-align : center;
  p {
    text-align : start;
  }
  display: flex;
  gap : 1.5rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;
`;

const Accueil = styled.div`
  display: flex;
  text-align : start;
  align-items: center;
  justify-content: start;
  flex-direction : column;
  gap: 0.5rem;
  width : 60%;
`;
const Vie = styled.div`
text-align : start;
  display: flex;
  align-items: center;
  flex-direction : column;
  justify-content: start;
  width : 60%;
  gap: 0.5rem;
`