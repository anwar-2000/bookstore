import React, { useState } from 'react';
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
  gap : 1rem;
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
  @media screen and (min-width: 800px) and (max-width: 1024px) {
    margin-bottom : 1.5rem;
  }

  .Cards{
      cursor : pointer;
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
        overflow-y : visible;
        font-size  : 12px;
      }
  
`;

const RightContainer = styled.div`
  flex: 1;
  display : flex;
  align-items : center;
  justify-content : center;
`;


const Localisation: React.FC = ({}) => {

  const [map,setMap] = useState<string>('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2730.5216929031567!2d0.5407258756333528!3d46.813727042393175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47fda9e89ae24e53%3A0x3e527348659bce9c!2s56%20Rue%20Aim%C3%A9%20Rasseteau%2C%2086100%20Ch%C3%A2tellerault!5e0!3m2!1sen!2sfr!4v1685458519813!5m2!1sen!2sfr')
  return (
    <>
      <Header>Notre localisation</Header>
      <Container>
      <LeftContainer> 
            <div className='Cards' data-aos="fade-down" data-aos-delay="50" onClick={()=>setMap('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2731.7516598166253!2d0.534681075631832!3d46.78949764404548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47fda9a6a4572775%3A0xd8ed6d12ef80ca1f!2sRte%20de%20Nonnes%2C%20Ch%C3%A2tellerault!5e0!3m2!1sen!2sfr!4v1685458035288!5m2!1sen!2sfr')}>
            <h3>La Ferme aux Affaires</h3>
            <p className='place'>route de Nonnes 86100 Châtellerault</p>
            <p className='time'>
                   Mardi au Samedi  <br /> 10h-12h + 14h30-18h <br /> Dimanche 14h30-18h <br />
                   <a href='tel:+33549020087' style={{color : 'white' , fontWeight : 'bold'}}> 05.49.02.00.87</a>
              </p>
            </div>
            <div className='Cards' data-aos="fade-down" data-aos-delay="60" data-aos-duration="2000" onClick={()=>setMap('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2730.5216929031567!2d0.5407258756333528!3d46.813727042393175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47fda9e89ae24e53%3A0x3e527348659bce9c!2s56%20Rue%20Aim%C3%A9%20Rasseteau%2C%2086100%20Ch%C3%A2tellerault!5e0!3m2!1sen!2sfr!4v1685458519813!5m2!1sen!2sfr')}>
              <h3>La Boutique</h3><p className='place'>79 rue Rasseteau 86100 Châtellerault</p>
              <p className='time'> Mardi au Samedi  <br /> 10h-12h + 14h30-18h09</p>
            </div>
            <div className='Cards'data-aos="fade-left" data-aos-delay="70" data-aos-duration="2000" onClick={()=>setMap('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2730.403043150337!2d0.5325662756335212!3d46.81606384223375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47fda9dc9d6d3cdf%3A0xd7beec0ba735c37e!2s77%20Gd%20Rue%20de%20Ch%C3%A2teauneuf%2C%2086100%20Ch%C3%A2tellerault!5e0!3m2!1sen!2sfr!4v1685458780562!5m2!1sen!2sfr')} >
              <h3>Le Coin Livres</h3> 
              <p className='place'>112 Gd Rue de Châteauneuf 86100 Châtellerault</p>
        <p className='time'>Mardi au Samedi  <br /> 10h-12h + 14h30-18h</p>
            </div>
            <div className='Cards'data-aos="fade-down" data-aos-delay="80"  data-aos-duration="2000" onClick={()=>setMap('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2730.403043150337!2d0.5325662756335212!3d46.81606384223375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47fda9dc9d6d3cdf%3A0xd7beec0ba735c37e!2s77%20Gd%20Rue%20de%20Ch%C3%A2teauneuf%2C%2086100%20Ch%C3%A2tellerault!5e0!3m2!1sen!2sfr!4v1685458780562!5m2!1sen!2sfr')}>
              <h3>Le Bric-à-Brac</h3>
              <p className='place'> 77 Gd Rue de Châteauneuf 86100 Châtellerault</p>
              <p className='time'> Mardi au Samedi <br /> 10h-12h + 14h30-18h <br /> <a href='tel:+33549935167' style={{color : 'white', fontWeight : 'bold'}}>05.49.93.51.67</a></p>
            </div>
            <div className='Cards'data-aos="fade-down" data-aos-delay="90" data-aos-duration="2000" >
              <h3>Bureaux et lieu de vie et de travail :</h3>
              <p className='place'> 19 rue de la Tour 86530 Naintré</p>
              <p className='time'><a href='tel:+33549902730' style={{color : 'white' , fontWeight : 'bold'}}>05.49.90.27.30</a></p>
            </div>
            <div className='Cards' data-aos="fade-left" data-aos-delay="100" data-aos-duration="2000">
              <h3>Lieu de vie et de travail :</h3>
              <p className='place'>Les Fougères, 19 rue Denis Papin 86530 Naintré</p>
            </div>
        </LeftContainer>
        <RightContainer>
          <iframe
            src={map}
            width="350"
            height="300"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="EMMAUS CHATELLERAULT - BOUTIQUE EN LIGNE - BRIC A BRAC - LA FERME - LES BUREAUX D&apos;EMMAUS NAINTRE"
            sandbox="allow-scripts allow-same-origin"
          ></iframe>
        </RightContainer>
      </Container>
    </>
  );
};

export default Localisation;