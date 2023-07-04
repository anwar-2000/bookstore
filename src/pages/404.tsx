import Image from 'next/image';
import React from 'react'
import styled from 'styled-components'


const Index = () => {
  return <Container>
            <Image alt='not_found' src={'/not_found.gif'} width={450} height={450} priority/>
  </Container>
}

export default Index;

const Container = styled.div`
    display : grid;
    place-items : center;
    height : 60vh;
    img{
        margin-bottom : 8rem;
    }
`