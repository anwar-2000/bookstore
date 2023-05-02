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
  </Head>

        { isLoading ? <Loading />
        : <><Hero />
        <AboutSection />
        <Localisation />
        </>
        }
    </>
  
}
