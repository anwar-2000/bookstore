import { Facebook, PhoneCall, Twitter , Mail} from 'lucide-react';
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
  
`;

const ListContainer = styled.div`
  display: flex;
  align-items : center;
  justify-content : center;
  
`;

const List = styled.ol`
  margin: 0 20px;
  display : flex;
  gap : 1.2rem;
`;

const Image = styled.img`
  max-width: 130px;
  object-fit : cover;
  margin-left : 4rem;
  border-radius : 10px;
  height : 70px;
`;

const Footer: React.FC = () => {
  const BASE_URL:string ="https://bookstore-delta-two.vercel.app"
  const imageUrl = `${BASE_URL}/logo.jpg`;

  return (
    <FooterContainer>
      <ListContainer>
        <List>
          <Facebook color='white'/>
          <Twitter color='white' />
          <PhoneCall color='white'/>
          <Mail color='white'/>
        </List>
      </ListContainer>
      <Image src={imageUrl} alt="" />
    </FooterContainer>
  );
};

export default Footer;