import Login from '@/Components/Login'
import React from 'react'
import styled from 'styled-components'

interface Props {}

const login = () => {
  return <Container><Login /></Container>
}

export default login

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5rem;
`