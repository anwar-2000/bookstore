import Register from '@/Components/Register'
import React from 'react'
import styled from 'styled-components'

interface Props {}

const Index = () => {
  return <Container> <Register /> </Container>
}

export default Index

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5rem;
`