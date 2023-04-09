import AboutSection from "@/Components/About";
import Footer from "@/Components/Footer";
import Hero from "@/Components/Hero";
import Localisation from "@/Components/Localisation";
import RecentBooks from "@/Components/RecentBooks";
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
        <Footer />
    </>
  
}
