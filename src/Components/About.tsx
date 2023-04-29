import React from 'react';
import styled from 'styled-components';

const SectionContainer = styled.section`
  padding: 20px;
  margin-top : 5rem;
  margin-left : 3rem;
  h1{
font-size: 2.9rem;
font-weight: 400;
}
`;

const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items : center;
  justify-content : center;
  gap: 20px;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const TextColumn = styled.div`
  flex: 1;
`;

const ImageColumn = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  mix-blend-mode : multiply;
`;


const AboutSection: React.FC = ({}) => {
    const text =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, velit vel luctus tincidunt, diam velit lacinia nulla, vel aliquet velit sapien vel justo. Sed euismod, nisl non bibendum tincidunt, justo velit ultrices nulla, vel aliquet velit sapien vel justo. Vivamus euismod, velit vel luctus tincidunt, diam velit lacinia nulla, vel aliquet velit sapien vel justo. Sed euismod, nisl non bibendum tincidunt, justo velit ultrices nulla, vel aliquet velit sapien vel justo. Vivamus euismod, velit vel luctus tincidunt, diam velit lacinia nulla, vel aliquet velit sapien vel justo. Sed euismod, nisl non bibendum tincidunt, justo velit ultrices nulla, vel aliquet velit sapien vel justo. Vivamus euismod, velit vel luctus tincidunt, diam velit lacinia nulla, vel aliquet velit sapien vel justo.";
    const  imageUrl = "./logo.jpg"
    return (
      <SectionContainer>
        <Header>À propos de nous</Header>
        <ColumnsContainer>
          <TextColumn>{text}</TextColumn>
          <ImageColumn>
            <Image src={imageUrl} alt="" />
          </ImageColumn>
        </ColumnsContainer>
      </SectionContainer>
    );
  };
  
  export default AboutSection;