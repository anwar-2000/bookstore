import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";
import store from "@/redux/store";
import { QueryClientProvider,QueryClient } from "react-query";
import CartModal from "@/Components/ui/CartModal"
import styled from "styled-components";
import NavBar from "@/Components/NavBar";
import { SessionProvider } from "next-auth/react";
import  NextNProgress from "nextjs-progressbar";
import { ToastContainer } from 'react-toastify';
import Footer from "@/Components/Footer";
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import IWillGiveFunds from "@/Components/ui/IWillGiveFunds";


import { Analytics } from '@vercel/analytics/react';

//creating client
const queryclient =  new QueryClient()

function MyApp({ Component, pageProps, router }: AppProps) {
  const showModal = useSelector((state: any) => state.cart.show);

  useEffect(()=>{
    AOS.init({
      disable: 'phone' ,
    });
  },[])

  return (
    <>
    <Container>
      {showModal && <CartModal />}
      </Container>
      <NextNProgress color="blue" />
      <Component {...pageProps} router={router} />
      <Analytics />
    </>
  );
}

export default function App({ Component, pageProps, router }: AppProps) {
  //console.log("APP TSX : ",pageProps.session)
  return (
    <QueryClientProvider client={queryclient}>
      <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <IWillGiveFunds />
        <NavBar />
        <MyApp Component={Component} pageProps={pageProps} router={router} />
        <Footer />
        <ToastContainer autoClose={4000}  key="unique_key" />
        </SessionProvider>
      </Provider>
    </QueryClientProvider>
  );
}

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

