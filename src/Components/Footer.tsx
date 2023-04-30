import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color : #FACC15;
  position: fixed;
  bottom: 0;
  width: 100%;
  height : 5rem;
  
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const List = styled.ol`
  margin: 0 20px;
`;

const Image = styled.img`
  max-width: 130px;

  mix-blend-mode : multiply;
`;

const Footer: React.FC = () => {
  const BASE_URL:string ="https://bookstore-delta-two.vercel.app"
  const list1 = ['Item 1', 'Item 2', 'Item 3'];
  const list2 = ['Item A', 'Item B', 'Item C'];
  const imageUrl = `${BASE_URL}/logo.jpg`;

  return (
    <FooterContainer>
      <ListContainer>
        <List>
          {list1.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </List>
        <List>
          {list2.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </List>
      </ListContainer>
      <Image src={imageUrl} alt="" />
    </FooterContainer>
  );
};

export default Footer;