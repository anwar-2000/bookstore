import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";
import store from "@/redux/store";
import { QueryClientProvider,QueryClient } from "react-query";
import CartModal from "@/Components/ui/CartModal"
import styled from "styled-components";
import NavBar from "@/Components/NavBar";




//creating client
const queryclient =  new QueryClient()

function MyApp({ Component, pageProps, router }: AppProps) {
  const showModal = useSelector((state: any) => state.cart.show);

  return (
    <>
    <Container>
      {showModal && <CartModal />}
      </Container>
      <Component {...pageProps} router={router} />
      
    </>
  );
}

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <QueryClientProvider client={queryclient}>
      <Provider store={store}>
        <NavBar />
        <MyApp Component={Component} pageProps={pageProps} router={router} />
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