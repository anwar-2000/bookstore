import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import styled from 'styled-components'

const IWillGiveFunds = () => {
  return <Container>
            <Link href={'/dons'}>Je Veux Donner Des Livres</Link>
  </Container>
}

export default IWillGiveFunds

const Container = styled.div`

    height : 30px;
    z-index : 99;
    background: rgb(231,76,60);
    color : #e7e4e4;
    display  : flex;
    align-items : center;
    justify-content : center;
    font-weight : bold;
    
`