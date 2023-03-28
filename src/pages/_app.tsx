import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { QueryClientProvider,QueryClient } from "react-query";

//creating client
const queryclient =  new QueryClient()


export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryclient}>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    </QueryClientProvider>
  );
}
