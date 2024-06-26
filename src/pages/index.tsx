function HomePage() {
  const { data: expensiveBooks, isLoading } = useQuery(
    'expensiveBooks',
    () => fetchHighPriceBooks(1, 24),
    {
      staleTime: 2 * 60 * 60 * 1000, // cache expires in 2 hours .
    }
  );

 

  return (
    <>
      { isLoading ? <LoadingCards count={6}  /> : <ExpensiveBooks expensiveBooks={expensiveBooks} />}
       
    </>
  );
}

import "react-toastify/dist/ReactToastify.css";
import Localisation from "@/Components/Localisation";
import Head from "next/head";
import { Suspense } from "react";
import { fetchHighPriceBooks } from "@/lib/helpers";
import ExpensiveBooks from "@/Components/ExpensiveBooks";
import styled from "styled-components";
import { useQuery } from "react-query";
import LoadingCards from "@/Components/ui/LoadingCards";
import EmmausHero from "@/Components/EmmausHero";




export default function Home() {


  return <>
  <Head>
  <title> Boutique Emmaüs Chatellerault - Naintré</title>
  <link rel="icon" href="https://emmtaboutique.com/emmaus.jpg" />
  <meta property="og:image" content="https://emmtaboutique.com/emmaus1.jpg"></meta>
  <meta property="twitter:image" content="https://emmtaboutique.com/logo.jpg"></meta>
  <meta property="twitter:card" content="Emmaüs Naintré - Chatellerault "></meta>
  <meta property="twitter:title" content="La Boutique enligne Emmaüs Naintré"></meta>
  <meta property="twitter:description" content="La boutique des livres Emmaus Chatellerault - Naintré propose des livres rares, anciens, des bandes dessinées (BD) et des livres de poche à des prix compétitifs. Découvrez notre large sélection de livres français et élargissez votre bibliothèque avec nos trouvailles uniques."></meta>
  <meta property="og:url" content="https://emmtaboutique.com"></meta>
  <meta name="description" content="La boutique des livres Emmaus Chatellerault -  Naintré propose des livres rares, anciens, des bandes dessinées (BD) et des livres de poche à des prix compétitifs. Découvrez notre large sélection de livres français et élargissez votre bibliothèque avec nos trouvailles uniques."  />
  <meta name="keywords" content=" second main chatellerault , vetements second main , luxe solidaire , vintage solidaire , librarie solidaire , couture occasion, maroquinerie d'occasion , astérix et obélix , loisirs créatifs d'occasion , coutur ,  shop emmaus , emmaus naintré,emmaus boutique,emmäus,emmaus,livres,emmaus , Livres Rares, Livres Anciens, Bandes Dessinées, BD, Livres de Poche, Livres Français, Emmaus Naintré boutique, Boutique Chatellerault , le petit prince pdf , jeanne marie leprince de beaumont , dominique loreau , rare book , les fleur du mal , joel cornette,nadja breton,petit albert,moon palace paul auster, jean santeuil , pop up harry potter , 1984 roman , magellan stefan zweig , kukum michel jean , trevanian shibumi , petit albert ,bonjour tristesse, moon palace paul auste,bouvard e pécuchet,vernon subutex 3,borges fictions	,marie antoinette stefan zweig , laurent binet hhhh,EMMAUS , EMMAUS NAINTRE , emmaus naintré , emmaus boutique , label emmaus , emmaus label , Emmaus LIVRES , LIVRES RARE EMMAUS , BOUTIQUE EMMAUS POITIERS , emmaus boutique chatellerault , emmaus poitiers , michel de montaigne essais , éric emmanuel schmitt paradis perdus , fnac france livres , le livre de cuisine , le monde collection , ninon de lenclos books , germinal roman , la fleurs du mal , clochemerle book , chimamanda ngozi adichie livres , escape book sherlock holmes , chutes de cuirs , vetements , cuir de luxe , louis vuitton , arco , emmaus chatellerault , cuire chatellerault , vetements chèr , vetements marc , manga , bouquiniste , biblioPhile , vieilles affiche , vieux journaux , vintage " />

  <meta name="author" content="Emmaüs Chatellerault - Naintré" />
  <meta property="og:title" content="Emmaüs Naintré - Boutique Chatellerault" />
  <meta property="og:description" content="La boutique des livres Emmaus Naintré propose des livres rares, anciens, des bandes dessinées (BD) et des livres de poche à des prix compétitifs." />
</Head>

    <Container>
        <EmmausHero />
        <Suspense>
          <HomePage />
        </Suspense>
        {/* <AboutSection /> */}
        <Localisation />
        </Container>
       
    </>
  
}

const Container = styled.div`
    display : flex;
    align-items:center;
    flex-direction : column;
    justify-content : center;
    overflow-x : hidden;
    gap : 2rem
`


