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
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";
interface Props {}

const variants = {
  open: { x: 0, opacity: 1 },
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
  const [limit, setLimit] = useState(20);
  /** REACT-QUERY */
  const { isLoading, data, isError, error } = useQuery(
    ["books", page, limit],
    () => fetchBooks(page, limit)
  );
  /** REDUX STATE OF THE SIDENAV */
  const { isOpen } = useSelector((state: any) => state.toggle);

  /** REDUX STATE OF THE Cart */
  const { show } = useSelector((state: any) => state.cart);
  console.log("Show cart state : " + show);


  /** LOGIC FOR CONTROLLING THE LIMIT AND PAGE */

  const addPageHandler = () => setPage(page + 1);
  const addLimitHandler = () => setLimit(limit + 1);

  const minusPageHandler = () => setPage(page > 1 ? page - 1 : 1);
  const minusLimitHandler = () => setLimit(limit > 15 ? limit - 1 : 15);

  const getBookIdHandler = (id: string) => {
    router.push(`/details/${id}`); //pushing to details page api with the selected items ID
  };
  return <>
        
      <Head>
      <title>Nos Livres : Explore</title>
      <link rel="icon" href="emmaus.jpg" />
        <meta name="description" content="Tous livres EMMAUS Boutique de Chatellerault" />
        <meta property="og:title" content="Nos Livres : Explore" />
        <meta property="og:description" content="This is my page description" />
        <meta property="og:image" content="/my-page-image.jpg" />
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
          <ClipLoader
            color="blue"
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
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
              <h1>Explore</h1>
            </div>
            <div className="controls">
              <div className="controls__page">
                <ArrowBigLeft onClick={minusPageHandler} /> Pages : {page}{" "}
                <ArrowBigRight onClick={addPageHandler} />
              </div>
              <div className="controls__limit">
                <ArrowBigLeft onClick={minusLimitHandler} /> Limite : {limit}{" "}
                <ArrowBigRight onClick={addLimitHandler} />
              </div>
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
                      key={i}
                      title={book.titre}
                      image={book.image}
                      rating={book.rating}
                      prix = {book.prix}
                      onClick={() => getBookIdHandler(book._id)}
                    />
                  </motion.div>{" "}
                </>
              ))}
            </motion.div>
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
  height: 100vh;
  overflow-y: scroll !important;

  &::-webkit-scrollbar {
    display: none;
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

  .controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4rem;

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
  margin-left: 25rem;
`;
