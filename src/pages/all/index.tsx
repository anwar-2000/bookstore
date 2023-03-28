import SideNav from "@/Components/ui/SideNav";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {Search} from "lucide-react";
import { motion } from "framer-motion";
import BookItemSecond from "@/Components/ui/BookItemSecond";

import { useQuery } from "react-query";
import {fetchBooks} from "@/lib/helpers"

import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";

interface Props {}

const variants = {
  open: { x: 0, opacity: 1 },
  closed: { x: -400, opacity: 1 }
};

const transition = { duration: 0.3, ease: "easeIn" };

const index = () => {
  const router = useRouter();
  const {isLoading , data , isError , error} = useQuery('books',fetchBooks);

  const { isOpen } = useSelector((state: any) => state.toggle);

 
const getBookIdHandler = (id : string) =>{
    router.push(`/details/${id}`); //pushing to details page api with the selected items ID
}
  return (
    <Container>
      
        <motion.div
          initial="open"
          animate={isOpen ? "open" : "closed"}
          variants={variants}
          transition={transition}
        >
          <SideNav />
        </motion.div>


        { isLoading ? <Spiner><ClipLoader
        color='blue'
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></Spiner> : <motion.div
        initial="open"
          animate={isOpen ? "open" : "closed"}
          variants={variants}
          transition={transition}>
        <MainContent>

              <div className="explore">
                <h1>Explore</h1>
                <div className="input__search">
                <Search id="icon" />
                <input type="text" autoComplete="false"  placeholder="Trouver un livre" /></div>  
              </div>

              <div className="popularNow">
              <h1>Récent :</h1>
              <div className="items">
              <BookItemSecond title={"Harry Potter 2"} image={"https://3.bp.blogspot.com/-b4tggdxOD9U/Uk7SdMckW2I/AAAAAAAAACY/t8WqMOdJUgM/s1600/harry2+cover.jpg"} rating={3} />
              <BookItemSecond title={"Harry Potter 2"} image={"https://3.bp.blogspot.com/-b4tggdxOD9U/Uk7SdMckW2I/AAAAAAAAACY/t8WqMOdJUgM/s1600/harry2+cover.jpg"} rating={3} />
              </div>
              <h1>Tout Livres :</h1>
              </div>

              <div className="allBooks">
              {data.map((book : any,i :number)=>(
                   <BookItemSecond key={i} title={book.titre} image={book.image} rating={book.rating} onClick={()=>getBookIdHandler(book._id)}/>
              ))}
              </div>
        </MainContent>
        </motion.div>}
      
    </Container>
  );
};

export default index;

const Container = styled.div`
  display: flex;
  overflow: hidden;
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

/* Hide scrollbar for IE, Edge and Firefox */

  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

    
    .explore {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 5rem;
      justify-content: start;
      
      h1{
        font-size: 3rem;
        font-family: sans-serif;
        font-weight: bold;
      }

      .input__search{
        display: flex;
        align-items: center;
        justify-content: center;

        input {
        padding: 1rem 3rem;
        border-radius: 20px;
        border: solid 2px black;
        font-weight: bold;
        &::placeholder{
          font-weight: bold;
        }
      }
        

        #icon{
          transform: translateX(17rem);
          cursor: pointer;
        }
      }
    }

    .popularNow{
      h1{
        font-size: 2.5rem;
        font-family: sans-serif;
        font-weight: bold;
      }
      .items{
        display: flex;
        gap: 1.5rem;
        flex-wrap: nowrap;
        overflow-x: hidden;
      }
    }

    .allBooks{
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem ;
    }
`
const Spiner = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 25rem;
`