import React from "react";
import styled from "styled-components";

const index = () => {
  return (
    <Container>
            <img src="/logo.jpg" alt="" width={'400'} style={{borderRadius : '15px' , mixBlendMode : 'multiply'}} />
      <Emmaus>
        <div className="France" data-aos="fade-down" data-aos-duration="3000">
          <h1>EMMAUS FRANCE</h1>
          <p>27500 personnes (salariés, compagnons, bénévoles)</p>
          <p>122 communautés</p>
          <p>
            291 groupes Emmaüs "Comités d'amis, Sos familles, communautés,
            structures d'Insertion…"
          </p>
        </div>

        <div className="international" data-aos="fade-up" data-aos-duration="3000">
          <h1>EMMAUS INTERNATIONAL</h1>
          <p>
            350 associations dans 37 pays tous basés sur les mêmes principes et
            valeurs d'origine
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
            d'asiles
          </p>
        </div>
        <div>
          <p>
            <mark>2001-2011 :</mark> accueil de familles migrantes en plus de
            l'accueil "traditionnel"
          </p>
        </div>
        <div>
          <p>
            <mark>Depuis 2011 :</mark> ouverture du Coin Livres et de La
            Boutique, partenariat avec Le Ressort et d'autres association,
            poursuite des actions de solidarité et d'accueil Actuellement 130
            adultes et 90 enfants sont accueillis et hébergés
          </p>
        </div>
      </Histoire>
      <Accueil>
        <h1>L'ACCUEIL :</h1>
        <p>
          -<mark>L'accueil des plus démunis</mark> sans distinction d'origine,
          parce qu'ils ont besoin d'un toit, de liens d'amitié, d'une raison de
          vivre
        </p>
        <p>
          -<mark>L'accueil des passagers</mark> pour une ou plusieurs nuits
        </p>
        <p>
          -<mark>L'accueil des familles et de leurs enfants</mark>
        </p>
      </Accueil>

      <Vie>
      <h1>LA VIE COMMUNAUTAIRE :</h1>
      <p><mark>C'est le partage du quotidien</mark>quotidien des repas, du travail, des loisirs</p>
      <p>-Chacun peut s'investir dans le fonctionnement et l'évolution de la communauté, toujours dans un
respect mutuel</p>
<p>-Dans la communauté, les compagnons peuvent retrouver une appartenance à un groupe social,
des relations d'amitié et de solidarité, voire un lieu d'épanouissement.</p>

<p>- pour certains c'est une courte étape, un dépannage dans une situation d'urgence leur permettant
de se stabiliser</p>
<p>-Pour d'autres cela peut devenir une manière de vivre, un combat.</p>

      </Vie>
    </Container>
  );
};

export default index;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction : column;
  margin-bottom : 3rem;
  gap : 3rem;
  text-align : center;
  p {
    text-align : center;
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
    border : solid 2px black;
    border-radius : 15px;
    background : #030303;
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
text-align : center;
  p {
    text-align : center;
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
  align-items: center;
  justify-content: start;
  flex-direction : column;
  gap: 0.5rem;
`;
const Vie = styled.div`
  display: flex;
  align-items: center;
  flex-direction : column;
  justify-content: start;
  gap: 0.5rem;
`