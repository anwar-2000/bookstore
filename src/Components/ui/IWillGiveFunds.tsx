import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

const IWillGiveFunds = () => {
    const router = useRouter()
  return <Container>
            <Link href={'/dons'}><a>Je Veux Donner Des Livres</a></Link>
  </Container>
}

export default IWillGiveFunds

const Container = styled.div`

    height : 30px;
    z-index : 99;
    background: rgb(231,76,60);
    display  : flex;
    align-items : center;
    justify-content : center;
    p {
        margin-right : 2rem;
      
        color : white;
        text-decoration : underline;
    }
`