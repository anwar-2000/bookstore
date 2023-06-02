import { Facebook, PhoneCall, Instagram , Mail} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-top : solid 2px black;
  background-color : #009FE3;
  width: 100%;
  height : 5rem;  

  @media (max-width: 768px) {
    justify-content : center;
  }
  
`;

const ListContainer = styled.div`
  display: flex;
  align-items : center;
  justify-content : center;

  #link:hover{
      color : black;
  }

  @media (max-width: 768px) {
   flex-direction : column;
   gap : 0.4rem;
  }

  
`;

const List = styled.ol`
  margin: 0 20px;
  display : flex;
  gap : 1.2rem;
  align-items : center;
  justify-content : center;
`;

const Image = styled.img`
  max-width: 130px;
  object-fit : cover;
  margin-left : 2rem;
  border-radius : 10px;
  height : 70px;

  @media (max-width: 768px) {
    display : none;
  }

`;

const Footer: React.FC = () => {
  const BASE_URL:string ="https://emmaus-chatelleraudais.vercel.app"
  const imageUrl = `${BASE_URL}/logo.jpg`;

  return (
    <FooterContainer>
      <ListContainer>
      <div className='flex gap-2 text-xs'>
      <Link id='link' href="/retour" className='text-white font-semibold'>Retour & remboursement</Link>
      <Link id='link' href="/rgpd" className='text-white font-semibold'>|| RGPD ||</Link>
      <Link id='link' href="/conditionsgenerale" className='text-white font-semibold'>Conditions Générales</Link>
      </div>
        <List>
          <Link href="https://www.facebook.com/emmauschatelleraudais"><Facebook color='white'/></Link>
          <Link href="https://www.instagram.com/emmaus.chatelleraultnaintre"><Instagram color='white' /></Link>
          <Link href="tel:+33988048607"><PhoneCall color='white'/></Link>
          <Link href="mailto:contact@emmaus-chatelleraudais.org"><Mail color='white'/></Link>
        </List>
          
      </ListContainer>
      <Image src={imageUrl} alt="" />
    </FooterContainer>
  );
};

export default Footer;