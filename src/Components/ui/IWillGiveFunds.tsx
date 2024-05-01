import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

const IWillGiveFunds = () => {
  return <Container>
            <Link href={'https://www.helloasso.com/associations/association-emmaus-chatelleraudais'}>"j&apos;aide Emmaûs - cagnotte en ligne"</Link>
  </Container>
}

export default IWillGiveFunds

const Container = styled.div`

    height : 30px;
    z-index : 99;
    background: rgb(68, 171, 179);
    text-decoration:underline;
    color : #2b1909;
    display  : flex;
    align-items : center;
    justify-content : center;
    font-weight : bolder;
    
`

