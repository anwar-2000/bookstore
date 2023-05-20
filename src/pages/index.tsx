import AboutSection from "@/Components/About";
import "react-toastify/dist/ReactToastify.css";
import Hero from "@/Components/Hero";
import Localisation from "@/Components/Localisation";
import Head from "next/head";
import { useEffect, useState } from "react";
import Loading from "@/Components/ui/Loading";


export default function Home() {
      const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // simulate page load delay
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return <>
  <Head>
      <title>EMMAUS NAINTRE</title>
      <link rel="icon" href="./logo.jpg" />
      <meta name="description" content="La boutique des livres Emmaus Chatellerault vend ses livres rares, ses BD, ses livres de poche à un prix compétitif."  />
      <meta name="keywords" content="Livres Rares,livres Anciens,Les BD,Livres Francais,Lives,Rares,Ancien,BD" />
      <meta name="author" content="Emmaus Naintré - Chatellerault" />
      <meta property="og:title" content="Emmaus Naintré - Boutique chatellerault" />
      <meta property="og:description" content="La boutique des livres Emmaus Chatellerault vend ses livres rares, ses BD, ses livres de poche à un prix compétitif." />
    </Head>

        { isLoading ? <Loading />
        : <><Hero />
        <AboutSection />
        <Localisation />
        </>
        }
    </>
  
}
