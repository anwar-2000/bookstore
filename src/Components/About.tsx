import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const SectionContainer = styled.section`
  padding: 20px;
  margin-top : 5rem;

  h1{
      font-size: 2.9rem;
      font-weight: 400;
        }
  `;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  

  @media (min-width: 768px) {
    font-size : 10px;
  }
`;

const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items : center;
  justify-content : center;
  gap: 20px;
  @media (min-width: 768px) {
    flex-direction: row;
    margin-left : 2rem;
  }
`;

const TextColumn = styled.div`
  flex: 1;
  text-align : center;
`;

const ImageColumn = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  mix-blend-mode : multiply;
  @media (max-width: 768px) {
    
    margin-left : 1rem;
  }
`;


const AboutSection: React.FC = ({}) => {
const  imageUrl = "./logo.jpg"
    return (
      <SectionContainer>
        <Header>À propos de nous</Header>
        <ColumnsContainer>
          <TextColumn>A l&apos;origine : En 1949 l&apos;abbé Pierre est appelé au chevet d&apos;un ancien bagnard. N&apos;ayant rien à lui
donner, il lui propose :
« Puisque tu veux mourir, tu n&apos;as rien à perdre. Alors donne-moi ton aide pour aider les autres. »
Cet homme, Georges, devient le premier de tous les compagnons d&apos;Emmaüs.
L&apos;association Emmaüs est créée en 1953 pour organiser et développer ce mouvement. Après les
ravages de la guerre de1939-45, les rigueurs de l&apos;hiver 1954 tuent. Dans ce contexte de graves
pénuries de logements, l&apos;abbé Pierre lance son célèbre appel, « Mes amis, au secours ! » ; il
déclenche l&apos;insurrection de la Bonté » et influence fortement les pouvoirs publics. <br />
    <Link href={'/emmausNaintre'} style={{color : 'blue'}}>Voir Plus ...</Link>
</TextColumn>
          <ImageColumn>
            <Image src={imageUrl} alt=""  data-aos="fade-down" data-aos-delay="50" data-aos-duration="2000" />
          </ImageColumn>
        </ColumnsContainer>
      </SectionContainer>
    );
  };
  
  export default AboutSection;