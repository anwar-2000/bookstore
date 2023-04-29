import React from 'react';
import styled from 'styled-components';

const Header = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.9rem;
font-weight: 400;
margin-left: 2.8rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-weight: 400;

   /* styles for screens smaller than 768px */
   @media screen and (max-width: 767px) {
    flex-direction: column;
    margin-top : 9rem;
  }

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap : 2.1rem;
  flex: 1;
  align-items: center;
  justify-content : center;   
`;

const RightContainer = styled.div`
  flex: 1;
  display : flex;
  align-items : center;
  justify-content : center;
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 10px;
  font-weight: bold;
`;

const ListContainer = styled.div`
  margin-bottom: 20px;
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 8px;
`;

const List = styled.ol`
  list-style-type: square;
  margin: 0;
  padding-left: 20px;
`;

const Localisation: React.FC = ({}) => {
  return (
    <>
      <Header>Notre localisation</Header>
      <Container>
        <LeftContainer>
          <Title>{("Horaires d'ouverture")}</Title>
          <ListContainer>
            <List>
              <li>{('Lundi - Vendredi : 9h - 18h')}</li>
              <li>{('Samedi : 10h - 17h')}</li>
              <li>{('Dimanche : fermé')}</li>
            </List>
          </ListContainer>
          <Title>{('Adresse')}</Title>
          <ListContainer>
            <List>
              <li>{('77 Gd Rue de Châteauneuf, ')}</li>
              <li>{('86100 Châtellerault')}</li>
              <li>{('France')}</li>
            </List>
          </ListContainer>
        </LeftContainer>
        <RightContainer>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43687.210512596976!2d0.5027277515512434!3d46.81512610030111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47fda9dc6433bd53%3A0x8e2c902e5136d38d!2zQnJpYyDDoCBCcmFjIEVtbWHDvHM!5e0!3m2!1sen!2sfr!4v1681061101272!5m2!1sen!2sfr"
            width="auto"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </RightContainer>
      </Container>
    </>
  );
};

export default Localisation;