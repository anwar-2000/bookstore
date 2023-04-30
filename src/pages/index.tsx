import AboutSection from "@/Components/About";
import "react-toastify/dist/ReactToastify.css";
import Hero from "@/Components/Hero";
import Localisation from "@/Components/Localisation";
import Head from "next/head";


export default function Home() {
  return <>
  <Head>
        <title>EMMAUS NAINTRE</title>
        <link rel="icon" href="./logo.jpg" />
  </Head>
        <Hero />
        <AboutSection />
        <Localisation />
    </>
  
}
