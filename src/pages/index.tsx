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
  <meta property="og:image" content="https://emmtaboutique.com/logo.jpg"></meta>
  <meta property="twitter:image" content="https://emmtaboutique.com/logo.jpg"></meta>
  <meta property="twitter:card" content="Emmaüs Naintré - Chatellerault "></meta>
  <meta property="twitter:title" content="La Boutique enligne Emmaüs Naintré"></meta>
  <meta property="twitter:description" content="La boutique des livres Emmaus Naintré propose des livres rares, anciens, des bandes dessinées (BD) et des livres de poche à des prix compétitifs. Découvrez notre large sélection de livres français et élargissez votre bibliothèque avec nos trouvailles uniques."></meta>
  <meta property="og:url" content="https://emmtaboutique.com"></meta>
  <meta name="description" content="La boutique des livres Emmaus Naintré propose des livres rares, anciens, des bandes dessinées (BD) et des livres de poche à des prix compétitifs. Découvrez notre large sélection de livres français et élargissez votre bibliothèque avec nos trouvailles uniques."  />
  <meta name="keywords" content="Livres Rares, Livres Anciens, Bandes Dessinées, BD, Livres de Poche, Livres Français, Emmaus Naintré, Boutique Chatellerault" />
  <meta name="author" content="Emmaus Naintré - Chatellerault" />
  <meta property="og:title" content="Emmaus Naintré - Boutique Chatellerault" />
  <meta property="og:description" content="La boutique des livres Emmaus Naintré propose des livres rares, anciens, des bandes dessinées (BD) et des livres de poche à des prix compétitifs." />
</Head>

        { isLoading ? <Loading />
        : <><Hero />
        <AboutSection />
        <Localisation />
        </>
        }
    </>
  
}
