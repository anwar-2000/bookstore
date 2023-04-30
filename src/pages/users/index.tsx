import Register from '@/Components/Register'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  //console.log("the session is " ,session)
  if (!session) {
    return {
      redirect: {
        destination: '/users/login',
        permanent: false,
      },
    }
  }
  return { props: { session } };
}