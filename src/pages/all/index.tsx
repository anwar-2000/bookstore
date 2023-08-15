import SideNav from "@/Components/ui/SideNav";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ArrowBigLeft, ArrowBigRight, Search } from "lucide-react";
import { motion } from "framer-motion";
import BookItemSecond from "@/Components/ui/BookItemSecond";
import { useQuery } from "react-query";
import { fetchBooks } from "@/lib/helpers";
import Head from 'next/head';
import { PuffLoader
} from "react-spinners";
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";


const variants = {
  open: { x: -30, opacity: 1 },
  closed: { x: -400, opacity: 1 },
};

const Cartvariants = {
  open: { x: -300, opacity: 1 },
  closed: { x: 700, opacity: 0 },
};

const transition = { duration: 0.3, ease: "easeIn" };

const Index = () => {
  /** STATES */
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(24);
  /** REACT-QUERY */
  const { isLoading, data, isError, error } = useQuery(
    ["books", page, limit],
    () => fetchBooks(page, limit)
  );
  /** REDUX STATE OF THE SIDENAV */
  const { isOpen } = useSelector((state: any) => state.toggle);

  /** REDUX STATE OF THE Cart */
  const { show } = useSelector((state: any) => state.cart);
  
  //console.log("Show cart state : " + show);

 // console.log("image : " + data?.imageUrl1);



  /** LOGIC FOR CONTROLLING THE LIMIT AND PAGE */

  const addPageHandler = () => setPage(page + 1);
  const addLimitHandler = () => setLimit(limit + 1);

  const minusPageHandler = () => setPage(page > 1 ? page - 1 : 1);
  const minusLimitHandler = () => setLimit(limit > 15 ? limit - 1 : 15);

  const getBookSlugHandler = (slug: string) => {
    router.push(`/details/${slug}`); //pushing to details page api with the selected items Slugs
  };
  return <>
        
      <Head>
      <title>Nos Livres : Explore</title>
      <link rel="icon" href="emmaus.jpg" />
        <meta name="description" content="Tous livres EMMAUS Boutique de Chatellerault" />
        <meta property="og:title" content="Explorer tous les livres que emmaus a mis dans la boutique , n&pos;hesiter pas !" />
        <meta property="og:description" content="Tous les  rares , beaux livres d'emmaus a vendre a un prix compététif" />
        <meta property="og:image" content="/emmaus.jpg" />
      </Head>
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5 }}
    >
      <motion.div
        initial="open"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={transition}
      >
        <SideNav id="sideNAv" />
      </motion.div>
      {isLoading ? (
        
        <Spiner>
          
          <PuffLoader

            color="yellow"
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
            speedMultiplier={1.5}
          />
        </Spiner>
      ) : (
        <motion.div
          initial="open"
          animate={isOpen ? "open" : "closed"}
          variants={variants}
          transition={transition}
        >
          <MainContent>
          <div className="explore">
              <h1>Tous nos livres :</h1>  
            </div>

            <motion.div
              className="allBooks"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              {data.map((book: any, i: number) => (
                <>
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <BookItemSecond
                      high_price={book.high_price}
                      key={i}
                      title={book.titre}
                      image={book.imageUrl1}
                      rating={book.rating}
                      prix = {book.prix}
                      onClick={() => getBookSlugHandler(book.slug)}
                    />
                  </motion.div>{" "}
                </>
              ))}
            </motion.div>
            <div className="controls">
              <div className="controls__page">
                <ArrowBigLeft onClick={minusPageHandler} /> Pages : {page}{" "}
              {data.length !== 0  &&  <ArrowBigRight onClick={addPageHandler} />}
              </div>
              <div className="controls__limit">
                <ArrowBigLeft onClick={minusLimitHandler} /> Limite : {limit}
                { data.length !== 0 && <ArrowBigRight onClick={addLimitHandler} />}
              </div>
            </div>
          </MainContent>
        </motion.div>
      )}

      <motion.div
        initial="closed"
        animate={show ? "open" : "closed"}
        variants={Cartvariants}
        transition={transition}
      ></motion.div>
      
    </Container>
  </>
};

export default Index;


const Container = styled(motion.div)`
  display: flex;
  overflow: hidden;
  position : relative;

  /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
    sideNAv {
      z-index: 11;
    }
  }

  /* styles for screens between 768px and 1024px */
  @media screen and (min-width: 768px) and (max-width: 1024px) {
  }

  @media screen and (min-width: 912px) and (max-width: 1024px) {
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 80vw;
  align-items: start;
  justify-content: start;
  margin: 1.5rem 2rem;
  min-height: 100vh;
  overflow-y: scroll !important;

  &::-webkit-scrollbar {
    display: none;
  }
  .explore {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 5rem;
    justify-content: start;

    /* styles for screens smaller than 768px */
    @media screen and (max-width: 767px) {
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    h1 {
      font-size: 3rem;
      font-family: 'Playfair Display SC', serif;
    }

    .input__search {
      display: flex;
      align-items: center;
      justify-content: center;

      /* styles for screens smaller than 768px */
      @media screen and (max-width: 767px) {
        margin-right: 1.9rem;
      }

      input {
        padding: 1rem 3rem;
        border-radius: 20px;
        border: solid 2px black;
        font-weight: bold;
        &::placeholder {
          font-weight: bold;
        }
      }

      #icon {
        transform: translateX(17rem);
        cursor: pointer;
      }
    }
  }

  .allBooks {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;

    /* styles for screens smaller than 768px */
    @media screen and (max-width: 767px) {
      align-items: center;
      justify-content: center;
    }
  }
  h1 {
    font-size: 3rem;
    font-family: 'Raleway', sans-serif;
    font-weight: bold;
  }

  /* Hide scrollbar for IE, Edge and Firefox */

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

 

  .controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4rem;
    align-self : center;

    .controls__page {
      display: flex;
      gap: 2rem;
    }
    .controls__limit {
      display: flex;
      gap: 2rem;
    }
    /* styles for screens smaller than 768px */
    @media screen and (max-width: 767px) {
      flex-direction: column;
      margin-left: 4.3rem;
    }
  }
`;
const Spiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10rem;
  margin-bottom : 9rem;
  /* styles for screens smaller than 768px */
  @media screen and (max-width: 767px) {
      position : absolute;
      top : 5rem;
    }
`;
