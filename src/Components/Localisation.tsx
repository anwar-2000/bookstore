import React from 'react';
import styled from 'styled-components';

const Header = styled.h1`
  text-align: center;
  font-size: 2.9rem;
  font-weight: 400;
  margin-bottom : 2.5rem;

`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-weight: 400;
  padding-bottom : 3rem;


   /* styles for screens smaller than 768px */
   @media screen and (max-width: 767px) {
    flex-direction: column;
    transform : translateY(-1rem);
  }

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  flex-wrap : wrap;
  gap : 1.2rem;
  flex: 2;
  align-items: center;
  justify-content : center;   

  /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
    margin-bottom : 1.2rem;
  }

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    
  }

  .Cards{
      width : 15rem;
      height : 10rem;
      display : flex;
      flex-direction : column;
      align-items:center;
      justify-content: center;
      background : #009FE3;
      color : black;
      padding : 0.9rem;
      border-radius : 20px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      transition : 1s all ease;

      p{
        font-size  : 12px;
      }
         
          
      }

      h3 {
        font-size  : 18px;
        text-align : center;
        font-weight : bolder;
        margin-bottom : 0.3rem;
        color : white;
      }


      .place {
        font-weight : bold;
        font-size : 10px;
      }

      .time{
        margin-top : 4px;
        font-size : 10px;
        overflow-y : scroll;
        font-size  : 12px;
      }
  }
`;

const RightContainer = styled.div`
  flex: 1;
  display : flex;
  align-items : center;
  justify-content : center;
`;


const Localisation: React.FC = ({}) => {
  return (
    <>
      <Header>Notre localisation</Header>
      <Container>
      <LeftContainer> 
            <div className='Cards' data-aos="fade-down" data-aos-delay="50">
            <h3>La Ferme aux Affaires</h3>
            <p className='place'>route de Nonnes 86100 Châtellerault</p>
            <p className='time'>
                   Mardi au Samedi  <br /> 10h-12h + 14h30-18h <br /> Dimanche 14h30-18h <br />
                   <a href='tel:+33549020087' style={{color : 'white' , fontWeight : 'bold'}}> 05.49.02.00.87</a>
              </p>
            </div>
            <div className='Cards' data-aos="fade-down" data-aos-delay="60" data-aos-duration="2000">
              <h3>La Boutique</h3><p className='place'>79 rue Rasseteau 86100 Châtellerault</p>
              <p className='time'> Mardi au Samedi  <br /> 10h-12h + 14h30-18h09</p>
            </div>
            <div className='Cards'data-aos="fade-left" data-aos-delay="70" data-aos-duration="2000">
              <h3>Le Coin Livres</h3> 
              <p className='place'>112 Gd Rue de Châteauneuf 86100 Châtellerault</p>
        <p className='time'>Mardi au Samedi  <br /> 10h-12h + 14h30-18h</p>
            </div>
            <div className='Cards'data-aos="fade-down" data-aos-delay="80"  data-aos-duration="2000">
              <h3>Le Bric-à-Brac</h3>
              <p className='place'> 77 Gd Rue de Châteauneuf 86100 Châtellerault</p>
              <p className='time'> Mardi au Samedi <br /> 10h-12h + 14h30-18h <br /> <a href='tel:+33549935167' style={{color : 'white', fontWeight : 'bold'}}>05.49.93.51.67</a></p>
            </div>
            <div className='Cards'data-aos="fade-down" data-aos-delay="90" data-aos-duration="2000" >
              <h3>Bureaux et lieu de vie et de travail :</h3>
              <p className='place'> 719 rue de la Tour 86530 Naintré</p>
              <p className='time'><a href='tel:+33549902730' style={{color : 'white' , fontWeight : 'bold'}}>05.49.90.27.30</a></p>
            </div>
            <div className='Cards' data-aos="fade-left" data-aos-delay="100" data-aos-duration="2000">
              <h3>Lieu de vie et de travail :</h3>
              <p className='place'>Les Fougères, 19 rue Denis Papin 86530 Naintré</p>
            </div>
        </LeftContainer>
        <RightContainer>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43687.210512596976!2d0.5027277515512434!3d46.81512610030111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47fda9dc6433bd53%3A0x8e2c902e5136d38d!2zQnJpYyDDoCBCcmFjIEVtbWHDvHM!5e0!3m2!1sen!2sfr!4v1681061101272!5m2!1sen!2sfr"
            width="350"
            height="300"
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