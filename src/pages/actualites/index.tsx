import ActualitesCard from "@/Components/ui/ActualitesCard";
import LoadingArticles from "@/Components/ui/LoadingArticles";
import { fetchactualite } from "@/lib/actualiteHelpers";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { motion } from "framer-motion";

const Index = () => {
  const router = useRouter();
  const sort = router.query.sort as string;

  let fetchData: () => Promise<any[]> = async () => [];

  if (sort === "asc") {
    fetchData = fetchactualite;
  } else if (sort === "dec") {
    fetchData = fetchactualite;
  }
  const { data, isLoading } = useQuery(["actualités", sort], fetchactualite, {
    staleTime: 60 * 60 * 1000, // cache expires in 1 hour
  });
  //console.log(data)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Head>
        <title>Emmaus Boutique - Actualités</title>
        <link rel="icon" href="/logo.jpg" />
        <meta name="description" content={data && data[0].description} />
        <meta name="keywords" content="Livres Rares,livres Anciens,Les BD,Livres Francais,Lives,Rares,Ancien,BD" />
        <meta
          property="og:title"
          content="Actualités - Emmaus - Boutique chatellerault"
        />
      </Head>
      <Container>
        {isLoading && <LoadingArticles count={3} />}
        {data && !isLoading && (
          <Items
            className="items"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {data.map((item: any) => (
              <motion.div key={item.nom} variants={itemVariants}>
                <ActualitesCard
                  title={item.nom}
                  description={item.description}
                  date={item.date}
                  image={item.imageUrl1}
                />
              </motion.div>
            ))}
          </Items>
        )}
      </Container>
    </>
  );
};

export default Index;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: start;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Items = styled(motion.div)`
display:flex;
`;
